// Importation de la connexion à PostgreSQL
const db = require("../database");

<<<<<<< HEAD
// Importation du modèle User
const User = require("../models/User");

// Importation de bcrypt
const bcrypt = require("bcrypt");

// Importation de jsonwebtoken
const jwt = require("jsonwebtoken");

=======
>>>>>>> 17a087f (feat: création de la fonction utilisateur)
// Création d'un utilisateur
async function createUser(userData) {
    const { firstName, lastName, email, password } = userData;

    const result = await db.query(
        `INSERT INTO users (firstName, lastName, email, password)
<<<<<<< HEAD
         VALUES ($1, $2, $3, $4)
=======
         VALUES ($1, $2? $3, $4)
>>>>>>> 17a087f (feat: création de la fonction utilisateur)
         RETURNING *`,
        [firstName, lastName, email, password]
    );

    return result.rows[0];
}

<<<<<<< HEAD
// Création d'un compte utilisateur
async function registerUser(req, res) {
    try {
        // Vérification des données obligatoires
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires. "});
        }

        // Vérification de l'existence du compte
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: "Un compte existe déjà avec cette adresse e-mail."});
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création du compte
        const user = await User.create(firstName, lastName, email, hashedPassword);

        // Réponse de l'inscription
        res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.log("Erreur lors de la création du compte :", error);

        res.status(500).json({ message: "Erreur lors de la création du compte." })
    }
}

// Connexion d'un utilisateur
async function loginUser(req, res) {
    try {
        // Vérification des données obligatoires
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "L'email et le mot de passe sont obligatoires." });
        }

        // Récupération du compte
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect."});
        }

        // Génération du token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" });
        
        // Réponse de la connexion
        res.status(200).json({ token });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);

        // Gestion de l'erreur
        res.status(500).json({ message: "Erreur lors de la connexion" });
    }
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

module.exports = { createUser, registerUser, getUserById, loginUser };
=======
module.exports = { createUser };
>>>>>>> 17a087f (feat: création de la fonction utilisateur)
