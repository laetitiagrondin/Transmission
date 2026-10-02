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
