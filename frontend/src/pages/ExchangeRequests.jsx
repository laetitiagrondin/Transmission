// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page des demandes d'échange
function ExchangeRequests() {
    const { announcementId, setAnnouncementId, requestMessage, setRequestMessage, exchangeRequests, isLoading,
        handleCreateExchangeRequest, handleGetExchangeRequests, handleUpdateExchangeRequestStatus } = useApp();

    return (
        <main className="profile-container">
            <section className="profile-card">
                <h1>Demandes d'échange</h1>

                <div className="profile-content">
                    <h2>Envoyer une demande</h2>

                    <form className="announcement-form" onSubmit={handleCreateExchangeRequest}>
                        <label htmlFor="announcementId">Identifiant de l'annonce</label>
                        <input
                            id="announcementId"
                            type="number"
                            min="1"
                            value={announcementId}
                            onChange={(event) => setAnnouncementId(event.target.value)}
                            required
                        />

                        <label htmlFor="requestMessage">Message</label>
                        <textarea
                            id="requestMessage"
                            value={requestMessage}
                            onChange={(event) => setRequestMessage(event.target.value)}
                            placeholder="Présentez votre demande d'échange"
                        />

                        <button type="submit" disabled={isLoading}>Envoyer la demande</button>
                    </form>
                </div>
            </section>

            <section className="profile-card">
                <h2>Mes demandes envoyées et reçues</h2>

                <button type="button" onClick={handleGetExchangeRequests} disabled={isLoading}>{isLoading ? "Chargement..." : "Afficher mes demandes"}</button>

                {exchangeRequests.length === 0 && (<p>Aucune demande affichée.</p>)}

                <div className="profile-content">
                    {exchangeRequests.map((request) => {
                        const isReceived = request.isReceived;

                        return (
                            <article className="announcement-card" key={request.id}>
                                <h3>{request.announcementTitle || `Annonce ${request.announcementId}`}</h3>
                                <p>{request.message || "Aucun message."}</p>
                                <p>Statut : {request.status}</p>
                                <p>{isReceived ? "Demande reçue" : "Demande envoyée"}</p>

                                {isReceived && request.status === "en_attente" && (
                                    <div>
                                        <button type="button" onClick={() => handleUpdateExchangeRequestStatus(request.id, "acceptee")} disabled={isLoading}>Accepter</button>

                                        <button type="button" onClick={() => handleUpdateExchangeRequestStatus(request.id, "refusee")} disabled={isLoading}>Refuser</button>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

// Exportation du composant
export default ExchangeRequests;
