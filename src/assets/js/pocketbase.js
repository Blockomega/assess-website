import PocketBase from 'pocketbase';

const pb = new PocketBase('http://5.175.224.22:8090');

export default pb;

/**
 * Registriert einen neuen Benutzer
 * @param {Object} userData - Die Benutzerdaten
 * @param {string} userData.email - E-Mail-Adresse
 * @param {string} userData.password - Passwort
 * @param {string} userData.passwordConfirm - Passwortbestätigung
 * @param {string} userData.vorname - Vorname
 * @param {string} userData.nachname - Nachname
 * @returns {Promise} Promise mit dem erstellten Benutzer
 */
export async function registerUser(userData) {
    try {
        const data = {
            email: userData.email,
            password: userData.password,
            passwordConfirm: userData.passwordConfirm,
            name: `${userData.vorname} ${userData.nachname}`,
            vorname: userData.vorname,
            nachname: userData.nachname
        };

        // Benutzer in der "users" Collection erstellen
        const record = await pb.collection('users').create(data);

        return { success: true, record };
    } catch (error) {
        console.error('Registrierung fehlgeschlagen:', error);
        return { success: false, error };
    }
}

/**
 * Meldet einen Benutzer an
 * @param {string} email - E-Mail-Adresse
 * @param {string} password - Passwort
 * @returns {Promise} Promise mit den Auth-Daten
 */
export async function loginUser(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        return { success: true, authData };
    } catch (error) {
        console.error('Anmeldung fehlgeschlagen:', error);
        return { success: false, error };
    }
}

/**
 * Meldet den aktuellen Benutzer ab
 */
export function logoutUser() {
    pb.authStore.clear();
}

/**
 * Prüft, ob ein Benutzer angemeldet ist
 * @returns {boolean}
 */
export function isAuthenticated() {
    return pb.authStore.isValid;
}

/**
 * Gibt den aktuell angemeldeten Benutzer zurück
 * @returns {Object|null}
 */
export function getCurrentUser() {
    return pb.authStore.model || pb.authStore.record;
}
