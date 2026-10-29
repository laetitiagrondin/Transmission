// Importation des hooks React
import { useState } from "react";

// Création du composant principal
function App() {
    // Déclaration des variables de messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [recipientId, setRecipientId] = useState("");
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Connexion de l'utilisateur
    async function handleLogin(event) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "La connexion a échoué.");
                return;
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setMessage("Connexion réussie.");
        } catch (error) {
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Récupération des messages échangés avec le destinataire
    async function handleGetMessages(event) {
        if (event) {
            event.preventDefault();
        }

        if (!recipientId || Number(recipientId) <= 0) {
            setMessage("Saisis un identifiant de destinataire valide.");
            return;
        }

        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/api/messages/${encodeURIComponent(recipientId)}`, {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les messages.");
                return;
            }

            setMessages(data);
            setMessage(data.length === 0 ? "Aucun message pour le moment." : "");
        } catch (error) {
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Envoi d'un message
    async function handleSendMessage(event) {
        event.preventDefault();

        if (!recipientId || Number(recipientId) <= 0) {
            setMessage("Saisis un identifiant de destinataire valide.");
            return;
        }

        if (!content.trim()) {
            setMessage("Écris un message avant de l'envoyer.");
            return;
        }

        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ recipientId: Number(recipientId), content: content.trim() })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "L'envoi du message a échoué.");
                return;
            }

            setContent("");
            await handleGetMessages();
            setMessage("Message envoyé.");
        } catch (error) {
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Déconnexion de l'utilisateur
    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
        setMessages([]);
        setRecipientId("");
        setContent("");
        setMessage("Tu es déconnecté(e).");
    }

    return (
        <main className="messaging-container">
            <header className="page-header">
                <h1>Transmission</h1>
            </header>

            {!token ? (
                <section className="messaging-card">
                    <h2>Se connecter</h2>
                    <p>Connecte-toi pour accéder à la messagerie.</p>

                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Adresse e-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required />

                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required />

                        <button type="submit" disabled={isLoading}>{isLoading ? "Connexion..." : "Se connecter"}</button>
                    </form>
                </section>
            ) : (
                <section className="messaging-card">
                    <div className="conversation-header">
                        <div>
                            <h2>Messagerie</h2>
                            <p>Connecté(e) à Transmission</p>
                        </div>
                        <button type="button" className="secondary-button" onClick={handleLogout}>Se déconnecter</button>
                    </div>

                    <form onSubmit={handleGetMessages}>
                        <label htmlFor="recipientId">Identifiant du destinataire</label>
                        <div className="recipient-row">
                            <input
                                id="recipientId"
                                type="number"
                                min="1"
                                value={recipientId}
                                onChange={(event) => setRecipientId(event.target.value)}
                                required />
                            <button type="submit" disabled={isLoading}>Charger les messages</button>
                        </div>
                    </form>

                    <section className="messages-list" aria-live="polite">
                        {messages.map((item) => (
                            <article className="message-item" key={item.id}>
                                <p>{item.content}</p>
                                <small>De : {item.senderId} · À : {item.recipientId}</small>
                                <small>{item.createdAt ? new Date(item.createdAt).toLocaleString("fr-FR") : ""}</small>
                            </article>
                        ))}
                    </section>

                    <form onSubmit={handleSendMessage}>
                        <label htmlFor="content">Ton message</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder="Écris ton message..."
                            rows="4"
                            required />
                        <button type="submit" disabled={isLoading || !recipientId}>{isLoading ? "Envoi..." : "Envoyer le message"}</button>
                    </form>
                </section>
            )}

            {message && <p className="status-message" role="status">{message}</p>}
        </main>
    );
}

export default App;
