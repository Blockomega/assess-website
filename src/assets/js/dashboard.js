import { isAuthenticated, getCurrentUser } from './pocketbase.js';

export function initDashboardPage() {
    if (!isAuthenticated()) {
        window.location.href = '/login';
        return;
    }

    displayUserInfo();
}

function displayUserInfo() {
    const user = getCurrentUser();

    if (!user) return;

    const nameElement = document.querySelector('#user-name');
    const emailElement = document.querySelector('#user-email');

    if (nameElement) {
        nameElement.textContent = user.name || user.email.split('@')[0];
    }

    if (emailElement) {
        emailElement.textContent = user.email;
    }
}
