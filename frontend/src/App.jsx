// Importation des hooks React
import { useState } from "react";

// Création des formulaires d'authentification
function App() {
    // Déclaration des variables du formulaire
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Déclaration de la variable du token
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Envoi du formulaire d'inscription
    async function handleRegister(event) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            // Envoi des données à l'API
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "L'inscription a échoué.");
                return;
            }

            // Réinitialisation du formulaire après l'inscription
            setMessage("Inscription réussie. Vous pouvez vous connecter.");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setMessage(`Impossible de contacter le serveur : ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    // Envoi du formulaire de connexion
    async function handleLogin(event) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            // Envoi des identifiants à l'API
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "La connexion a échoué.");
                return;
            }

            // Enregistrement du token
            if (!data.token) {
                setMessage("Connexion réussie, mais aucun token n'a été reçue.");
                return;
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);

            // Affichage du résultat de la connexion
            setMessage("Connexion réussie.");
            setLoginPassword("");
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setMessage(`Impossible de contacter le serveur : ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="auth-container">
            <h1>Transmission</h1>

            <section className="auth-card">
                <h2>{isLogin ? "Se connecter" : "Créer un compte"}</h2>
                <p>{isLogin ? "Connectez-vous pour accéder à Transmission." :
                    "Inscrivez-vous pour échanger vos savoir-faire."}</p>

                {isLogin ? (
                    <form onSubmit={handleLogin}>
                        <label htmlFor="loginEmail">Adresse e-mail</label>
                        <input
                            id="loginEmail"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={loginEmail}
                            onChange={(event) => setLoginEmail(event.target.value)}
                            required />

                        <label htmlFor="loginPassword">Mot de passe</label>
                        <input
                            id="loginPassword"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={loginPassword}
                            onChange={(event) => setLoginPassword(event.target.value)}
                            required />

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Connexion en cours..." : "Se connecter"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <label htmlFor="firstName">Prénom</label>
                        <input
                            id="firstName"
                            name="firstName"
                            autoComplete="given-name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            required />
                    
                        <label htmlFor="lastName">Nom</label>
                        <input
                            id="lastName"
                            name="lastName"
                            autoComplete="family-name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required />
                    
                        <label htmlFor="email">Adresse e-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required />
                    
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required />
                    
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Inscription en cours..." : "Créer mon compte"}
                        </button>
                    </form>
                )}

                <p>{isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"} {" "}
                    <button type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setMessage("");
                        }}>
                        {isLogin ? "Créer un compte" : "Se connecter"}
                    </button>
                </p>

                {message && <p className="form-message" role="status">{message}</p>}
            </section>
        </main>
    );
}

export default App;
