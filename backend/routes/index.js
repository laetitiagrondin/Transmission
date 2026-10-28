// Importation du framework Express
const express = require("express");

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

// Route de création d'une demande d'échange
router.post("/exchange-requests", authenticateToken, createExchangeRequest);

// Route de récupération des demandes d'échange de l'utilisateur connecté
router.get("/exchange-requests", authenticateToken, getMyExchangeRequests);

module.exports = router;
