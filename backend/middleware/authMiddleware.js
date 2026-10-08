// Importation de jsonwebtoken
const jwt = require("jsonwebtoken");

// Middleware d'authentification
function authenticateToken(req, res, next) {
    // Récupération du token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token manquant." })
    }

    // Vérification du JWT
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Identification de l'utilisateur connecté
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: "Token invalide." });
    }
}

module.exports = authenticateToken;
