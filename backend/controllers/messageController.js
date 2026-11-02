// Importation de la connexion à PostgreSQL
const db = require("../database");

// Importation du modèle Message
const Message = require("../models/Message");

// Importation du modèle Notification
const Notification = require("../models/Notification");

// Envoi d'un message
async function sendMessage(req, res) {
    try {
        const senderId = req.user.id;
        const { recipientId, content } = req.body;

        if (!recipientId || !content || !content.trim()) {
            return res.status(400).json({
                message: "Le destinataire et le contenu du message sont obligatoires."
            });
        }

        const result = await db.query(
            `INSERT INTO messages ("senderId", "recipientId", content)
             VALUES ($1, $2, $3)
             RETURNING id, "senderId", "recipientId", content, "createdAt"`,
            [senderId, recipientId, content.trim()]
        );

        const message = result.rows[0];

        if (senderId !== Number(recipientId)) {
            await Notification.createNotification(Number(recipientId), "message", "Vous avez reçu un nouveau message.");
        }

        return res.status(201).json({
            message: "Message envoyé avec succès.",
            data: new Message(message.id, message.senderId,message.recipientId, message.content, message.createdAt)
        });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
        return res.status(500).json({ message: "Erreur serveur lors de l'envoi du message." });
    }
}

// Récupération des messages échangés avec un utilisateur
async function getMessages(req, res) {
    try {
        const userId = req.user.id;
        const { recipientId } = req.params;

        const result = await db.query(
            `SELECT id, "senderId", "recipientId", content, "createdAt"
             FROM messages
             WHERE ("senderId" = $1 AND "recipientId" = $2)
                OR ("senderId" = $2 AND "recipientId" = $1)
             ORDER BY "createdAt" ASC`,
            [userId, recipientId]
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération des messages." });
    }
}

module.exports = { sendMessage, getMessages };
