// Importation du framework Express
const express = require("express");

// Création du routeur
const router = express.Router();

// Route principale de l'API
router.get("/", (req, res) => {
    res.json({
        message: "Transmission API"
    });
});

module.exports = router;
