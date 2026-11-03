// Importation du composant Navigate de React Router
import { Navigate } from "react-router-dom";

// Importation du contexte de l'application
import { useApp } from "../context/useApp.js";

// Protection des pages réservées aux utilisateurs connectés
function ProtectedRoute({ children }) {
    const { token } = useApp();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Exportation du composant
export default ProtectedRoute;