// Importation de la connexion à PostgreSQL
const db = require("../database");

// Modèle représentant un utilisateur
class User {
    constructor(id, firstName, lastName, email, password, createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }

    // Création d'un utilisateur
    static async create(firstName, lastName, email, password) {
        const result = await db.query(
            `INSERT INTO users ("firstName", "lastName", email, password)
             VALUES ($1, $2, $3, $4)
             RETURNING id, "firstName", "lastName", email, password, "createdAt"`,
            [firstName, lastName, email, password]
        );

        const user = result.rows[0];

        return new User(user.id, user.firstName, user.lastName, user.email, user.password, user.createdAt);
    }

    // Récupération du compte lors de la connexion
    static async findByEmail(email) {
        const result = await db.query(
            `SELECT id, "firstName", "lastName", email, password, "createdAt"
             FROM users
             WHERE email = $1`,
             [email]
        );

        if (result.rows.length === 0) {
            return null;
        }

        const user = result.rows[0];

        return new User(user.id, user.firstName, user.lastName, user.email, user.password, user.createdAt);
    }
}

module.exports = User;
