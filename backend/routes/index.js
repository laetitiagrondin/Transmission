// Importation du framework Express
const express = require("express");

// Importation du contrôleur utilisateur
const { registerUser, loginUser } = require("../controllers/userControllers");

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

module.exports = router;
