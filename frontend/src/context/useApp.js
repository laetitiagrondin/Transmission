// Importation du hook React
import { useContext } from "react";

// Importation du contexte
import AppContext from "./AppContextObject.js";

// Accès au contexte depuis les pages
export function useApp() {
    return useContext(AppContext);
}
