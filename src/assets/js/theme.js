export function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}

export function applyTheme(theme) {
    // Bootstrap's natives Theme-System nutzen
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    // Body Klassen für Layout
    document.body.className = 'd-flex flex-column min-vh-100';
}

export function updateThemeIcon(theme) {
    const iconElement = document.getElementById('theme-icon');
    if (!iconElement) return;

    if (theme === 'dark') {
        iconElement.className = 'bi bi-moon-fill fs-6';
    } else {
        iconElement.className = 'bi bi-sun-fill fs-5';
    }
}

export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Transition-Klasse für smooth animation
        document.documentElement.classList.add('theme-transitioning');

        applyTheme(newTheme);
        updateThemeIcon(newTheme);

        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    });
}

export function initThemeTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        /* Smooth transitions für Bootstrap Theme-Wechsel */
        html.theme-transitioning,
        html.theme-transitioning *,
        html.theme-transitioning *::before,
        html.theme-transitioning *::after {
            transition: background-color 300ms ease-in-out,
                        color 300ms ease-in-out,
                        border-color 300ms ease-in-out,
                        box-shadow 300ms ease-in-out !important;
        }
        
        /* Navbar spezifisch */
        html.theme-transitioning .navbar {
            transition: background-color 300ms ease-in-out,
                        box-shadow 300ms ease-in-out !important;
        }
    `;
    document.head.appendChild(style);
}


