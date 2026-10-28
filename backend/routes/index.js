// Importation du framework Express
const express = require("express");

// Importation du contrôleur utilisateur
const { registerUser, loginUser, getMyProfile, updateMyProfile } = require("../controllers/userControllers");

// Importation du contrôleur des annonces
const { createAnnouncementController, getAnnouncementsController } = require("../controllers/announcementController");

// Importation du contrôleur des demandes d'échange
const { createExchangeRequest, getMyExchangeRequests } = require("../controllers/exchangeRequestController");

// Importation du middleware d'authentification
const authenticateToken = require("../middleware/authMiddleware");

// Création du routeur
const router = express.Router();

// Route principale de l'API
router.get("/", (req, res) => {
    res.json({ message: "Transmission API" });
});

// Route d'inscription
router.post("/users", registerUser);

// Route de connexion
router.post("/users/login", loginUser);

// Route de création d'une annonce
router.post("/announcements", authenticateToken, createAnnouncementController);

// Router de récupération d'une annonce
router.get("/announcements", authenticateToken, getAnnouncementsController);

// Route de récupération du profil de l'utilisateur connecté
router.get("/users/me", authenticateToken, getMyProfile);

// Route de modification du profil de l'utilisateur connecté
router.put("/users/me", authenticateToken, updateMyProfile);

// Vérification de l'authentification
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Accès autorisé", user: req.user });
});

// Route de création d'une demande d'échange
router.post("/exchange-requests", authenticateToken, createExchangeRequest);

// Route de récupération des demandes d'échange de l'utilisateur connecté
router.get("/exchange-requests", authenticateToken, getMyExchangeRequests);

module.exports = router;
