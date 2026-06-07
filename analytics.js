// THRULABS Learning Analytics Engine

const analyticsManager = {
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

        // Every 30 seconds, if user was active recently, increment tracking logs
        this._sessionInterval = setInterval(async () => {
            const userId = window.progressManager ? window.progressManager.getUserId() : null;
            if (!userId) return;

            // Active check: within last 2 minutes
            if (Date.now() - lastActiveTime < 120000) {
                const user = window.getCurrentUser();
                const email = user ? user.email : '';
                const key = email ? `thrulabs_learning_seconds_${email}` : 'thrulabs_learning_seconds';
                let currentSecs = parseInt(localStorage.getItem(key) || '0') + 30;
                localStorage.setItem(key, String(currentSecs));

                // Save/Sync to user profile or user preferences table in Supabase
                if (window.supabaseClient) {
                    try {
                        const totalHours = (currentSecs / 3600).toFixed(2);
                        // Store total hours or uptime in user_preferences theme metadata or custom parameter
                        const userPref = JSON.parse(localStorage.getItem('thru_preferences') || '{}');
                        
                        // We can save to user preferences or profile metadata
                        await window.supabaseClient
                            .from('user_preferences')
                            .upsert({
                                user_id: userId,
                                certificate_name: userPref.certificate_name || window.getCurrentUser()?.name,
                                theme: userPref.theme || 'dark',
                                notifications: userPref.notifications !== false,
                                profile_visibility: totalHours // Hack: use profile_visibility or a JSON payload if we want to store uptime
                            }, { onConflict: 'user_id' });
                    } catch(e){}
                }
            }
        }, 30000);
    },

    // Retrieve active learning hours
    getLearningHours() {
        const user = window.getCurrentUser();
        const email = user ? user.email : '';
        const key = email ? `thrulabs_learning_seconds_${email}` : 'thrulabs_learning_seconds';
        const seconds = parseInt(localStorage.getItem(key) || '0');
        return (seconds / 3600).toFixed(1);
    },

    // Compile analytics datasets from database tables
    async compileAnalytics() {
        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        if (!userId || !window.supabaseClient) {
            // Return empty zero dashboard data for offline/unauthenticated views
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
            // Fetch user preferences to get dynamic uptime
            const { data: prefData } = await window.supabaseClient
                .from('user_preferences')
                .select('profile_visibility')
                .eq('user_id', userId)
                .maybeSingle();

            if (prefData && prefData.profile_visibility) {
                const dbHours = parseFloat(prefData.profile_visibility) || 0;
                const user = window.getCurrentUser();
                const email = user ? user.email : '';
                const key = email ? `thrulabs_learning_seconds_${email}` : 'thrulabs_learning_seconds';
                localStorage.setItem(key, String(Math.round(dbHours * 3600)));
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
                    if (p.completed || p.completion_percentage >= 100) coursesCompleted++;
                    totalCompletionPctSum += parseFloat(p.completion_percentage || 0);
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

            // Weekly study hours data points (mocked dynamically based on joined date)
            const progressDataPoints = progressList ? progressList.map(p => p.completion_percentage) : [0];
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
