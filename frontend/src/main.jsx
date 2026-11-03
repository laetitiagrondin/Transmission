// Importation de React
import { StrictMode } from "react";

// Importation du moteur de rendu React
import { createRoot } from "react-dom/client";

// Importation du routeur React
import { BrowserRouter } from "react-router-dom";

// Importation du style global
import "./index.css";

// Importation du composant principal
import App from "./App.jsx";

// Affichage de l'application avec le routage
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
