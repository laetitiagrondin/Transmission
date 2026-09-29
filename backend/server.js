// Importation du framework Express
const express = require("express");

// Importation des routes
const routes = require("./routes");

// Création de l'application Express
const app = express();

// Port utilisé par le serveur
const PORT = 3000;

// Permet au serveur de recevoir des données au format JSON
app.use(express.json());

// Utilisation des routes de l'API
app.use("/api", routes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
