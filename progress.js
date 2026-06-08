// THRULABS LMS Progress Sync & Auto-Save Systems
// All progress data is stored exclusively in Supabase.
// localStorage is NEVER used for progress persistence.

const progressManager = {
    // Helper to get active authenticated user ID from the live Supabase session.
    async _resolveUserId() {
        if (!window.supabaseClient) return null;
        try {
            const { data: { user } } = await window.supabaseClient.auth.getUser();
            return user ? user.id : null;
        } catch (e) {
            return null;
        }
    },

    // Synchronous accessor for in-memory cached user (used in non-async contexts).
    getUserId() {
        const user = window.getCurrentUser ? window.getCurrentUser() : null;
        return user ? user.id : null;
    },

    // Sync progress data from database for a specific course.
    // Returns a progress object or null if no prior progress exists.
    async syncCourseProgress(courseId) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return null;

        try {
            const { data, error } = await window.supabaseClient
                .from('course_progress')
                .select('*')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .maybeSingle();

            if (error) throw error;

            if (data) {
                let parsedModule = {};
                try {
                    parsedModule = data.current_module ? JSON.parse(data.current_module) : {};
                } catch(e) {}

                const lessons = parsedModule.lessons || {};
                const currentModuleIndex = parsedModule.currentModuleIndex !== undefined ? parsedModule.currentModuleIndex : 0;
                const currentLessonIndex = parsedModule.currentLessonIndex !== undefined ? parsedModule.currentLessonIndex : 0;
                const currentContentType = parsedModule.currentContentType || 'lesson';

                // Build the in-memory progress object from Supabase data only
                const synced = {
                    lessons: lessons,
                    currentModuleIndex: currentModuleIndex,
                    currentLessonIndex: currentLessonIndex,
                    currentContentType: currentContentType,
                    quizzes: {},
                    projects: {},
                    certificateId: null,
                    examPassed: data.completed || false,
                    last_accessed: data.last_accessed
                };

                // Populate quiz scores from quiz_attempts table
                const { data: quizData } = await window.supabaseClient
                    .from('quiz_attempts')
                    .select('module_id, score')
                    .eq('user_id', userId)
                    .eq('course_id', courseId);

                if (quizData) {
                    quizData.forEach(q => {
                        // module_id is stored as string, convert to numeric key for progressData.quizzes
                        const key = parseInt(q.module_id, 10);
                        if (!isNaN(key)) {
                            synced.quizzes[key] = q.score;
                        } else {
                            synced.quizzes[q.module_id] = q.score;
                        }
                    });
                }

                return synced;
            }
        } catch (e) {
            console.warn("Could not sync course progress from Supabase", e);
        }
        return null;
    },

    // Save course progress to Supabase only. No localStorage writes.
    async saveCourseProgress(courseId, localProgress) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return;

        // Retrieve existing database record to merge details
        let existing = null;
        try {
            const { data } = await window.supabaseClient
                .from('course_progress')
                .select('*')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .maybeSingle();
            if (data) existing = data;
        } catch(e) {}

        let existingModule = {};
        if (existing && existing.current_module) {
            try {
                existingModule = JSON.parse(existing.current_module) || {};
            } catch(e) {}
        }

        // Merge incoming progress with the existing database state
        const lessons = localProgress.lessons || existingModule.lessons || {};
        const currentModuleIndex = localProgress.currentModuleIndex !== undefined ? localProgress.currentModuleIndex : (existingModule.currentModuleIndex || 0);
        const currentLessonIndex = localProgress.currentLessonIndex !== undefined ? localProgress.currentLessonIndex : (existingModule.currentLessonIndex || 0);
        const currentContentType = localProgress.currentContentType || existingModule.currentContentType || 'lesson';

        let lessonsCount = Object.keys(lessons).length;
        let modulesCount = localProgress.projects ? Object.keys(localProgress.projects).length : (existing ? existing.modules_completed : 0);

        let quizCount = localProgress.quizzes ? Object.keys(localProgress.quizzes).length : 0;
        let quizAvg = existing ? parseFloat(existing.quiz_score || 0) : 0;
        if (quizCount > 0) {
            let quizSum = 0;
            Object.values(localProgress.quizzes).forEach(score => { quizSum += score; });
            quizAvg = quizSum / quizCount;
        }

        // Estimate completion percentage
        let completionPct = localProgress.pct || localProgress.progress_percentage || localProgress.progressPercentage || 0;
        let courseTitle = courseId;
        if (window.courses && window.courses[courseId]) {
            const courseObj = window.courses[courseId];
            courseTitle = courseObj.title;
            if (completionPct === 0) {
                let totalLessons = 0;
                courseObj.modules.forEach(m => totalLessons += m.lessons.length);
                completionPct = totalLessons > 0 ? Math.round((lessonsCount / totalLessons) * 100) : 0;
            }
        } else if (existing) {
            completionPct = Math.max(completionPct, parseFloat(existing.progress_percentage || 0));
        }

        const isCompleted = localProgress.examPassed || localProgress.completed || (completionPct >= 100) || (existing && existing.completed);
        if (isCompleted) {
            completionPct = 100;
        }

        const payload = {
            user_id: userId,
            course_id: courseId,
            current_module: JSON.stringify({
                lessons: lessons,
                currentModuleIndex: currentModuleIndex,
                currentLessonIndex: currentLessonIndex,
                currentContentType: currentContentType
            }),
            modules_completed: modulesCount,
            lessons_completed: lessonsCount,
            quiz_score: quizAvg,
            progress_percentage: completionPct,
            last_accessed: new Date().toISOString(),
            completed: isCompleted,
            completed_at: isCompleted ? (existing?.completed_at || new Date().toISOString()) : null
        };

        try {
            await window.supabaseClient
                .from('course_progress')
                .upsert(payload, { onConflict: 'user_id, course_id' });

            // Automatically generate certificate record if 100% completed
            if (isCompleted && window.certificatesManager) {
                const mapping = {
                    "arduino-fundamentals": "ARD",
                    "embedded-systems": "EMB",
                    "esp32-iot": "IOT",
                    "digital-electronics": "DIG",
                    "pcb-design": "PCB",
                    "uav-drone": "UAV",
                    "communication-systems-basics": "COM",
                    "introduction-to-embedded": "INT",
                    "basic-electronics": "ELC",
                    "rtos": "RTOS",
                    "aiot": "AIOT",
                    "advanced-embedded": "ADV",
                    "industry-projects": "IND"
                };
                const courseCode = mapping[courseId] || "GEN";
                const prefix = `TL-${courseCode}-${new Date().getFullYear()}`;
                
                await window.certificatesManager.unlockCertificate(courseId, courseTitle, prefix);
            }
        } catch (e) {
            console.error("Auto-save course progress failed", e);
        }
    },

    // Save quiz attempt to Supabase
    async saveQuizAttempt(courseId, moduleId, score, totalQuestions, passed) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return;

        const payload = {
            user_id: userId,
            course_id: courseId,
            module_id: String(moduleId),
            score: score,
            total_questions: totalQuestions,
            passed: passed,
            submitted_at: new Date().toISOString()
        };

        try {
            await window.supabaseClient
                .from('quiz_attempts')
                .insert(payload);
        } catch (e) {
            console.error("Auto-save quiz attempt failed", e);
        }
    },

    // Save project stage progress to Supabase only. No localStorage writes.
    async saveProjectProgress(projectId, currentStage, completedStages, progressPercentage) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return;

        const isCompleted = progressPercentage >= 100;
        const payload = {
            user_id: userId,
            project_id: projectId,
            current_stage: currentStage,
            completed_stages: completedStages,
            progress_percentage: progressPercentage,
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
            last_accessed: new Date().toISOString()
        };

        try {
            await window.supabaseClient
                .from('project_progress')
                .upsert(payload, { onConflict: 'user_id, project_id' });
        } catch (e) {
            console.error("Auto-save project progress failed", e);
        }
    },

    // Save simulator run history to Supabase only. No localStorage writes.
    async saveSimulatorHistory(simulatorName, settings, results) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return;

        const payload = {
            user_id: userId,
            simulator_id: simulatorName,
            progress_percentage: 100.0,
            completed: true,
            completed_at: new Date().toISOString(),
            settings: settings,
            results: results
        };

        try {
            await window.supabaseClient
                .from('simulator_progress')
                .upsert(payload, { onConflict: 'user_id, simulator_id' });
        } catch (e) {
            console.error("Auto-save simulator run failed", e);
        }
    },

    // Toggle bookmark for a resource — Supabase only
    async toggleBookmark(resourceId) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return false;

        try {
            // Check if already bookmarked
            const { data, error } = await window.supabaseClient
                .from('saved_resources')
                .select('*')
                .eq('user_id', userId)
                .eq('resource_id', resourceId)
                .maybeSingle();

            if (data) {
                // Delete bookmark
                await window.supabaseClient
                    .from('saved_resources')
                    .delete()
                    .eq('user_id', userId)
                    .eq('resource_id', resourceId);
                return false; // Not bookmarked anymore
            } else {
                // Create bookmark
                await window.supabaseClient
                    .from('saved_resources')
                    .insert({
                        user_id: userId,
                        resource_id: resourceId,
                        saved_at: new Date().toISOString()
                    });
                return true; // Bookmarked
            }
        } catch (e) {
            console.error("Bookmark toggle failed", e);
            return false;
        }
    },

    // Get bookmark status for a resource
    async isBookmarked(resourceId) {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return false;

        try {
            const { data } = await window.supabaseClient
                .from('saved_resources')
                .select('*')
                .eq('user_id', userId)
                .eq('resource_id', resourceId)
                .maybeSingle();
            return !!data;
        } catch (e) {
            return false;
        }
    },

    // Get all bookmarked resources for the current user
    async getSavedResources() {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return [];

        try {
            const { data, error } = await window.supabaseClient
                .from('saved_resources')
                .select('*')
                .eq('user_id', userId)
                .order('saved_at', { ascending: false });
            if (error) throw error;
            return data;
        } catch (e) {
            console.error("Failed to load saved resources", e);
            return [];
        }
    },

    // Get the most recently accessed course for "resume learning" banner
    async getResumeState() {
        const userId = await this._resolveUserId();
        if (!userId || !window.supabaseClient) return null;

        try {
            const { data: courseData } = await window.supabaseClient
                .from('course_progress')
                .select('*')
                .eq('user_id', userId)
                .eq('completed', false)
                .order('last_accessed', { ascending: false })
                .limit(1);

            if (courseData && courseData.length > 0) {
                return {
                    type: 'course',
                    id: courseData[0].course_id,
                    percentage: Math.round(parseFloat(courseData[0].progress_percentage || 0)),
                    last_accessed: courseData[0].last_accessed
                };
            }
        } catch (e) {
            console.error("Failed to fetch resume state", e);
        }
        return null;
    }
};

window.progressManager = progressManager;
