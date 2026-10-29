// Importation du framework Express
const express = require("express");

// Importation du contrôleur utilisateur
const { registerUser, loginUser } = require("../controllers/userControllers");

// Importation du contrôleur des messages
const { sendMessage, getMessages } = require("../controllers/messageController");

// Importation du middleware d'authentification
const authenticateToken = require("../middleware/authMiddleware");

// Création du routeur
const router = express.Router();

// Route d'inscription
router.post("/users", registerUser);

// Route de connexion
router.post("/users/login", loginUser);

// Route d'envoi d'un message
router.post("/messages", authenticateToken, sendMessage);

// Route de récupération des messages échangés avec un utilisateur
router.get("/messages/:recipientId", authenticateToken, getMessages);

// Exportation des routes
module.exports = router;
