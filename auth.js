const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
// Thrulabs Shared Authentication and Navigation Guard System
(function () {
    const publicPages = ['index.html', 'about.html', 'contact.html', 'auth.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isPublic = publicPages.includes(currentPage);
    const isAuthenticated = localStorage.getItem('thru_token') !== null;

    if (!isPublic && !isAuthenticated) {
        // Save the current page URL with query parameters
        const fullUrl = currentPage + window.location.search;
        localStorage.setItem('thru_last_page', fullUrl);

        // Save selected course/project/simulator if present in query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const course = urlParams.get('course') || urlParams.get('id') || urlParams.get('track') || urlParams.get('path');
        if (course) {
            if (fullUrl.includes('resource.html') || fullUrl.includes('course.html') || fullUrl.includes('learn.html')) {
                localStorage.setItem('thru_selected_course', course);
            } else if (fullUrl.includes('project.html') || fullUrl.includes('projects.html')) {
                localStorage.setItem('thru_selected_project', course);
            }
        }
        if (fullUrl.includes('simulator.html')) {
            localStorage.setItem('thru_selected_simulator', urlParams.get('id') || 'general');
        }

        window.location.replace('auth.html');
    }
})();

// DOM Loaded Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Render the premium dynamic navbar status
    if (typeof auth !== 'undefined' && typeof auth.renderNavbar === 'function') {
        auth.renderNavbar();
    }

    // Intercept clicks on links pointing to protected resources from public pages
    const publicPages = ['index.html', 'about.html', 'contact.html', 'auth.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (publicPages.includes(currentPage)) {
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            const protectedPaths = [
                'academy.html',
                'course.html',
                'resource.html',
                'learn.html',
                'simulator.html',
                'projects.html',
                'project.html',
                'roadmap.html',
                'tools.html',
                'verify.html',
                'certification.html',
                'dashboard.html'
            ];

            const isProtected = protectedPaths.some(p => href.includes(p));
            if (isProtected && !auth.isAuthenticated()) {
                e.preventDefault();

                // Save target URL
                localStorage.setItem('thru_last_page', href);

                // Save selected metadata
                try {
                    const url = new URL(href, window.location.href);
                    const course = url.searchParams.get('course') || url.searchParams.get('id') || url.searchParams.get('track') || url.searchParams.get('path');
                    if (course) {
                        if (href.includes('resource.html') || href.includes('course.html') || href.includes('learn.html')) {
                            localStorage.setItem('thru_selected_course', course);
                        } else if (href.includes('project.html') || href.includes('projects.html')) {
                            localStorage.setItem('thru_selected_project', course);
                        } else if (href.includes('roadmap.html')) {
                            localStorage.setItem('thru_selected_track', course);
                        }
                    }
                    if (href.includes('simulator.html')) {
                        localStorage.setItem('thru_selected_simulator', url.searchParams.get('id') || 'general');
                    }
                } catch (err) {
                    // Fallback for relative paths that URL parser might struggle with
                    if (href.includes('course=')) {
                        const match = href.match(/course=([^&]+)/);
                        if (match) localStorage.setItem('thru_selected_course', match[1]);
                    } else if (href.includes('id=')) {
                        const match = href.match(/id=([^&]+)/);
                        if (match) {
                            if (href.includes('project')) localStorage.setItem('thru_selected_project', match[1]);
                            if (href.includes('simulator')) localStorage.setItem('thru_selected_simulator', match[1]);
                        }
                    }
                }

                // Redirect to authentication card
                window.location.href = 'auth.html';
            }
        });
    }

    // Check for welcome message on index.html navbar profile section
    if (currentPage === 'index.html') {
        auth.showIndexWelcome();
    }
});

const auth = {
    isAuthenticated() {
        return localStorage.getItem('thru_token') !== null;
    },
    getUser() {
        try {
            return JSON.parse(localStorage.getItem('thru_user')) || null;
        } catch (e) {
            return null;
        }
    },
    login(user, token) {
        localStorage.setItem('thru_user', JSON.stringify(user));
        localStorage.setItem('thru_token', token);

        // Keep backward compatibility with existing codebase
        localStorage.setItem('thrulabs_user_name', user.name);
        localStorage.setItem('thrulabs_user_email', user.email);

        const lastPage = localStorage.getItem('thru_last_page');
        localStorage.removeItem('thru_last_page');

        if (lastPage) {
            window.location.href = lastPage;
        } else {
            localStorage.setItem('thru_login_welcome', 'true');
            window.location.href = 'index.html';
        }
    },
    logout() {
        localStorage.removeItem('thru_user');
        localStorage.removeItem('thru_token');
        localStorage.removeItem('thru_last_page');
        localStorage.removeItem('thru_selected_course');
        localStorage.removeItem('thru_selected_project');
        localStorage.removeItem('thru_selected_simulator');
        localStorage.removeItem('thru_selected_track');

        // Clear backward compatibility keys
        localStorage.removeItem('thrulabs_user_name');
        localStorage.removeItem('thrulabs_user_email');

        window.location.href = 'index.html';
    },
    updateUser(name, email, certificateName) {
        const user = this.getUser() || {};
        user.name = name || user.name || '';
        user.email = email || user.email || '';
        user.certificateName = certificateName || user.certificateName || user.name || '';

        localStorage.setItem('thru_user', JSON.stringify(user));
        localStorage.setItem('thrulabs_user_name', user.name);
        localStorage.setItem('thrulabs_user_email', user.email);

        this.renderNavbar();
    },
    renderNavbar() {
        const container = document.getElementById('nav-auth-container');
        if (!container) return;

        if (this.isAuthenticated()) {
            const user = this.getUser() || { name: 'User', email: '' };
            const initials = user.name
                .split(' ')
                .filter(n => n.length > 0)
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .substring(0, 2) || 'UN';

            container.innerHTML = `
                <div class="flex items-center gap-4 relative">
                    <span id="welcome-message" class="text-[9px] font-mono text-emerald-400 animate-pulse hidden mr-1">Welcome back, ${user.name}</span>
                    <a href="dashboard.html" class="text-[9px] font-mono font-bold text-white/60 hover:text-white transition-all hover-target uppercase tracking-widest">Dashboard</a>
                    <div class="flex items-center gap-2 border-l border-white/10 pl-4">
                        <div class="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-bright font-bold font-mono text-[10px] select-none shadow-lg cursor-pointer" onclick="window.location.href='dashboard.html'" title="${user.name}">
                            ${initials}
                        </div>
                        <button onclick="auth.logout()" class="text-[9px] font-mono font-bold text-rose-500/80 hover:text-rose-400 hover-target uppercase tracking-widest transition-colors pl-2">Logout</button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <a href="auth.html" class="text-[9px] font-bold text-white/60 hover:text-white transition-all hover-target uppercase tracking-widest font-mono">Login</a>
                <a href="auth.html" class="px-5 py-2.5 bg-white text-black text-[9px] font-extrabold rounded-full hover:bg-accent hover:text-white transition-all hover-target uppercase tracking-widest font-mono shadow-xl">
                    Get Started
                </a>
            `;
        }
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },
    showIndexWelcome() {
        if (localStorage.getItem('thru_login_welcome') === 'true') {
            localStorage.removeItem('thru_login_welcome');
            const welcomeText = document.getElementById('welcome-message');
            if (welcomeText) {
                welcomeText.classList.remove('hidden');
                setTimeout(() => {
                    welcomeText.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
                    setTimeout(() => {
                        welcomeText.remove();
                    }, 1000);
                }, 4000);
            }
        }
    }
};

window.auth = auth;
async function loginWithGoogle() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + "/auth.html"
        }
    });

    if (error) {
        console.error(error);
        alert(error.message);
    }
}

async function loginWithGithub() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: window.location.origin + "/auth.html"
        }
    });

    if (error) {
        console.error(error);
        alert(error.message);
    }
}

window.loginWithGoogle = loginWithGoogle;
window.loginWithGithub = loginWithGithub;