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
