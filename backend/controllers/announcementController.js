// Importation de la connexion à PostgreSQL
const db = require("../database");

// Création d'une annonce
async function createAnnouncement(announcementData) {
    const { userId, title, description, type, subject, location} = announcementData;

    const result = await db.query(
        `INSERT INTO nanouncements
         (userId, title, description, type, subject, location)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
         [userId, title, description, type, subject, location]
    );

    return result.rows[0];
}

module.exports = { createAnnouncement };
