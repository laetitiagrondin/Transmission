// Importation du framework Express
const express = require("express");

// Création de l'application Express
const app = express();

// Port utilisé par le serveur
const PORT = 3000;

// Permet au serveur de recevoir des données au format JSON
app.use(express.json());

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
