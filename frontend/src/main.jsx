// Importation de React
import { StrictMode } from "react";

// Importation du moteur de rendu React
import { createRoot } from "react-dom/client";

// Importation du style global
import "./index.css";

// Importation du composant principal
import App from "./App.jsx";

// Affichage de l'application
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);