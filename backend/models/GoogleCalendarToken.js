// Importation de la connexion à PostgreSQL
const db = require("../database");

// Récupération des autorisations Google d'un utilisateur
async function getGoogleCalendarToken(userId) {
    const result = await db.query("SELECT * FROM google_calendar_tokens WHERE user_id = $1", [userId]);

    return result.rows[0];
}

// Enregistrement des autorisations Google d'un utilisateur
async function saveGoogleCalendarToken(userId, accessTokenEncrypted, refreshTokenEncrypted, expiryDate) {
    const result = await db.query(
        `INSERT INTO google_calendar_tokens (
            user_id,
            access_token_encrypted,
            refresh_token_encrypted,
            expiry_date
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET
            access_token_encrypted = EXCLUDED.access_token_encrypted,
            refresh_token_encrypted = EXCLUDED.refresh_token_encrypted,
            expiry_date = EXCLUDED.expiry_date,
            updated_at = CURRENT_TIMESTAMP
        RETURNING *`,
        [userId, accessTokenEncrypted, refreshTokenEncrypted, expiryDate]
    );

    return result.rows[0];
}

// Suppression des autorisations Google d'un utilisateur
async function deleteGoogleCalendarToken(userId) {
    const result = await db.query("DELETE FROM google_calendar_tokens WHERE user_id = $1 RETURNING id", [userId]);

    return result.rowCount > 0;
}

// Exportation des fonctions du modèle
module.exports = { getGoogleCalendarToken, saveGoogleCalendarToken, deleteGoogleCalendarToken };
