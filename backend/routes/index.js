// Importation du framework Express
const express = require("express");

// Importation du contrôleur utilisateur
const { registerUser, loginUser } = require("../controllers/userControllers");

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

// Router de récupération d'une annonce
router.get("/announcements", authenticateToken, getAnnouncementsController);

// Vérification de l'authentification
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Accès autorisé", user: req.user });
});

module.exports = router;
