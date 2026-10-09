// Importation de la connexion à PostgreSQL
const db = require("../database");

// Création d'une annonce
async function createAnnouncement(announcementData) {
    const { userId, title, description, type, subject, location} = announcementData;

    const result = await db.query(
        `INSERT INTO announcements
         ("userId", title, description, type, subject, location)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
         [userId, title, description, type, subject, location]
    );

    return result.rows[0];
}

// Récupération des annonces
async function getAnnouncements() {
    const result = await db.query(`SELECT * FROM announcements`);

    return result.rows;
}

// Création d'une annonce avec gestion des erreurs
async function createAnnouncementController(req, res) {
    try {
        const announcement = await createAnnouncement({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json(announcement);
    } catch (error) {
        console.error("Erreur lors de la création de l'annonce :", error);

        res.status(500).json({ message: "Erreur lors de la création de l'annonce." });
    }
}

// Récupération des annonces avec gestion des erreurs
async function getAnnouncementsController(req, res) {
    try {
        const announcements = await getAnnouncements();

        res.status(200).json(announcements);
    } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);

        res.status(500).json({ message: "Erreur lors de la récupération des annonces." });
    }
}

module.exports = { createAnnouncement, getAnnouncements, createAnnouncementController, getAnnouncementsController };
