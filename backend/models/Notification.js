// Importation de la connexion à PostgreSQL
const db = require("../database");

// Création d'une notification
async function createNotification(userId, type, message) {
    const result = await db.query(
        `INSERT INTO notifications ("userId", type, message)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [userId, type, message]
    );

    return result.rows[0];
}

// Récupération des notifications d'un utilisateur
async function getNotifications(userId) {
    const result = await db.query(
        `SELECT *
         FROM notifications
         WHERE "userId" = $1
         ORDER BY "createdAt" DESC`,
        [userId]
    );

    return result.rows;
}

// Marquage d'une notification comme lue
async function markNotificationAsRead(notificationId, userId) {
    const result = await db.query(
        `UPDATE notifications
         SET "isRead" = TRUE
         WHERE id = $1 AND "userId" = $2
         RETURNING *`,
        [notificationId, userId]
    );

    return result.rows[0];
}

module.exports = { createNotification, getNotifications, markNotificationAsRead };