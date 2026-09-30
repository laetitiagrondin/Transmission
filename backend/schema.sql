-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    -- Identifiant unique de l'utilisateur
    id SERIAL PRIMARY KEY,

    -- Nom de l'utilisateur
    name VARCHAR(100) NOT NULL,

    -- Adresse e-mail unique de l'utilisateur
    email VARCHAR(255) UNIQUE NOT NULL,

    -- Mot de passe haché de l'utilisateur
    password VARCHAR(255) NOT NULL,

    -- Date de création du compte
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
