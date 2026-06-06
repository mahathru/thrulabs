// Thrulabs Route Guard System

function redirectToLogin() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const fullUrl = currentPage + window.location.search;
    localStorage.setItem("redirectAfterLogin", fullUrl);
    
    // Save selected parameters for user convenience
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

function requireAuth() {
    const isAuthenticated = localStorage.getItem('thru_token') !== null || 
                            Object.keys(localStorage).some(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
    if (!isAuthenticated) {
        redirectToLogin();
    }
}

function protectPage() {
    const protectedPages = [
        'academy.html',
        'course.html',
        'learn.html',
        'projects.html',
        'project.html',
        'resource.html',
        'simulator.html',
        'certification.html'
    ];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (protectedPages.includes(currentPage)) {
        requireAuth();
    }
}

// Automatically execute on load to prevent flash of protected content
protectPage();

// Expose functions globally
window.requireAuth = requireAuth;
window.protectPage = protectPage;
window.redirectToLogin = redirectToLogin;
