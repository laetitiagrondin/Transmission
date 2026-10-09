-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    -- Identifiant unique de l'utilisateur
    id SERIAL PRIMARY KEY,

    -- Prénom de l'utilisateur
    "firstName" VARCHAR(100) NOT NULL,

    -- Nom de l'utilisateur
    "lastName" VARCHAR(100) NOT NULL,

    -- Adresse e-mail unique de l'utilisateur
    email VARCHAR(255) UNIQUE NOT NULL,

    -- Mot de passe haché de l'utilisateur
    password VARCHAR(255) NOT NULL,

    -- Date de création du compte
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des annonces
CREATE TABLE IF NOT EXISTS announcements (
    -- Identifiant unique de l'annonce
    id SERIAL PRIMARY KEY,

    -- Identifiant de l'utilisateur qui publie l'annonce
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Titre de l'annonce
    title VARCHAR(255) NOT NULL,

    -- Description de l'annonce
    description TEXT NOT NULL,

    -- Type de l'annonce
    type VARCHAR(50) NOT NULL,

    -- Sujet de l'annonce
    subject VARCHAR(100) NOT NULL,

    -- Localisation de l'annonce
    location VARCHAR(255) NOT NULL,

    -- Date de création de l'annonce
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
