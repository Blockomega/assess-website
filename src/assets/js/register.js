import { registerUser } from './pocketbase.js';

/**
 *  Initialisierung
 */
export function initRegisterPage() {
    const form = document.querySelector('#register-form');
    const button = document.querySelector('#register-button');

    if (!form || !button) {
        console.error('Registrierungsformular oder Button nicht gefunden');
        return;
    }

    button.addEventListener('click', async (e) => {
        e.preventDefault();

        clearMessages();

        const formData = new FormData(form);
        const userData = {
            vorname: formData.get('vorname'),
            nachname: formData.get('nachname'),
            email: formData.get('email'),
            password: formData.get('password'),
            passwordConfirm: formData.get('password_confirm')
        };

        if (!validateForm(userData)) {
            return;
        }

        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Wird erstellt...';

        const result = await registerUser(userData);

        if (result.success) {
            showSuccess('Account erfolgreich erstellt! Sie werden zur Anmeldung weitergeleitet...');
            form.reset();

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            showError(getErrorMessage(result.error));
            button.disabled = false;
            button.innerHTML = 'Account erstellen';
        }
    });
}

/**
 *  Validierung
 */
function validateForm(userData) {
    if (!userData.vorname || !userData.nachname || !userData.email || !userData.password || !userData.passwordConfirm) {
        showError('Bitte füllen Sie alle Felder aus.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return false;
    }

    if (userData.password.length < 8) {
        showError('Das Passwort muss mindestens 8 Zeichen lang sein.');
        return false;
    }

    if (userData.password !== userData.passwordConfirm) {
        showError('Die Passwörter stimmen nicht überein.');
        return false;
    }

    return true;
}

/**
 *  Erfolg
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

function clearMessages() {
    const messageContainer = document.querySelector('#message-container');
    if (messageContainer) {
        messageContainer.innerHTML = '';
    }
}

/**
 *  PB Fehler getter
 */
function getErrorMessage(error) {
    if (!error) {
        return 'Ein unbekannter Fehler ist aufgetreten.';
    }

    if (error.data && error.data.data) {
        const data = error.data.data;

        if (data.email) {
            return 'Diese E-Mail-Adresse wird bereits verwendet.';
        }
        if (data.password) {
            return 'Das Passwort erfüllt nicht die Anforderungen.';
        }
    }

    if (error.message) {
        return error.message;
    }

    return 'Die Registrierung ist fehlgeschlagen. Bitte versuchen Sie es erneut.';
}
