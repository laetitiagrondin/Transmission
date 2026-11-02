// Importation de Google APIs
const { google } = require("googleapis");

// Définition des autorisations Google Calendar
const scopes = ["https://www.googleapis.com/auth/calendar.events"];

// Création du client OAuth Google
function createOAuth2Client() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
}

// Exportation du client OAuth et des autorisations
module.exports = { createOAuth2Client, scopes };
