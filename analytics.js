// THRULABS Learning Analytics Engine
// Learning hours are tracked in-memory and synced to Supabase user_preferences.
// localStorage is NOT used for analytics data.

const analyticsManager = {
    // Module-level session timer (in seconds). Not persisted to localStorage.
    _sessionSeconds: 0,

    // Start active tracking session
    initSessionTracker() {
        if (this._sessionInterval) clearInterval(this._sessionInterval);
        
        let lastActiveTime = Date.now();
        
        // Track user activity events to verify active session status
        const resetActivity = () => { lastActiveTime = Date.now(); };
        window.addEventListener('mousemove', resetActivity);
        window.addEventListener('keydown', resetActivity);
        window.addEventListener('click', resetActivity);
        window.addEventListener('scroll', resetActivity);

        // Every 30 seconds, if user was active recently, increment in-memory counter
        this._sessionInterval = setInterval(async () => {
            const userId = window.progressManager ? await window.progressManager._resolveUserId() : null;
            if (!userId) return;

            // Active check: within last 2 minutes
            if (Date.now() - lastActiveTime < 120000) {
                this._sessionSeconds += 30;

                // Sync total hours to Supabase user_preferences.learning_hours
                if (window.supabaseClient) {
                    try {
                        const totalHours = parseFloat((this._sessionSeconds / 3600).toFixed(4));
                        const userPref = window._userPreferences || {};

                        await window.supabaseClient
                            .from('user_preferences')
                            .upsert({
                                user_id: userId,
                                certificate_name: userPref.certificate_name || window.getCurrentUser()?.name,
                                theme: userPref.theme || 'dark',
                                notifications: userPref.notifications !== false,
                                profile_visibility: userPref.profile_visibility || 'private',
                                learning_hours: totalHours
                            }, { onConflict: 'user_id' });
                    } catch(e) {
                        // Silently ignore — session data will sync on next interval
                    }
                }
            }
        }, 30000);
    },

    // Retrieve active learning hours from the in-memory session counter.
    getLearningHours() {
        return (this._sessionSeconds / 3600).toFixed(1);
    },

    // Compile analytics datasets from Supabase tables.
    async compileAnalytics() {
        const userId = window.progressManager ? await window.progressManager._resolveUserId() : null;
        if (!userId || !window.supabaseClient) {
            return {
                learningHours: 0,
                coursesCompleted: 0,
                coursesStarted: 0,
                quizAverage: 0,
                certsEarned: 0,
                projectsCompleted: 0,
                overallProgress: 0,
                progressDataPoints: [0],
                quizAttemptsPoints: [0]
            };
        }

        try {
            // Fetch stored learning hours from user_preferences
            const { data: prefData } = await window.supabaseClient
                .from('user_preferences')
                .select('learning_hours')
                .eq('user_id', userId)
                .maybeSingle();

            if (prefData && prefData.learning_hours) {
                // Seed in-memory counter from database value (accumulated from past sessions)
                const dbSeconds = Math.round(parseFloat(prefData.learning_hours) * 3600);
                // Only update if DB has more hours than current session (user returning from previous session)
                if (dbSeconds > this._sessionSeconds) {
                    this._sessionSeconds = dbSeconds;
                }
            }

            // Query progress tables
            const { data: progressList } = await window.supabaseClient
                .from('course_progress')
                .select('*')
                .eq('user_id', userId);

            const { data: certList } = await window.supabaseClient
                .from('certificates')
                .select('*')
                .eq('user_id', userId);

            const { data: projectList } = await window.supabaseClient
                .from('project_progress')
                .select('*')
                .eq('user_id', userId);

            const { data: quizList } = await window.supabaseClient
                .from('quiz_attempts')
                .select('*')
                .eq('user_id', userId);

            let coursesCompleted = 0;
            let coursesStarted = 0;
            let quizSum = 0;
            let quizCount = 0;
            let totalCompletionPctSum = 0;

            if (progressList) {
                coursesStarted = progressList.length;
                progressList.forEach(p => {
                    if (p.completed || p.progress_percentage >= 100) coursesCompleted++;
                    totalCompletionPctSum += parseFloat(p.progress_percentage || 0);
                });
            }

            if (quizList && quizList.length > 0) {
                quizCount = quizList.length;
                quizList.forEach(q => {
                    quizSum += (q.score / q.total_questions) * 100;
                });
            }

            const certsEarned = certList ? certList.length : 0;
            const projectsCompleted = projectList ? projectList.filter(pr => pr.progress_percentage >= 100).length : 0;

            const progressDataPoints = progressList ? progressList.map(p => Math.round(parseFloat(p.progress_percentage || 0))) : [0];
            const quizAttemptsPoints = quizList ? quizList.map(q => Math.round((q.score / q.total_questions) * 100)) : [0];
            
            const overallProgress = coursesStarted > 0 ? Math.round(totalCompletionPctSum / coursesStarted) : 0;

            return {
                learningHours: parseFloat(this.getLearningHours()),
                coursesCompleted,
                coursesStarted,
                quizAverage: quizCount > 0 ? Math.round(quizSum / quizCount) : 0,
                certsEarned,
                projectsCompleted,
                overallProgress,
                progressDataPoints: progressDataPoints.length > 0 ? progressDataPoints : [0],
                quizAttemptsPoints: quizAttemptsPoints.length > 0 ? quizAttemptsPoints : [0]
            };

        } catch (e) {
            console.error("Failed to compile metrics analytics", e);
            return {
                learningHours: 0,
                coursesCompleted: 0,
                coursesStarted: 0,
                quizAverage: 0,
                certsEarned: 0,
                projectsCompleted: 0,
                overallProgress: 0,
                progressDataPoints: [0],
                quizAttemptsPoints: [0]
            };
        }
    }
};

window.analyticsManager = analyticsManager;

// Auto-run tracker on load
window.addEventListener('load', () => {
    analyticsManager.initSessionTracker();
});
