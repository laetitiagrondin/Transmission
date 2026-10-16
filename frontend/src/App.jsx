// Importation des hooks React
import { useState } from "react";

// Importation du style
import "./App.css";

// Création du formulaire d'inscription
function App() {
    // Déclaration des variables du formulaire
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <main className="auth-container">
            <h1>Transmission</h1>

            <section className="auht-card">
                <h2>Créer un compte</h2>
                <p>Inscrivez-vous pour échanger vos savoir-faire.</p>

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

                {message && <p className="form-message" role="status">{message}</p>}
            </section>
        </main>
    );
}

export default App;
