export function getThemeClasses() {
    const theme = localStorage.getItem('theme') || 'dark';

    if (theme === 'light') {
        return {
            navbar: 'navbar-light bg-white',
            dropdown: 'dropdown-menu',
            body: 'bg-light text-dark',
            container: 'bg-light text-dark'
        };
    } else {
        return {
            navbar: 'navbar-dark bg-black',
            dropdown: 'dropdown-menu-dark',
            body: 'bg-dark text-light',
            container: 'bg-dark text-light'
        };
    }
}

export function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}

export function applyThemeToPage(keepTransitioning = false) {
    const classes = getThemeClasses();

    // Body-Klassen setzen (theme-transitioning beibehalten falls aktiv)
    const baseClasses = 'd-flex flex-column min-vh-100';
    const transitionClass = keepTransitioning ? 'theme-transitioning' : '';
    document.body.className = `${baseClasses} ${classes.body} ${transitionClass}`.trim();

    // Container-Klassen setzen
    const container = document.getElementById('main-content');
    if (container) {
        container.className = `container text-center ${classes.container}`;
    }
}

export function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'bi bi-moon-fill';
    } else {
        iconElement.className = 'bi bi-sun-fill';
    }
}

export function initThemeToggle(updateMenuCallback) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Gespeichertes Theme laden oder Dark Mode als Standard verwenden
    const savedTheme = getCurrentTheme();
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);

    // Theme-Toggle Event Listener
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Transition-Klasse ZUERST hinzufügen
        document.body.classList.add('theme-transitioning');

        // requestAnimationFrame verwenden für smooth transition
        requestAnimationFrame(() => {
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Menu mit neuen Theme-Klassen neu erstellen (transition beibehalten)
            updateMenuCallback(true);

            // Icon aktualisieren (neues Element nach Menu-Update)
            const newThemeIcon = document.getElementById('theme-icon');
            updateThemeIcon(newTheme, newThemeIcon);

            // Transition-Klasse nach 300ms entfernen
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);

            // Event Listener neu initialisieren
            initThemeToggle(updateMenuCallback);
        });
    });
}

// Theme-Transitions als CSS hinzufügen
export function initThemeTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-transitioning,
        .theme-transitioning *,
        .theme-transitioning *::before,
        .theme-transitioning *::after {
            transition: background-color 300ms ease-in-out, 
                        color 300ms ease-in-out, 
                        border-color 300ms ease-in-out !important;
        }
    `;
    document.head.appendChild(style);
}
