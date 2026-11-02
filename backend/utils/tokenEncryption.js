// Importation du module de chiffrement
const crypto = require("crypto");

// Récupération de la clé de chiffrement
function getEncryptionKey() {
    const key = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;

    if (!key || !/^[0-9a-fA-F]{64}$/.test(key)) {
        throw new Error("La clé de chiffrement Google est invalide.");
    }

    return Buffer.from(key, "hex");
}

// Chiffrement d'un jeton Google
function encryptToken(token) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);

    const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);

    const authTag = cipher.getAuthTag();

    return [iv.toString("hex"), authTag.toString("hex"), encrypted.toString("hex")].join(":");
}

// Déchiffrement d'un jeton Google
function decryptToken(encryptedToken) {
    const [iv, authTag, encrypted] = encryptedToken.split(":");

    if (!iv || !authTag || !encrypted) {
        throw new Error("Le jeton Google chiffré est invalide.");
    }

    const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(iv, "hex"));

    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, "hex")), decipher.final()]);

    return decrypted.toString("utf8");
}

// Exportation des fonctions de chiffrement
module.exports = { encryptToken, decryptToken };
