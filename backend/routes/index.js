// Importation du framework Express
const express = require("express");

// Importation du contrôleur utilisateur
const { registerUser, loginUser, getMyProfile } = require("../controllers/userControllers");

// Importation du contrôleur des annonces
const { createAnnouncementController, getAnnouncementsController } = require("../controllers/announcementController");

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

// Route de récupération d'une annonce
router.get("/announcements", authenticateToken, getAnnouncementsController);

// Route de récupération du profil de l'utilisateur connecté
router.get("/users/me", authenticateToken, getMyProfile);

// Vérification de l'authentification
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Accès autorisé", user: req.user });
});

module.exports = router;
