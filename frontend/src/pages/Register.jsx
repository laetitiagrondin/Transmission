// Importation du hook de navigation React Router
import { useNavigate } from "react-router-dom";

// Importation du contexte de l'application
import { useApp } from "../context/useApp.js";

// Page d'inscription
function Register() {
    const { firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, isLoading, isSubmitting, message, handleRegister } = useApp();

    const navigate = useNavigate();

    return (
        <main className="auth-container">
            <section className="auth-card">
                <h1>Créer un compte</h1>

                <form onSubmit={handleRegister}>
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Ton prénom"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />

                    <label htmlFor="lastName">Nom</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Ton nom"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />

                    <label htmlFor="registerEmail">Adresse e-mail</label>
                    <input
                        id="registerEmail"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Ton adresse e-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="registerPassword">Mot de passe</label>
                    <input
                        id="registerPassword"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Ton mot de passe"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button type="submit" disabled={isLoading || isSubmitting}>S'inscrire</button>
                </form>

                {message && (<p className="form-message" role="status">{message}</p>)}

                <p className="auth-switch">Tu as déjà un compte ?</p>

                <button type="button" className="auth-switch-button" onClick={() => navigate("/login")}>Se connecter</button>

            </section>
        </main>
    );
}

// Exportation de la page
export default Register;
