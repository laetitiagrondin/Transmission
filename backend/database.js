// Chargement des variables d'environnement
require("dotenv").config();

// Importation du module PostgreSQL
const { Pool } = require("pg");

// Création de la connexion à PostgreSQL
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Vérification de la connexion à la base de données
module.exports = db;
