// Thrulabs Shared Authentication System

function sanitizeSupabaseUrl(url) {
    if (!url) return '';
    return url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

let supabaseClient = null;

function initializeSupabase() {
    if (supabaseClient) return supabaseClient;

    const SUPABASE_URL = sanitizeSupabaseUrl(
        window.env?.SUPABASE_URL || 
        window.SUPABASE_URL || 
        localStorage.getItem('SUPABASE_URL') || 
        "https://dxbymuwmcrpxqotrbfxl.supabase.co"
    );
    const SUPABASE_KEY = 
        window.env?.SUPABASE_ANON_KEY || 
        window.SUPABASE_ANON_KEY || 
        localStorage.getItem('SUPABASE_ANON_KEY') || 
        "sb_publishable_K3OJbPBo8yOpkjPd2dPPBQ_R6wWhX5P";

    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        window.supabaseClient = supabaseClient;
    }
    return supabaseClient;
}

// Auto-load dependencies synchronously if they are missing
if (!window.supabase) {
    document.write('<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
    window.addEventListener('DOMContentLoaded', () => {
        if (window.supabase) {
            initializeSupabase();
            checkAuth();
        }
    });
} else {
    initializeSupabase();
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('thru_user')) || null;
    } catch (e) {
        return null;
    }
}

async function checkAuth() {
    initializeSupabase();
    if (!supabaseClient) return;

    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;

        if (session) {
            localStorage.setItem('thru_token', session.access_token);

            // Fetch profile from database
            let profile = null;
            try {
                const { data, error: profileError } = await supabaseClient
                    .from('user_profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                if (!profileError && data) {
                    profile = data;
                }
            } catch (e) {
                console.warn("Could not retrieve profile from database", e);
            }

            // Create profile if not found
            if (!profile) {
                profile = await createUserProfile(session.user, session.user.app_metadata?.provider || 'email');
            } else {
                // Cache user profile details locally
                localStorage.setItem('thru_user', JSON.stringify({
                    id: profile.id,
                    name: profile.full_name,
                    email: profile.email,
                    avatar: profile.avatar_url,
                    certificateName: profile.certificate_name,
                    provider: profile.provider
                }));
                localStorage.setItem('thrulabs_user_name', profile.full_name);
                localStorage.setItem('thrulabs_user_email', profile.email);
            }
        } else {
            clearLocalSession();
        }
    } catch (e) {
        console.error("Session verification error", e);
        clearLocalSession();
    }

    updateNavbar();
}

async function login(email, password) {
    initializeSupabase();
    if (!supabaseClient) throw new Error("Supabase Client not initialized");
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;

    await checkAuth();
    return data;
}

async function signup(email, password, metadata) {
    initializeSupabase();
    if (!supabaseClient) throw new Error("Supabase Client not initialized");

    const fullName = `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim() || 'THRULABS User';
    metadata.full_name = fullName;
    metadata.certificate_name = fullName;

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: metadata
        }
    });
    if (error) throw error;

    if (data.user) {
        await createUserProfile(data.user, 'email');
    }
    return data;
}

async function loginWithGoogle() {
    initializeSupabase();
    if (!supabaseClient) throw new Error("Supabase Client not initialized");
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + "/auth.html"
        }
    });
    if (error) throw error;
}

async function loginWithGithub() {
    initializeSupabase();
    if (!supabaseClient) throw new Error("Supabase Client not initialized");
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: window.location.origin + "/auth.html"
        }
    });
    if (error) throw error;
}

async function logout() {
    initializeSupabase();
    if (supabaseClient) {
        try {
            await supabaseClient.auth.signOut();
        } catch (e) { }
    }

    clearLocalSession();
    localStorage.removeItem('redirectAfterLogin');
    window.location.href = 'index.html';
}

function clearLocalSession() {
    localStorage.removeItem('thru_user');
    localStorage.removeItem('thru_token');
    localStorage.removeItem('thru_selected_course');
    localStorage.removeItem('thru_selected_project');
    localStorage.removeItem('thru_selected_simulator');
    localStorage.removeItem('thru_selected_track');
    localStorage.removeItem('thrulabs_user_name');
    localStorage.removeItem('thrulabs_user_email');
    sessionStorage.clear();
}

function requireAuth() {
    const isAuthenticated = localStorage.getItem('thru_token') !== null || 
                            Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
    if (!isAuthenticated) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const fullUrl = currentPage + window.location.search;
        localStorage.setItem("redirectAfterLogin", fullUrl);
        window.location.replace('auth.html');
    }
}

function redirectAfterLogin() {
    const lastPage = localStorage.getItem('redirectAfterLogin');
    localStorage.removeItem('redirectAfterLogin');
    if (lastPage) {
        window.location.href = lastPage;
    } else {
        localStorage.setItem('thru_login_welcome', 'true');
        window.location.href = 'index.html';
    }
}

async function createUserProfile(user, providerName = 'email') {
    if (!user) return null;

    const metadata = user.user_metadata || {};
    const fullName = metadata.full_name || metadata.name || user.email?.split('@')[0] || 'THRULABS User';

    const profile = {
        id: user.id,
        email: user.email || '',
        full_name: fullName,
        certificate_name: metadata.certificate_name || fullName,
        avatar_url: metadata.avatar_url || metadata.avatar || '',
        provider: providerName || 'email',
        created_at: new Date().toISOString()
    };

    try {
        const { error } = await supabaseClient
            .from('user_profiles')
            .upsert(profile, { onConflict: 'id' });
        if (error) {
            console.warn("Supabase user_profiles table upsert failed. RLS or missing table?", error);
        }
    } catch (e) {
        console.warn("Database upsert failed.", e);
    }

    try {
        await supabaseClient.auth.updateUser({
            data: {
                full_name: fullName,
                certificate_name: profile.certificate_name,
                avatar_url: profile.avatar_url
            }
        });
    } catch (e) { }

    localStorage.setItem('thru_user', JSON.stringify({
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        avatar: profile.avatar_url,
        certificateName: profile.certificate_name,
        provider: profile.provider
    }));
    localStorage.setItem('thrulabs_user_name', profile.full_name);
    localStorage.setItem('thrulabs_user_email', profile.email);

    return profile;
}

function updateNavbar() {
    const container = document.getElementById('nav-auth-container');
    if (!container) return;

    const isAuthenticated = localStorage.getItem('thru_token') !== null || 
                            Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token'));

    if (isAuthenticated) {
        const user = getCurrentUser() || { name: 'User', email: '' };
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
                <div class="relative group font-mono">
                    <button class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all text-[9px] text-white hover-target select-none">
                        <div class="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-bright font-bold text-[9px]">
                            ${initials}
                        </div>
                        <span class="max-w-[80px] truncate text-white/80">${user.name}</span>
                        <i data-lucide="chevron-down" class="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform"></i>
                    </button>
                    <div class="absolute right-0 top-full pt-2 dropdown-panel w-40 z-50">
                        <div class="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 shadow-2xl space-y-1 text-[9px] uppercase tracking-wider">
                            <a href="dashboard.html" class="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all hover-target">
                                <i data-lucide="user" class="w-3.5 h-3.5 text-accent-bright"></i> Profile
                            </a>
                            <a href="dashboard.html#certificates" class="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all hover-target">
                                <i data-lucide="award" class="w-3.5 h-3.5 text-amber-400"></i> My Certificates
                            </a>
                            <button onclick="logout()" class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left uppercase hover-target">
                                <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Logout
                            </button>
                        </div>
                    </div>
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
}

function showIndexWelcome() {
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

// Expose functions globally
window.initializeSupabase = initializeSupabase;
window.login = login;
window.signup = signup;
window.logout = logout;
window.loginWithGoogle = loginWithGoogle;
window.loginWithGithub = loginWithGithub;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;
window.redirectAfterLogin = redirectAfterLogin;
window.createUserProfile = createUserProfile;
window.updateNavbar = updateNavbar;
window.checkAuth = checkAuth;

// Expose legacy auth namespace for absolute compatibility
window.auth = {
    isAuthenticated: () => localStorage.getItem('thru_token') !== null || Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token')),
    getCurrentUser,
    checkAuth,
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    logout,
    requireAuth,
    redirectAfterLogin,
    updateNavbar,
    createUserProfile,
    showIndexWelcome
};

// Main state load verification
window.addEventListener('load', () => {
    initializeSupabase();
    if (supabaseClient) {
        supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (session) {
                    localStorage.setItem('thru_token', session.access_token);
                    await checkAuth();
                }
            } else if (event === 'SIGNED_OUT') {
                clearLocalSession();
                updateNavbar();
            }
        });

        checkAuth();
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
            if (isProtected) {
                const isAuthenticated = localStorage.getItem('thru_token') !== null || 
                                        Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
                if (!isAuthenticated) {
                    e.preventDefault();
                    localStorage.setItem("redirectAfterLogin", href);
                    window.location.href = 'auth.html';
                }
            }
        });
    }

    if (currentPage === 'index.html') {
        showIndexWelcome();
    }
});