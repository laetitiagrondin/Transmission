// Importation de la connexion à PostgreSQL
const db = require("../database");

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

// Récupération du profil de l'utilisateur connecté
async function getMyProfile(req, res) {
    try {
        const result = await db.query(
            ` SELECT id, "firstName", "lastName", email, "createdAt"
             FROM users
             WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération du profil" });
    }
}

module.exports = { createUser, getUserById, getMyProfile };
