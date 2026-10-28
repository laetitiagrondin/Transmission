// Importation de la connexion à PostgreSQL
const db = require("../database");

// Création d'une demande d'échange
async function createExchangeRequest(req, res) {
    try {
        const { announcementId, message } = req.body;

        if (!announcementId) {
            return res.status(400).json({ message: "Veuillez sélectionner une annonce." });
        }

        const announcement = await db.query(
            `SELECT id, "userId"
             FROM announcements
             WHERE id = $1`,
             [announcementId]
        );

        if (announcement.rows.length === 0) {
            return res.status(404).json({ message: "Annonce introuvable." });
        }

        if (announcement.rows[0].userId === req.user.id) {
            return res.status(400).json({ message: "Vous ne pouvez pas demander un échange sur votre propre annonce." });
        }

        const result = await db.query(
            `INSERT INTO "exchangeRequests" ("announcementId", "requesterId", message, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [announcementId, req.user.id, message || "", "en_attente"]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Erreur lors de la création de la demande d'échange :", error);
        return res.status(500).json({ message: "Erreur lors de la création de la demande d'échange." });
    }
}

// Récupération des demandes d'échange liées à l'utilisateur connecté
async function getMyExchangeRequests(req, res) {
    try {
        const result = await db.query(
            `SELECT "exchangeRequests".*, announcements.title AS "announcementTitle", announcements."userId" AS "announcementOwnerId"
             FROM "exchangeRequests"
             JOIN announcements ON announcements.id = "exchangeRequests"."announcementId"
             WHERE "exchangeRequests"."requesterId" = $1 OR announcements."userId" = $1
             ORDER BY "exchangeRequests"."createdAt" DESC`,
            [req.user.id]
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des demandes d'échange :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des demandes d'échange." });
    }
}

module.exports = { createExchangeRequest, getMyExchangeRequests };
