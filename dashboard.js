// THRULABS User Terminal Dashboard Manager

const dashboardController = {
    // Current user and prefs states
    user: null,
    prefs: null,

    // Initial page bind
    async init() {
        this.user = window.getCurrentUser();
        if (!this.user) {
            window.location.replace('auth.html');
            return;
        }

        // Initialize local profile inputs
        this.populateIdentityFields();

        // Check for hash parameters in URL to switch tabs or scroll
        this.handleHashRouting();
        window.addEventListener('hashchange', () => this.handleHashRouting());

        // Bind preference fields
        this.loadPreferences();

        // Load stats, charts, pipelines, certs, projects, activity, bookmarks
        await this.loadStatsAndAnalytics();
        await this.loadContinueLearning();
        await this.loadActiveCourses();
        await this.loadProjectsInProgress();
        await this.loadCertificates();
        await this.loadSavedResources();
        await this.loadRecentActivity();
    },

    // Populate user profile input text fields
    populateIdentityFields() {
        const name = this.user.name || 'Grounded Engineer';
        const firstName = this.user.firstName || this.user.first_name || name.split(' ')[0] || 'Engineer';
        const email = this.user.email || 'engineer@thrulabs.com';
        const certName = this.user.certificateName || this.user.certificate_name || name;

        // Welcome text
        document.getElementById('user-display-first-name').textContent = firstName;
        document.getElementById('user-display-name-sub').textContent = name;
        document.getElementById('user-display-email').textContent = email;

        // Form fields
        document.getElementById('profile-name').value = name;
        document.getElementById('profile-email').value = email;
        document.getElementById('profile-certname').value = certName;
    },

    // Handle settings preferences loading — reads from in-memory cache set by auth.js
    loadPreferences() {
        try {
            // window._userPreferences is populated by auth.js checkAuth() from Supabase
            const storedPrefs = window._userPreferences;
            if (storedPrefs) {
                this.prefs = storedPrefs;
            } else {
                this.prefs = {
                    theme: 'dark',
                    notifications: true,
                    certificate_name: this.user ? this.user.name : '',
                    profile_visibility: 'private'
                };
            }

            // Bind values to UI elements (if present on the page)
            if (document.getElementById('pref-theme')) {
                document.getElementById('pref-theme').value = this.prefs.theme || 'dark';
            }
            if (document.getElementById('pref-notifications')) {
                document.getElementById('pref-notifications').checked = this.prefs.notifications !== false;
            }
            if (document.getElementById('pref-visibility')) {
                document.getElementById('pref-visibility').value = this.prefs.profile_visibility || 'private';
            }
        } catch (e) {
            console.error("Preferences load error", e);
        }
    },

    // Save user preferences to Supabase
    async commitPreferences() {
        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        if (!userId || !window.supabaseClient) return;

        const theme = document.getElementById('pref-theme') ? document.getElementById('pref-theme').value : 'dark';
        const notifications = document.getElementById('pref-notifications') ? document.getElementById('pref-notifications').checked : true;
        const visibility = document.getElementById('pref-visibility') ? document.getElementById('pref-visibility').value : 'private';
        const certname = document.getElementById('profile-certname').value.trim();

        const updatedPrefs = {
            user_id: userId,
            theme,
            notifications,
            certificate_name: certname,
            profile_visibility: visibility
        };

        try {
            const { error } = await window.supabaseClient
                .from('user_preferences')
                .upsert(updatedPrefs, { onConflict: 'user_id' });

            if (error) throw error;

            // Update in-memory preferences cache; no localStorage write needed
            window._userPreferences = updatedPrefs;
            this.prefs = updatedPrefs;
            
            // Show toast success
            if (window.showToast) {
                window.showToast("Preferences and terminal variables committed to database.", "success");
            } else {
                alert("Preferences updated successfully.");
            }
        } catch (e) {
            console.error("Failed to commit preferences", e);
            if (window.showToast) window.showToast("Failed to sync preferences.", "error");
        }
    },

    // Route to page sections based on URL Hash
    handleHashRouting() {
        const hash = window.location.hash;
        if (!hash) return;

        // Find targets and scroll smoothly
        const element = document.querySelector(hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    },

    // Compile learning uptime and render charts
    async loadStatsAndAnalytics() {
        const analytics = await window.analyticsManager.compileAnalytics();
        
        // Update stats summary row
        document.getElementById('stat-enrolled').textContent = analytics.coursesStarted;
        document.getElementById('stat-hours').textContent = analytics.learningHours.toFixed(1) + ' Hrs';
        document.getElementById('stat-certs').textContent = analytics.certsEarned + ' Earned';
        
        const overallProgress = analytics.overallProgress || 0;
        document.getElementById('stat-completion-pct').textContent = overallProgress + '%';
        const pctBar = document.getElementById('stat-completion-pct-bar');
        if (pctBar) {
            pctBar.style.width = overallProgress + '%';
        }

        // Render analytics charts
        this.renderCharts(analytics);
    },

    // Render stats charts using Chart.js
    renderCharts(analytics) {
        const progressCtx = document.getElementById('chart-progress')?.getContext('2d');
        const quizCtx = document.getElementById('chart-quiz')?.getContext('2d');

        if (!progressCtx || !quizCtx || !window.Chart) return;

        // Course Progress chart
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                datasets: [{
                    label: 'Completion %',
                    data: (analytics.progressDataPoints.length > 0 && analytics.progressDataPoints[0] !== 0) ? analytics.progressDataPoints : [0, 0, 0, 0, 0, 0, 0],
                    borderColor: '#7C89FF',
                    backgroundColor: 'rgba(124, 137, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.4)' } },
                    x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.4)' } }
                }
            }
        });

        // Quiz score average chart
        new Chart(quizCtx, {
            type: 'bar',
            data: {
                labels: ['Arduino', 'Embedded', 'IoT', 'PCB', 'Drone', 'Digital'],
                datasets: [{
                    label: 'Quiz Scores (%)',
                    data: (analytics.quizAttemptsPoints.length > 0 && analytics.quizAttemptsPoints[0] !== 0) ? analytics.quizAttemptsPoints : [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10B981',
                    borderWidth: 1.5,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.4)' } },
                    x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.4)' } }
                }
            }
        });
    },

    // Continue Learning Banner rendering
    async loadContinueLearning() {
        const resume = await window.progressManager.getResumeState();
        const container = document.getElementById('continue-learning-banner');
        if (!container) return;

        if (resume) {
            let title = "Embedded Systems Essentials";
            if (window.academyData && window.academyData.featuredCourses) {
                const found = window.academyData.featuredCourses.find(c => c.id === resume.id);
                if (found) title = found.title;
            }
            container.innerHTML = `
                <div class="glass-card p-6 rounded-2xl relative border-accent/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-accent/40 bg-gradient-to-r from-accent/10 to-transparent">
                    <div class="space-y-1.5 flex-1">
                        <span class="text-[8px] font-mono text-accent-bright uppercase tracking-widest block font-bold">Continue Learning</span>
                        <h4 class="text-sm font-bold text-white font-display">${title}</h4>
                        <div class="flex items-center gap-3 w-full max-w-sm mt-1.5 font-mono text-[9.5px]">
                            <div class="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div class="bg-accent h-full shadow-[0_0_8px_rgba(94,106,210,0.5)]" style="width: ${resume.percentage}%;"></div>
                            </div>
                            <span class="text-white/50">${resume.percentage}% Complete</span>
                        </div>
                    </div>
                    <a href="learn.html?course=${resume.id}" class="px-5 py-3 bg-white text-black hover:bg-accent hover:text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all hover-target whitespace-nowrap self-stretch sm:self-auto text-center flex items-center justify-center gap-1.5 shadow-lg">
                        <i data-lucide="play" class="w-3.5 h-3.5 shrink-0"></i> Resume Learning
                    </a>
                </div>
            `;
            document.getElementById('continue-learning-section')?.classList.remove('hidden');
        } else {
            // Load Arduino Fundamentals by default if no resume state exists
            container.innerHTML = `
                <div class="glass-card p-6 rounded-2xl relative border-emerald-500/10 hover:border-emerald-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div class="space-y-1.5 flex-1">
                        <span class="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Begin your engineering journey</span>
                        <h4 class="text-sm font-bold text-white font-display">Arduino Fundamentals</h4>
                        <p class="text-white/40 text-xs font-mono">LMS Node status: Ready to initialize first compiler pipeline.</p>
                    </div>
                    <a href="learn.html?course=arduino-fundamentals" class="px-5 py-3 bg-white text-black hover:bg-accent hover:text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all hover-target whitespace-nowrap self-stretch sm:self-auto text-center flex items-center justify-center gap-1.5 shadow-lg">
                        <i data-lucide="play" class="w-3.5 h-3.5 shrink-0"></i> Initialize Learning
                    </a>
                </div>
            `;
            document.getElementById('continue-learning-section')?.classList.remove('hidden');
        }
        if (window.lucide) window.lucide.createIcons();
    },

    // Active learning courses pipeline list
    async loadActiveCourses() {
        const container = document.getElementById('active-courses-list');
        if (!container) return;

        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        let progress = [];

        if (userId && window.supabaseClient) {
            try {
                const { data } = await window.supabaseClient
                    .from('course_progress')
                    .select('*')
                    .eq('user_id', userId);
                if (data) progress = data;
            } catch(e){}
        }

        // Render started courses or default empty state if database is empty
        if (progress.length === 0) {
            container.innerHTML = `
                <div class="p-6 bg-white/[0.01] border border-white/5 rounded-2xl text-center text-white/40 text-xs font-mono">
                    No active course progress found. Explore the Academy and enroll in courses to start learning!
                </div>
            `;
        } else {
            container.innerHTML = progress.map(p => {
                let diff = "Beginner";
                let code = "LMS";
                if (window.academyData && window.academyData.featuredCourses) {
                    const matched = window.academyData.featuredCourses.find(c => c.id === p.course_id);
                    if (matched) {
                        diff = matched.difficulty;
                        code = matched.id.toUpperCase().slice(0, 7);
                    }
                }
                const diffColor = diff === 'Beginner' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400';
                
                return `
                    <div class="p-5 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/[0.02] transition-colors border-l-2 border-l-accent">
                        <div class="space-y-1.5 flex-1 w-full">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded ${diffColor} border font-mono text-[8px] tracking-wider uppercase font-bold">${diff}</span>
                                <span class="text-[8px] font-mono text-white/30 uppercase tracking-widest">${code}</span>
                            </div>
                            <h4 class="text-sm font-bold text-white">${window.courses?.[p.course_id]?.title || p.course_id}</h4>
                            <div class="flex items-center gap-3 w-full max-w-md mt-2">
                                <div class="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-accent h-full shadow-[0_0_8px_rgba(94,106,210,0.5)]" style="width: ${p.progress_percentage}%;"></div>
                                </div>
                                <span class="font-mono text-[10px] text-white/50">${Math.round(p.progress_percentage)}%</span>
                            </div>
                        </div>
                        <a href="learn.html?course=${p.course_id}" class="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent text-white rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all hover-target whitespace-nowrap self-stretch md:self-auto text-center flex items-center justify-center gap-1.5">
                            <i data-lucide="play" class="w-3.5 h-3.5"></i> Resume Node
                        </a>
                    </div>
                `;
            }).join('');
        }
        if (window.lucide) window.lucide.createIcons();
    },

    // Projects progress tracking cards lists
    async loadProjectsInProgress() {
        const container = document.getElementById('projects-progress-list');
        if (!container) return;

        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        let projects = [];

        if (userId && window.supabaseClient) {
            try {
                const { data } = await window.supabaseClient
                    .from('project_progress')
                    .select('*')
                    .eq('user_id', userId);
                if (data) projects = data;
            } catch(e){}
        }

        if (projects.length === 0) {
            container.innerHTML = `
                <div class="p-6 bg-white/[0.01] border border-white/5 rounded-2xl text-center text-white/40 text-xs font-mono">
                    No active hardware build projects in progress. Start a project track in the Academy!
                </div>
            `;
        } else {
            container.innerHTML = projects.map(p => {
                let title = "Autonomous Rover Track";
                let difficulty = "Advanced";
                if (window.academyData && window.academyData.projectTracks) {
                    const matched = window.academyData.projectTracks[p.project_id];
                    if (matched) {
                        title = matched.title;
                        difficulty = matched.difficulty;
                    }
                }
                const diffColor = difficulty === 'Beginner' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400';

                return `
                    <div class="p-5 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/[0.02] transition-colors border-l-2 border-l-amber-500">
                        <div class="space-y-1.5 flex-1 w-full">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded ${diffColor} border font-mono text-[8px] tracking-wider uppercase font-bold">${difficulty}</span>
                                <span class="text-[8px] font-mono text-white/30 uppercase tracking-widest">${p.project_id.toUpperCase()}</span>
                            </div>
                            <h4 class="text-sm font-bold text-white">${title}</h4>
                            <p class="text-[10px] font-mono text-white/40">Current Stage: ${p.current_stage || 'Setup'} // ${Math.round(p.progress_percentage)}%</p>
                        </div>
                        <a href="project.html?track=${p.project_id}" class="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-amber-500 hover:bg-amber-500 hover:text-white text-white rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all hover-target whitespace-nowrap self-stretch md:self-auto text-center flex items-center justify-center gap-1.5">
                            <i data-lucide="wrench" class="w-3.5 h-3.5"></i> Construct Stage
                        </a>
                    </div>
                `;
            }).join('');
        }
        if (window.lucide) window.lucide.createIcons();
    },

    // Verifiable certificates lists rendering
    async loadCertificates() {
        const container = document.getElementById('dashboard-certificates-list');
        if (!container) return;

        const certs = await window.certificatesManager.getEarnedCertificates();

        if (certs.length === 0) {
            container.innerHTML = `
                <div class="p-5 bg-white/[0.01] border border-white/5 rounded-2xl text-center text-white/40 text-xs font-mono">
                    LMS Registry File Empty. Complete course syllabus checkpoints to generate cryptographically signed credentials.
                </div>
            `;
        } else {
            container.innerHTML = certs.map(c => {
                let courseTitle = c.course_id;
                if (window.academyData && window.academyData.featuredCourses) {
                    const matched = window.academyData.featuredCourses.find(course => course.id === c.course_id);
                    if (matched) courseTitle = matched.title;
                }
                return `
                    <div class="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-2 border-l-amber-500 hover:bg-white/[0.02] transition-all">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                                <i data-lucide="award" class="w-5 h-5 text-amber-400 animate-pulse"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-white font-mono uppercase tracking-wider">${c.certificate_id}</h4>
                                <p class="text-[10px] text-white/50 mt-0.5">${courseTitle}</p>
                            </div>
                        </div>
                        <div class="flex gap-4 font-mono text-[9px] uppercase tracking-wider self-stretch sm:self-auto justify-between sm:justify-end items-center">
                            <span class="text-white/30">Issued: ${new Date(c.issued_at).toLocaleDateString()}</span>
                            <a href="verify.html?cert=${c.certificate_id}" class="text-accent hover:text-white transition-all hover-target flex items-center gap-1">Verify <i data-lucide="arrow-right" class="w-3 h-3"></i></a>
                        </div>
                    </div>
                `;
            }).join('');
        }
        if (window.lucide) window.lucide.createIcons();
    },

    // Saved/Bookmarked resources list rendering
    async loadSavedResources() {
        const container = document.getElementById('saved-resources-list');
        if (!container) return;

        const bookmarks = await window.progressManager.getSavedResources();

        if (bookmarks.length === 0) {
            container.innerHTML = `
                <div class="p-5 bg-white/[0.01] border border-white/5 rounded-2xl text-center text-white/40 text-xs font-mono">
                    No bookmarked library components logged. Toggle bookmark flags in the resource study libraries.
                </div>
            `;
        } else {
            container.innerHTML = bookmarks.map(b => {
                let title = b.resource_id.toUpperCase();
                let icon = "file-text";
                let color = "text-accent-bright";
                
                if (window.academyData && window.academyData.resourceCollections[b.resource_id]) {
                    const matched = window.academyData.resourceCollections[b.resource_id];
                    title = matched.title;
                    icon = matched.icon || "file-text";
                    color = matched.color === 'emerald-500' ? 'text-emerald-400' : (matched.color === 'purple-500' ? 'text-purple-400' : 'text-accent-bright');
                }

                return `
                    <div class="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between gap-4 border-l-2 border-l-rose-500 hover:bg-white/[0.02] transition-all">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                <i data-lucide="${icon}" class="w-4.5 h-4.5 ${color}"></i>
                            </div>
                            <div>
                                <h4 class="text-xs font-bold text-white font-mono uppercase tracking-wider">${title}</h4>
                                <p class="text-[9.5px] text-white/40 mt-0.5">Library Category Reference File</p>
                            </div>
                        </div>
                        <a href="resource.html?type=${b.resource_id}" class="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-rose-500 hover:bg-rose-500/10 text-white rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all hover-target">
                            Open File
                        </a>
                    </div>
                `;
            }).join('');
        }
        if (window.lucide) window.lucide.createIcons();
    },

    // Recent user activity compiler
    async loadRecentActivity() {
        const container = document.getElementById('recent-activity-list');
        if (!container) return;

        const userId = window.progressManager ? window.progressManager.getUserId() : null;
        let activity = [];

        if (userId && window.supabaseClient) {
            try {
                // Fetch quiz attempts, simulator runs, etc. to map chronological logs
                const { data: quizzes } = await window.supabaseClient
                    .from('quiz_attempts')
                    .select('*')
                    .eq('user_id', userId)
                    .order('submitted_at', { ascending: false })
                    .limit(3);

                const { data: certs } = await window.supabaseClient
                    .from('certificates')
                    .select('*')
                    .eq('user_id', userId)
                    .order('issued_at', { ascending: false })
                    .limit(2);

                const { data: projects } = await window.supabaseClient
                    .from('project_progress')
                    .select('*')
                    .eq('user_id', userId)
                    .order('last_accessed', { ascending: false })
                    .limit(3);

                if (quizzes) {
                    quizzes.forEach(q => activity.push({
                        time: new Date(q.submitted_at),
                        text: `Submitted Quiz on ${q.course_id} Module ${q.module_id} // Score: ${q.score}/${q.total_questions}`,
                        icon: 'check-square',
                        color: q.passed ? 'text-emerald-400' : 'text-rose-400'
                    }));
                }

                if (certs) {
                    certs.forEach(c => {
                        let courseTitle = c.course_id;
                        if (window.academyData && window.academyData.featuredCourses) {
                            const matched = window.academyData.featuredCourses.find(course => course.id === c.course_id);
                            if (matched) courseTitle = matched.title;
                        }
                        activity.push({
                            time: new Date(c.issued_at),
                            text: `Earned Certification: ${courseTitle} (${c.certificate_id})`,
                            icon: 'award',
                            color: 'text-amber-400'
                        });
                    });
                }

                if (projects) {
                    projects.forEach(p => activity.push({
                        time: new Date(p.last_accessed),
                        text: `Updated Project Build: ${p.project_id} // Stage ${p.current_stage || 1} reached`,
                        icon: 'wrench',
                        color: 'text-purple-400'
                    }));
                }
            } catch(e){}
        }

        // Sort by timestamp
        activity.sort((a, b) => b.time - a.time);

        if (activity.length === 0) {
            container.innerHTML = `
                <div class="text-[10px] text-white/30 font-mono italic">
                    No recent terminal events logged in console files.
                </div>
            `;
        } else {
            container.innerHTML = activity.slice(0, 5).map(act => `
                <div class="flex items-start gap-3 text-[10px] font-mono border-b border-white/[0.02] pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
                    <i data-lucide="${act.icon}" class="w-3.5 h-3.5 ${act.color} shrink-0 mt-0.5"></i>
                    <div>
                        <span class="text-white/70 block">${act.text}</span>
                        <span class="text-white/30 text-[8px] uppercase">${act.time.toLocaleTimeString()} // ${act.time.toLocaleDateString()}</span>
                    </div>
                </div>
            `).join('');
        }
        if (window.lucide) window.lucide.createIcons();
    }
};

// Expose updates to profile page
async function saveProfileChanges() {
    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const certname = document.getElementById('profile-certname').value.trim();

    if (!name || !email) {
        if (window.showToast) window.showToast("Core identity parameters cannot be empty.", "error");
        return;
    }

    const saveBtn = document.getElementById('save-profile-btn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = `<span class="flex items-center justify-center gap-2"><i data-lucide="loader" class="w-3.5 h-3.5 animate-spin font-bold"></i> Syncing...</span>`;
    saveBtn.disabled = true;
    if (window.lucide) window.lucide.createIcons();

    try {
        await auth.updateUser(name, email, certname);
        await dashboardController.commitPreferences();
        
        // Reload values
        dashboardController.user = auth.getUser();
        dashboardController.populateIdentityFields();
    } catch (err) {
        console.error("Error updating profile settings", err);
        if (window.showToast) window.showToast("Failed to commit settings changes.", "error");
    } finally {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
    }
}

// Attach controller on load
window.addEventListener('load', () => {
    dashboardController.init();
});
