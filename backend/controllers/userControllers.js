// Importation de la connexion à PostgreSQL
const db = require("../database");

// Création d'un utilisateur
async function createUser(userData) {
    const { firstName, lastName, email, password } = userData;

    const result = await db.query(
        `INSERT INTO users (firstName, lastName, email, password)
         VALUES ($1, $2? $3, $4)
         RETURNING *`,
        [firstName, lastName, email, password]
    );

    return result.rows[0];
}

module.exports = { createUser };
