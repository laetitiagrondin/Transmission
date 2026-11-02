// Importation de la connexion à PostgreSQL
const db = require("../database");

// Importation du modèle Appointment
const Appointment = require("../models/Appointment");

// Importation du modèle Notification
const Notification = require("../models/Notification");

// Importation de la bibliothèque Google APIs
const { google } = require("googleapis");

// Importation de la configuration Google Calendar
const { createOAuth2Client } = require("../config/googleCalendar");

// Importation du modèle Google Calendar
const { getGoogleCalendarToken } = require("../models/GoogleCalendarToken");

// Importation de la fonction de déchiffrement
const { decryptToken } = require("../utils/tokenEncryption");

// Création d'un rendez-vous
async function createAppointment(req, res) {
    try {
        const { exchangeRequestId, appointmentDate, location } = req.body;

        if (!exchangeRequestId || !appointmentDate || !location) {
            return res.status(400).json({ message: "Veuillez renseigner tous les champs du rendez-vous." });
        }

        const date = new Date(appointmentDate);

        if (Number.isNaN(date.getTime()) || date <= new Date()) {
            return res.status(400).json({ message: "Veuillez choisir une date future valide." });
        }

        const request = await db.query(
            `SELECT "exchangeRequests".id, "exchangeRequests"."requesterId",
                    announcements."userId" AS "announcementOwnerId",
                    announcements.title AS "announcementTitle"
             FROM "exchangeRequests"
             JOIN announcements ON announcements.id = "exchangeRequests"."announcementId"
             WHERE "exchangeRequests".id = $1
             AND "exchangeRequests".status = 'acceptee'`,
            [exchangeRequestId]
        );

        if (request.rows.length === 0) {
            return res.status(404).json({ message: "Demande d'échange acceptée introuvable." });
        }

        const exchange = request.rows[0];

        if (exchange.requesterId !== req.user.id && exchange.announcementOwnerId !== req.user.id) {
            return res.status(403).json({ message: "Vous ne participez pas à cette demande d'échange." });
        }

        // Enregistrement du rendez-vous dans PostgreSQL
        const result = await db.query(
            `INSERT INTO appointments ("exchangeRequestId", "appointmentDate", location)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [exchangeRequestId, date, location]
        );

        const appointment = result.rows[0];
        const otherUserId = exchange.requesterId === req.user.id ? exchange.announcementOwnerId : exchange.requesterId;

        // Création d'une notification pour l'autre participant
        await Notification.createNotification(otherUserId, "appointment", "Un rendez-vous a été proposé pour votre échange.");

        let googleCalendarSynced = false;
        let googleCalendarMessage = "Votre compte Google Calendar n'est pas connecté.";

        // Récupération du compte Google Calendar de l'utilisateur connecté
        const savedToken = await getGoogleCalendarToken(req.user.id);

        if (savedToken) {
            try {
                // Création du client OAuth Google
                const oauth2Client = createOAuth2Client();

                // Récupération des jetons Google déchiffrés
                oauth2Client.setCredentials({
                    access_token: decryptToken(savedToken.access_token_encrypted),
                    refresh_token: decryptToken(savedToken.refresh_token_encrypted),
                    expiry_date: Number(savedToken.expiry_date)
                });

                // Création du client Google Calendar
                const calendar = google.calendar({ version: "v3", auth: oauth2Client });

                // Définition de l'événement
                const endDate = new Date(date.getTime() + 60 * 60 * 1000);

                await calendar.events.insert({
                    calendarId: "primary",
                    requestBody: {
                        summary: `Rendez-vous Transmission : ${exchange.announcementTitle}`,
                        description: `Rendez-vous créé sur Transmission.\nDemande d'échange : ${exchangeRequestId}`,
                        location,
                        start: {
                            dateTime: date.toISOString()
                        },
                        end: {
                            dateTime: endDate.toISOString()
                        }
                    }
                });

                googleCalendarSynced = true;
                googleCalendarMessage = "Le rendez-vous a également été ajouté à votre Google Calendar.";
            } catch (calendarError) {
                console.error("Erreur lors de la création de l'événement Google Calendar :", calendarError);
                googleCalendarMessage = "Le rendez-vous est enregistré dans Transmission, mais son ajout à Google Calendar a échoué.";
            }
        }

        return res.status(201).json({ ...appointment, googleCalendarSynced, googleCalendarMessage });
    } catch (error) {
        console.error("Erreur lors de la création du rendez-vous :", error);

        if (error.code === "23505") {
            return res.status(409).json({ message: "Un rendez-vous existe déjà pour cette demande d'échange." });
        }

        return res.status(500).json({ message: "Erreur lors de la création du rendez-vous." });
    }
}

// Récupération des rendez-vous de l'utilisateur connecté
async function getMyAppointments(req, res) {
    try {
        const result = await db.query(
            `SELECT appointments.*,
                    "exchangeRequests"."requesterId",
                    announcements."userId" AS "announcementOwnerId",
                    announcements.title AS "announcementTitle"
             FROM appointments
             JOIN "exchangeRequests"
                 ON appointments."exchangeRequestId" = "exchangeRequests".id
             JOIN announcements
                 ON announcements.id = "exchangeRequests"."announcementId"
             WHERE "exchangeRequests"."requesterId" = $1
                OR announcements."userId" = $1
             ORDER BY appointments."appointmentDate" ASC`,
            [req.user.id]
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);

        return res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous." });
    }
}

module.exports = { createAppointment, getMyAppointments };
