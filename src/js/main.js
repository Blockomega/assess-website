import '../scss/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Tooltip, Toast, Popover } from 'bootstrap';

function initMenu() {
    const nav = document.createElement('nav');
    nav.className = "navbar navbar-expand-lg w-50 mx-auto mt-3 rounded-4 navbar-dark bg-black align-items-center";
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
                <li class="nav-item"><a class="nav-link text-primary d-flex align-items-center" aria-current="page" href="#">Download</a></li>
                <li class="nav-item"><a class="nav-link d-flex align-items-center" href="#">Dokumentation</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#">Kontakt</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Impressum</a></li>
                        <li><a class="dropdown-item" href="#">Über uns</a></li>
                    </ul>
                </li>
            </ul>

            <ul class="navbar-nav m-0 align-items-center">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-fill"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Anmelden</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    `;
    document.body.prepend(nav);
}

// Sicher aufrufen, auch wenn das Modul nach dem DOM geladen wird
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}
