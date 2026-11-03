// Importation du composant Link de React Router
import { useNavigate } from "react-router-dom";

// Importation du contexte de l'application
import { useApp } from "../context/useApp.js";

// Barre de navigation de l'application
function Navbar() {
    const { token, handleLogout } = useApp();
    const navigate = useNavigate();

    if (!token) {
        return null;
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-title">Transmission</h1>

            <div className="navbar-links">
                <button type="button" onClick={() => navigate("/profile")}>Mon profil</button>
                <button type="button" onClick={() => navigate("/announcements")}>Annonces</button>
                <button type="button" onClick={() => navigate("/exchange-requests")}>Demandes d'échange</button>
                <button type="button" onClick={() => navigate("/appointments")}>Rendez-vous</button>
                <button type="button" onClick={() => navigate("/notifications")}>Notifications</button>
                <button type="button" onClick={() => navigate("/messages")}>Messagerie</button>
                <button type="button" onClick={handleLogout}>Déconnexion</button>
            </div>
        </nav>
    );
}

// Exportation du composant
export default Navbar;