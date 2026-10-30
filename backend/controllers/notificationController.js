// Importation du modèle Notification
const Notification = require("../models/Notification");

// Récupération des notifications de l'utilisateur connecté
async function getNotificationsController(req, res) {
    try {
        const notifications = await Notification.getNotifications(req.user.id);

        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Erreur lors de la récupération des notifications :", error);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération des notifications." });
    }
}

// Marquage d'une notification comme lue
async function markNotificationAsReadController(req, res) {
    try {
        const notificationId = Number(req.params.id);

        if (!Number.isInteger(notificationId) || notificationId <= 0) {
            return res.status(400).json({ message: "Identifiant de notification invalide." });
        }

        const notification = await Notification.markNotificationAsRead(notificationId, req.user.id);

        if (!notification) {
            return res.status(404).json({ message: "Notification introuvable." });
        }

        return res.status(200).json(notification);
    } catch (error) {
        console.error("Erreur lors du marquage de la notification :", error);
        return res.status(500).json({ message: "Erreur serveur lors du marquage de la notification." });
    }
}

module.exports = { getNotificationsController, markNotificationAsReadController };
