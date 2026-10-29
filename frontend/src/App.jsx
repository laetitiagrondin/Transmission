// Importation des hooks React
import { useState } from "react";

// Création du composant principal
function App() {
    // Déclaration des variables des demandes d'échange
    const [announcementId, setAnnouncementId] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [exchangeRequests, setExchangeRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [isLoading, setIsLoading] = useState(false);

    // Récupération des demandes d'échange envoyées et reçues
    async function handleGetExchangeRequests() {
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/exchange-requests", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            // Gestion des erreurs de récupération
            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les demandes.");
                return;
            }

            // Enregistrement des demandes récupérées
            setExchangeRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erreur lors de la récupération des demandes :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Création d'une demande d'échange
    async function handleCreateExchangeRequest(event) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/exchange-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    announcementId: Number(announcementId),
                    message: requestMessage
                })
            });
            const data = await response.json();

            // Gestion des erreurs de création
            if (!response.ok) {
                setMessage(data.message || "La création de la demande a échoué.");
                return;
            }

            // Réinitialisation du formulaire après l'envoi
            setRequestMessage("");
            setAnnouncementId("");

            // Actualisation de la liste des demandes
            await handleGetExchangeRequests();
            setMessage("Demande d'échange envoyée avec succès.");
        } catch (error) {
            console.error("Erreur lors de la création de la demande :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Déconnexion de l'utilisateur
    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
        setExchangeRequests([]);
        setMessage("Vous êtes déconnecté(e).");
    }

    // Affichage de l'interface des demandes d'échange
    return (
        <main className="exchange-requests-container">
            <h1>Demandes d'échange</h1>

                <section>
                    <p>Connectez-vous pour gérer vos demandes d'échange.</p>
                    <label htmlFor="token">Token d'authentification</label>
                    <input
                        id="token"
                        type="password"
                        value={token}
                        onChange={(event) => setToken(event.target.value)}/>

                    <button type="button" onClick={() => {
                            localStorage.setItem("token", token.trim());
                            setToken(token.trim());
                            setMessage("Token enregistré.");
                        }}
                        disabled={!token.trim()}>
                        Enregistrer le token
                    </button>
                </section>

            {token && (
                <section>
                    <form onSubmit={handleCreateExchangeRequest}>
                        <h2>Envoyer une demande</h2>

                        <label htmlFor="announcementId">Identifiant de l'annonce</label>
                        <input
                            id="announcementId"
                            type="number"
                            min="1"
                            value={announcementId}
                            onChange={(event) => setAnnouncementId(event.target.value)}
                            required/>

                        <label htmlFor="requestMessage">Message</label>
                        <textarea
                            id="requestMessage"
                            value={requestMessage}
                            onChange={(event) => setRequestMessage(event.target.value)}
                            placeholder="Présentez votre demande d'échange"/>

                        <button type="submit" disabled={isLoading}>
                            Envoyer la demande
                        </button>
                    </form>

                    <section>
                        <h2>Mes demandes envoyées et reçues</h2>

                        <button
                            type="button"
                            onClick={handleGetExchangeRequests}
                            disabled={isLoading}>
                            {isLoading ? "Chargement..." : "Afficher mes demandes"}
                        </button>

                        {exchangeRequests.length === 0 && (<p>Aucune demande affichée.</p>)}

                        {exchangeRequests.map((request) => (
                            <article key={request.id}>
                                <h3>{request.announcementTitle || `Annonce ${request.announcementId}`}</h3>
                                <p>{request.message || "Aucun message."}</p>
                                <p>Statut : {request.status}</p>
                                <p>{Number(request.requesterId) === Number(request.announcementOwnerId) ? "Demande reçue" : "Demande envoyée ou reçue"}</p>
                            </article>
                        ))}
                    </section>

                    <button type="button" onClick={handleLogout}>Se déconnecter</button>
                </section>
            )}

            {message && <p role="status">{message}</p>}
        </main>
    );
}

export default App;
