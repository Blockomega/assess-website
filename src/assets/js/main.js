import '../scss/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { } from 'bootstrap';
import {
    getCurrentTheme,
    applyTheme,
    initThemeToggle,
    initThemeTransitions
} from './theme.js';
import { isAuthenticated, getCurrentUser, logoutUser } from './pocketbase.js';

export { getCurrentTheme };

/* --- Menüfunktionen --- */

function createMenu() {
    const isLoggedIn = isAuthenticated();

    const nav = document.createElement('nav');
    nav.id = 'main-navbar';
    nav.className = 'navbar navbar-expand-lg w-60 mx-auto mt-3 rounded-4 align-items-center';
    nav.innerHTML = `
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/">
            <i class="bi bi-gear-fill"></i>
            <p class="me-2"></p>
            <h3 class="m-0">In Arbeit</h3>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
                <li class="nav-item"><a class="nav-link text-primary d-flex align-items-center" aria-current="page" href="#">Wettkämpfe</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Programm</a>
                    <ul class="dropdown-menu">
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Informationen</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Installation</a></li>
                        <li><a class="dropdown-item" href="#">Dokumentation</a></li>
                        <li><hr class="dropdown-divider"></li>
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link d-flex align-items-center" href="#">Kontakt</a></li>
            </ul>

            <ul class="navbar-nav m-0 align-items-center">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#" id="theme-toggle" role="button">
                        <i class="bi bi-moon-fill" id="theme-icon"></i>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-fill fs-5"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" id="user-menu">
                        <li><hr class="dropdown-divider"></li>
                        ${isLoggedIn ? `
                        <li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logout-button">Abmelden</a></li>
                        ` : `
                        <li><a class="dropdown-item" href="/login">Anmelden</a></li>
                        <li><a class="dropdown-item" href="/register">Registrieren</a></li>
                        `}
                        <li><hr class="dropdown-divider"></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    `;
    return nav;
}

/**
 * Initialisiert den Logout-Button
 */
function initLogout() {
    const logoutButton = document.querySelector('#logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
            window.location.href = '/';
        });
    }
}

/* --- Initialisierungsfunktion --- */

export function initPage() {
    const nav = createMenu();
    document.body.prepend(nav);

    initThemeTransitions();
    applyTheme(getCurrentTheme());
    initThemeToggle();
    initLogout();
}
