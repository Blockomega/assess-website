import '../scss/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { } from 'bootstrap';

import {
    getThemeClasses,
    applyThemeToPage,
    initThemeToggle,
    initThemeTransitions
} from './theme.js';

function createMenu() {
    const classes = getThemeClasses();
    const nav = document.createElement('nav');
    nav.id = 'main-navbar';
    nav.className = `navbar navbar-expand-lg w-60 mx-auto mt-3 rounded-4 ${classes.navbar} align-items-center`;
    nav.innerHTML = `
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
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
                    <ul class="dropdown-menu ${classes.dropdown}">
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
                    <ul class="dropdown-menu ${classes.dropdown} dropdown-menu-end">
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Anmelden</a></li>
                        <li><a class="dropdown-item" href="#">Registrieren</a></li>
                        <li><hr class="dropdown-divider"></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    `;
    return nav;
}

function initMenu() {
    const nav = createMenu();
    document.body.prepend(nav);

    initThemeTransitions();
    applyThemeToPage();
    initThemeToggle(updateMenuTheme);
}

function updateMenuTheme(keepTransitioning = false) {
    const oldNav = document.getElementById('main-navbar');
    if (oldNav) {
        const newNav = createMenu();
        oldNav.replaceWith(newNav);
    }

    applyThemeToPage(keepTransitioning);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}
