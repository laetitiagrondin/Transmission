// Importation de la bibliothèque Google APIs
const { createOAuth2Client, scopes } = require("../config/googleCalendar");

// Importation de jsonwebtoken
const jwt = require("jsonwebtoken");

// Importation du modèle Google Calendar
const { getGoogleCalendarToken, saveGoogleCalendarToken } = require("../models/GoogleCalendarToken");

// Importation des fonctions de chiffrement
const { encryptToken, decryptToken } = require("../utils/tokenEncryption");

// Création du lien d'autorisation Google
async function connectGoogleCalendar(req, res) {
    try {
        // Création d'un état sécurisé associé à l'utilisateur connecté
        const state = jwt.sign(
            { userId: req.user.id, purpose: "google-calendar" },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        // Création du client OAuth Google
        const oauth2Client = createOAuth2Client();

        // Génération du lien d'autorisation
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            include_granted_scopes: true,
            prompt: "consent",
            state
        });

        res.json({ url: authUrl });
    } catch (error) {
        console.error("Erreur de connexion à Google Calendar :", error);
        res.status(500).json({ message: "Impossible de démarrer la connexion Google Calendar." });
    }
}

// Traitement du retour d'autorisation Google
async function googleCalendarCallback(req, res) {
    try {
        // Récupération du code et de l'état transmis par Google
        const { code, state } = req.query;

        if (!code || !state) {
            return res.status(400).send("Autorisation Google incomplète.");
        }

        // Vérification de l'état sécurisé
        const decodedState = jwt.verify(state, process.env.JWT_SECRET);

        if (decodedState.purpose !== "google-calendar" || !decodedState.userId) {
            return res.status(403).send("État d'autorisation invalide.");
        }

        // Création du client OAuth Google
        const oauth2Client = createOAuth2Client();

        // Échange du code contre les jetons Google
        const { tokens } = await oauth2Client.getToken(code);

        if (!tokens.access_token) {
            throw new Error("Jeton d'accès Google manquant.");
        }

        // Récupération des autorisations déjà enregistrées
        const existingToken = await getGoogleCalendarToken(decodedState.userId);

        // Conservation du jeton de renouvellement existant si Google n'en fournit pas un nouveau
        const refreshToken = tokens.refresh_token || (existingToken ? decryptToken(existingToken.refresh_token_encrypted) : null);

        if (!refreshToken) {
            throw new Error("Jeton de renouvellement Google manquant.");
        }

        // Chiffrement des jetons avant leur stockage
        const accessTokenEncrypted = encryptToken(tokens.access_token);
        const refreshTokenEncrypted = encryptToken(refreshToken);

        // Enregistrement des autorisations dans PostgreSQL
        await saveGoogleCalendarToken(decodedState.userId, accessTokenEncrypted, refreshTokenEncrypted, tokens.expiry_date || null);

        // Redirection vers le frontend après autorisation
        res.redirect("http://localhost:5173/?googleCalendar=connected");
    } catch (error) {
        console.error("Erreur lors du retour Google Calendar :", error);
        res.redirect("http://localhost:5173/?googleCalendar=error");
    }
}

// Exportation des fonctions du contrôleur
module.exports = { connectGoogleCalendar, googleCalendarCallback };
