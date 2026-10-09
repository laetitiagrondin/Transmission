// Importation de la connexion à PostgreSQL
const db = require("../database");

// Création d'une annonce
async function createAnnouncement(announcementData) {
    const { userId, title, description, type, subject, location} = announcementData;

    const result = await db.query(
        `INSERT INTO announcements
         (userId, title, description, type, subject, location)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
         [userId, title, description, type, subject, location]
    );

    return result.rows[0];
}

// Récupération des annonces
async function getAnnouncements() {
    const result = await db.query(
         `SELECT *
         FROM announcements`
    );

    return result.rows;
}

module.exports = { createAnnouncement, getAnnouncements };
