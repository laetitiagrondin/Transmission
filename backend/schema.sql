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

-- Création de la table des demandes d'échange
CREATE TABLE IF NOT EXISTS "exchangeRequests" (
    -- Identifiant unique de la demande
    id SERIAL PRIMARY KEY,

    -- Identifiant de l'annonce concernée
    "announcementId" INTEGER NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,

    -- Identifiant de l'utilisateur qui fait la demande
    "requesterId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Message accompagnant la demande
    message TEXT DEFAULT '',

    -- Statut de la demande
    status VARCHAR(50) NOT NULL DEFAULT 'en_attente',

    -- Date de création de la demande
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des messages
CREATE TABLE IF NOT EXISTS messages (
    -- Identifiant unique du message
    id SERIAL PRIMARY KEY,

    -- Identifiant de l'expéditeur
    "senderId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Identifiant du destinataire
    "recipientId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Contenu du message
    content TEXT NOT NULL,

    -- Date d'envoi du message
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des notifications
CREATE TABLE IF NOT EXISTS notifications (
    -- Identifiant unique de la notification
    id SERIAL PRIMARY KEY,

    -- Identifiant de l'utilisateur qui reçoit la notification
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Type de notification : message ou demande d'échange
    type VARCHAR(50) NOT NULL,

    -- Contenu de la notification
    message TEXT NOT NULL,

    -- Indique si la notification a été lue
    "isRead" BOOLEAN NOT NULL DEFAULT FALSE,

    -- Date de création de la notification
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
