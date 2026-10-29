// Importation des règles ESLint
import js from "@eslint/js";

// Importation des variables globales du navigateur
import globals from "globals";

// Importation des règles React Hooks
import reactHooks from "eslint-plugin-react-hooks";

// Importation des règles React Refresh
import reactRefresh from "eslint-plugin-react-refresh";

// Importation de la fonction de configuration ESLint
import { defineConfig, globalIgnores } from "eslint/config";

// Configuration d'ESLint pour le frontend
export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{js,jsx}"],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: {
                    jsx: true
                },
                sourceType: "module"
            }
        }
    }
]);
