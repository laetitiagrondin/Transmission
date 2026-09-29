// Importation du framework Express
const express = require("express");

// Importation de CORS
const cors = require("cors");

// Importation des routes
const routes = require("./routes");

// Création de l'application Express
const app = express();

// Port utilisé par le serveur
const PORT = 3000;

// Permet au serveur de recevoir des données au format JSON
app.use(express.json());

// Autorisation des requêtes provenant du Front-End
app.use(cors());

// Utilisation des routes de l'API
app.use("/api", routes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
