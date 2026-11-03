// Importation du hook de navigation React Router
import { useNavigate } from "react-router-dom";

// Importation du hook React
import { useEffect } from "react";

// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page de connexion
function Login() {
    const { token, loginEmail, setLoginEmail, loginPassword, setLoginPassword, isLoading, handleLogin, message } = useApp();

    const navigate = useNavigate();

    // Redirection automatique après connexion
    useEffect(() => {
        if (token) {
            navigate("/profile", { replace: true });
        }
    }, [token, navigate]);

    return (
        <main className="auth-container">
            <section className="auth-card">
                <h1>Se connecter</h1>

                <form onSubmit={handleLogin}>
                    <label htmlFor="loginEmail">Adresse e-mail</label>
                    <input
                        id="loginEmail"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="loginPassword">Mot de passe</label>
                    <input
                        id="loginPassword"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                        required
                    />

                    <button type="submit" disabled={isLoading}>{isLoading ? "Connexion en cours..." : "Se connecter"}</button>
                </form>

                {message && <p className="form-message" role="status">{message}</p>}

                <p className="auth-switch">Tu n'as pas encore de compte ?</p>

                <button type="button" className="auth-switch-button" onClick={() => navigate("/register")}>Créer un compte</button>

            </section>
        </main>
    );
}

// Exportation du composant
export default Login;
