// Importation de la connexion à PostgreSQL
const db = require("../database");

// Importation du modèle User
const User = require("../models/User");

// Importation de bcrypt
const bcrypt = require("bcrypt");

// Création d'un utilisateur
async function createUser(userData) {
    const { firstName, lastName, email, password } = userData;

    const result = await db.query(
        `INSERT INTO users (firstName, lastName, email, password)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [firstName, lastName, email, password]
    );

    return result.rows[0];
}

// Création d'un compte utilisateur
async function registerUser(req, res) {
    const { firstName, lastName, email, password } = req.body;

    // Vérification des données obligatoires
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires. "});
    }

    // Vérification de l'existence du compte
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
        return res.status(409).json({ message: "Un compte existe déjà avec cette adresse e-mail"});
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du compte
    const user = await User.create(firstName, lastName, email, hashedPassword);
}

// Récupération d'un utilisateur
async function getUserById(id) {
    const result = await db.query(
        `SELECT *
         FROM users
         WHERE id = $1`,
         [id]
    );

    return result.rows[0];
}

module.exports = { createUser, getUserById };
