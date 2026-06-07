// THRULABS LMS Progress Sync & Auto-Save Systems

const progressManager = {
    // Helper to get active authenticated user ID
    getUserId() {
        const user = window.getCurrentUser();
        return user ? user.id : null;
    },

    // Sync progress data from database for a specific course
    async syncCourseProgress(courseId) {
        const userId = this.getUserId();
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
                // Save database copy to local storage cache
                const localKey = `thrulabs_progress_${courseId}`;
                let currentLocal = {};
                try {
                    currentLocal = JSON.parse(localStorage.getItem(localKey)) || {};
                } catch(e) {}

                let parsedModule = {};
                try {
                    parsedModule = data.current_module ? JSON.parse(data.current_module) : {};
                } catch(e) {}

                // Support both flat object (lessons only) and structured object (with resume indices)
                const lessons = parsedModule.lessons || (Object.keys(parsedModule).every(k => k.includes('-')) ? parsedModule : {});
                const currentModuleIndex = parsedModule.currentModuleIndex !== undefined ? parsedModule.currentModuleIndex : (currentLocal.currentModuleIndex || 0);
                const currentLessonIndex = parsedModule.currentLessonIndex !== undefined ? parsedModule.currentLessonIndex : (currentLocal.currentLessonIndex || 0);
                const currentContentType = parsedModule.currentContentType || currentLocal.currentContentType || 'lesson';

                // Deep merge or restore variables
                const synced = {
                    lessons: lessons,
                    currentModuleIndex: currentModuleIndex,
                    currentLessonIndex: currentLessonIndex,
                    currentContentType: currentContentType,
                    quizzes: currentLocal.quizzes || {},
                    projects: currentLocal.projects || {},
                    certificateId: currentLocal.certificateId || null,
                    examPassed: data.completed || false,
                    last_accessed: data.last_accessed
                };

                // Sync quizzes and projects details from other tables to rebuild complete object
                const { data: quizData } = await window.supabaseClient
                    .from('quiz_attempts')
                    .select('module_id, score')
                    .eq('user_id', userId)
                    .eq('course_id', courseId);

                if (quizData) {
                    quizData.forEach(q => {
                        synced.quizzes[q.module_id] = q.score;
                    });
                }

                localStorage.setItem(localKey, JSON.stringify(synced));
                return synced;
            }
        } catch (e) {
            console.warn("Could not sync course progress from Supabase, using local cache", e);
        }
        return null;
    },

    // Automatically save course progress parameters
    async saveCourseProgress(courseId, localProgress) {
        const userId = this.getUserId();
        if (!userId || !window.supabaseClient) return;

        // Calculate modules, lessons, and completion percentage
        let lessonsCount = Object.keys(localProgress.lessons || {}).length;
        let modulesCount = Object.keys(localProgress.projects || {}).length;
        
        let quizSum = 0;
        let quizCount = Object.keys(localProgress.quizzes || {}).length;
        Object.values(localProgress.quizzes || {}).forEach(score => { quizSum += score; });
        let quizAvg = quizCount > 0 ? (quizSum / quizCount) : 0;

        // Estimate completion percentage
        let completionPct = 0;
        if (window.courses && window.courses[courseId]) {
            const courseObj = window.courses[courseId];
            let totalLessons = 0;
            courseObj.modules.forEach(m => totalLessons += m.lessons.length);
            completionPct = totalLessons > 0 ? Math.round((lessonsCount / totalLessons) * 100) : 0;
        }

        const payload = {
            user_id: userId,
            course_id: courseId,
            current_module: JSON.stringify({
                lessons: localProgress.lessons || {},
                currentModuleIndex: localProgress.currentModuleIndex || 0,
                currentLessonIndex: localProgress.currentLessonIndex || 0,
                currentContentType: localProgress.currentContentType || 'lesson'
            }),
            modules_completed: modulesCount,
            lessons_completed: lessonsCount,
            quiz_score: quizAvg,
            completion_percentage: completionPct,
            last_accessed: new Date().toISOString(),
            completed: localProgress.examPassed || (completionPct >= 100)
        };

        try {
            await window.supabaseClient
                .from('course_progress')
                .upsert(payload, { onConflict: 'user_id, course_id' });
        } catch (e) {
            console.error("Auto-save course progress failed", e);
        }
    },

    // Save quiz attempt
    async saveQuizAttempt(courseId, moduleId, score, totalQuestions, passed) {
        const userId = this.getUserId();
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

    // Save project stage progress
    async saveProjectProgress(projectId, currentStage, completedStages, progressPercentage) {
        const userId = this.getUserId();
        if (!userId || !window.supabaseClient) return;

        const payload = {
            user_id: userId,
            project_id: projectId,
            current_stage: currentStage,
            completed_stages: completedStages,
            progress_percentage: progressPercentage,
            last_accessed: new Date().toISOString()
        };

        try {
            await window.supabaseClient
                .from('project_progress')
                .upsert(payload, { onConflict: 'user_id, project_id' });
            
            // Cache local progress
            localStorage.setItem(`thrulabs_project_${projectId}`, JSON.stringify(payload));
        } catch (e) {
            console.error("Auto-save project progress failed", e);
        }
    },

    // Save simulator run history configuration
    async saveSimulatorHistory(simulatorName, settings, results) {
        const userId = this.getUserId();
        if (!userId || !window.supabaseClient) return;

        const payload = {
            user_id: userId,
            simulator_name: simulatorName,
            settings: settings,
            results: results,
            created_at: new Date().toISOString()
        };

        try {
            await window.supabaseClient
                .from('simulator_history')
                .insert(payload);

            // Also update resume state
            localStorage.setItem(`thrulabs_sim_${simulatorName}`, JSON.stringify(settings));
        } catch (e) {
            console.error("Auto-save simulator run failed", e);
        }
    },

    // Save/Bookmark Resource
    async toggleBookmark(resourceId) {
        const userId = this.getUserId();
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

    // Get bookmark status
    async isBookmarked(resourceId) {
        const userId = this.getUserId();
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

    // Get all bookmarked resources
    async getSavedResources() {
        const userId = this.getUserId();
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

    // Get resume tracking metrics
    async getResumeState() {
        const userId = this.getUserId();
        if (!userId || !window.supabaseClient) return null;

        try {
            // Find most recently accessed course progress
            const { data: courseData } = await window.supabaseClient
                .from('course_progress')
                .select('*')
                .eq('user_id', userId)
                .order('last_accessed', { ascending: false })
                .limit(1);

            if (courseData && courseData.length > 0) {
                return {
                    type: 'course',
                    id: courseData[0].course_id,
                    percentage: courseData[0].completion_percentage,
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
