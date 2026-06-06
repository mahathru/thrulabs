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

            // Create profile if not found or sync cache
            if (!profile) {
                const provider = session.user.app_metadata?.provider || session.user.identities?.[0]?.provider || 'email';
                await createUserProfile(session.user, provider);
            } else {
                const username = profile.email ? profile.email.split('@')[0] : 'engineer';
                const thruUser = {
                    id: profile.id,
                    name: profile.full_name,
                    username: username,
                    firstName: profile.first_name,
                    lastName: profile.last_name,
                    email: profile.email,
                    avatar: profile.avatar_url,
                    certificateName: profile.certificate_name,
                    provider: profile.provider
                };
                localStorage.setItem('thru_user', JSON.stringify(thruUser));
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
        } catch (e) {
            console.error("Supabase signOut error", e);
        }
    }

    clearLocalSession();
    window.location.href = 'index.html';
}

function clearLocalSession() {
    localStorage.clear();
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

    let firstName = metadata.first_name || metadata.given_name || '';
    let lastName = metadata.last_name || metadata.family_name || '';

    if (!firstName) {
        const parts = fullName.trim().split(/\s+/);
        firstName = parts[0] || 'THRULABS';
        lastName = parts.slice(1).join(' ') || 'User';
    }

    const profile = {
        id: user.id,
        email: user.email || '',
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
        certificate_name: metadata.certificate_name || fullName,
        avatar_url: metadata.avatar_url || metadata.avatar || metadata.picture || '',
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
                first_name: firstName,
                last_name: lastName,
                certificate_name: profile.certificate_name,
                avatar_url: profile.avatar_url
            }
        });
    } catch (e) { }

    const username = metadata.user_name || metadata.preferred_username || user.email?.split('@')[0] || 'engineer';

    const thruUser = {
        id: profile.id,
        name: profile.full_name,
        username: username,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        avatar: profile.avatar_url,
        certificateName: profile.certificate_name,
        provider: profile.provider
    };

    localStorage.setItem('thru_user', JSON.stringify(thruUser));
    localStorage.setItem('thrulabs_user_name', profile.full_name);
    localStorage.setItem('thrulabs_user_email', profile.email);

    return thruUser;
}

async function updateUser(name, email, certname) {
    const user = getCurrentUser();
    if (!user || !user.id) return;

    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';

    const profileData = {
        full_name: name,
        first_name: firstName,
        last_name: lastName,
        email: email,
        certificate_name: certname || name
    };

    if (window.profileManager) {
        await window.profileManager.upsertProfile(user.id, profileData);
    } else {
        const payload = {
            id: user.id,
            full_name: name,
            first_name: firstName,
            last_name: lastName,
            email: email,
            certificate_name: certname || name,
            avatar_url: user.avatar || '',
            provider: user.provider || 'email',
            created_at: new Date().toISOString()
        };
        try {
            await supabaseClient.from('user_profiles').upsert(payload, { onConflict: 'id' });
        } catch(e){}
        localStorage.setItem('thru_user', JSON.stringify({
            id: user.id,
            name: name,
            username: user.username || email.split('@')[0] || 'engineer',
            firstName: firstName,
            lastName: lastName,
            email: email,
            avatar: user.avatar || '',
            certificateName: certname || name,
            provider: user.provider || 'email'
        }));
    }
    updateNavbar();
}

function showUserDropdown() {
    const dropdown = document.getElementById('user-dropdown-menu');
    const chevron = document.getElementById('user-dropdown-chevron');
    if (dropdown) {
        dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
        dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
        if (chevron) chevron.classList.add('rotate-180');
    }
}

function hideUserDropdown() {
    const dropdown = document.getElementById('user-dropdown-menu');
    const chevron = document.getElementById('user-dropdown-chevron');
    if (dropdown) {
        dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
        dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
        if (chevron) chevron.classList.remove('rotate-180');
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) {
        const isHidden = dropdown.classList.contains('invisible');
        if (isHidden) {
            showUserDropdown();
        } else {
            hideUserDropdown();
        }
    }
}

function updateNavbarUser() {
    updateNavbar();
}

function updateNavbar() {
    const container = document.getElementById('nav-auth-container');
    if (!container) return;

    const isAuthenticated = localStorage.getItem('thru_token') !== null || 
                            Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token'));

    if (isAuthenticated) {
        const user = getCurrentUser() || { name: 'User', firstName: 'User', email: '', avatar: '' };
        const firstName = user.firstName || user.name.split(' ')[0] || 'User';

        let avatarHtml = '';
        if (user.avatar) {
            avatarHtml = `<img src="${user.avatar}" alt="Avatar" class="w-6 h-6 rounded-full border border-accent/40 object-cover">`;
        } else {
            const initial = (firstName || 'U').trim().charAt(0).toUpperCase();
            avatarHtml = `
                <div class="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-bright font-bold text-[9px]">
                    ${initial}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="flex items-center gap-4 relative">
                <span id="welcome-message" class="text-[9px] font-mono text-emerald-400 animate-pulse hidden mr-1">Welcome back, ${user.name}</span>
                <div class="relative font-mono z-50">
                    <button onclick="event.stopPropagation(); window.toggleUserDropdown();" class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all text-[9px] text-white hover-target select-none focus:outline-none">
                        <div class="relative w-6 h-6 rounded-full shrink-0 flex items-center justify-center">
                            ${avatarHtml}
                            <span class="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-black rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] z-10"></span>
                        </div>
                        <span class="max-w-[80px] truncate text-white/80">${firstName}</span>
                        <i id="user-dropdown-chevron" data-lucide="chevron-down" class="w-3.5 h-3.5 opacity-50 transition-transform"></i>
                    </button>
                    <div id="user-dropdown-menu" class="absolute right-0 top-full pt-2 w-48 z-50 opacity-0 invisible translate-y-2 transition-all duration-300 ease-out text-[9px] uppercase tracking-wider">
                        <div class="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 shadow-2xl space-y-1">
                            <a href="dashboard.html" class="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all hover-target">
                                <i data-lucide="user" class="w-3.5 h-3.5 text-accent-bright"></i> Profile
                            </a>
                            <a href="dashboard.html#certificates" class="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all hover-target">
                                <i data-lucide="award" class="w-3.5 h-3.5 text-amber-400"></i> My Certificates
                            </a>
                            <a href="dashboard.html#settings" class="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all hover-target">
                                <i data-lucide="settings" class="w-3.5 h-3.5 text-emerald-400"></i> Account Settings
                            </a>
                            <button onclick="window.logout();" class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left uppercase hover-target">
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
window.updateNavbarUser = updateNavbarUser;
window.showUserDropdown = showUserDropdown;
window.hideUserDropdown = hideUserDropdown;
window.toggleUserDropdown = toggleUserDropdown;
window.checkAuth = checkAuth;

// Expose legacy auth namespace for absolute compatibility
window.auth = {
    isAuthenticated: () => localStorage.getItem('thru_token') !== null || Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token')),
    getCurrentUser,
    getUser: getCurrentUser,
    updateUser,
    checkAuth,
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    logout,
    requireAuth,
    redirectAfterLogin,
    updateNavbar,
    updateNavbarUser,
    showUserDropdown,
    hideUserDropdown,
    toggleUserDropdown,
    createUserProfile,
    showIndexWelcome
};

// Global click-away listener for dropdown collapse
document.addEventListener('click', () => {
    window.hideUserDropdown();
});

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
    const publicPages = ['index.html', 'about.html', 'contact.html', 'auth.html', 'terms.html', 'privacy.html'];
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