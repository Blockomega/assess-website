import { loginUser } from './pocketbase.js';

/**
 *  Initialisierung
 */
export function initLoginPage() {
    const form = document.querySelector('#login-form');
    const button = document.querySelector('#login-button');

    if (!form || !button) {
        console.error('Login-Formular oder Button nicht gefunden');
        return;
    }

    button.addEventListener('click', async (e) => {
        e.preventDefault();

        clearMessages();

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!validateForm(email, password)) {
            return;
        }

        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Wird angemeldet...';

        const result = await loginUser(email, password);

        if (result.success) {
            showSuccess('Erfolgreich angemeldet! Sie werden weitergeleitet...');
            form.reset();

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            showError(getErrorMessage(result.error));
            button.disabled = false;
            button.innerHTML = 'Anmelden';
        }
    });
}

/**
 *  Validierung
 */
function validateForm(email, password) {
    if (!email || !password) {
        showError('Bitte füllen Sie alle Felder aus.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return false;
    }

    return true;
}

/**
 *  Erfolgsmeldung
 */
function showSuccess(message) {
    const messageContainer = document.querySelector('#message-container');
    if (!messageContainer) return;

    messageContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

/**
 *  Fehler
 */
function showError(message) {
    const messageContainer = document.querySelector('#message-container');
    if (!messageContainer) return;

    messageContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

/**
 *  Löscht Fehler/Erfolgsmeldungen
 */
function clearMessages() {
    const messageContainer = document.querySelector('#message-container');
    if (messageContainer) {
        messageContainer.innerHTML = '';
    }
}

/**
 *  Fehler getter von PocketBase
 */
function getErrorMessage(error) {
    if (!error) {
        return 'Ein unbekannter Fehler ist aufgetreten.';
    }

    // Falsche Anmeldedaten
    if (error.status === 400) {
        return 'E-Mail oder Passwort ist falsch.';
    }

    if (error.message) {
        return error.message;
    }

    return 'Die Anmeldung ist fehlgeschlagen. Bitte versuchen Sie es erneut.';
}
