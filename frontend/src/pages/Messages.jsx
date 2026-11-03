// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page de la messagerie
function Messages() {
    const { recipientId, setRecipientId, content, setContent, messages, isLoading, conversations, isConversationsLoading, handleGetMessages, handleSendMessage, message } = useApp();

    return (
        <main className="messaging-container">
            <section className="messaging-card">
                <aside className="conversations-panel">
                    <h1>Messagerie</h1>

                    <div className="conversations-list">
                        {isConversationsLoading && (<p>Chargement des conversations...</p>)}

                        {!isConversationsLoading && conversations.length === 0 && (<p className="empty-conversations">Aucune conversation trouvée.</p>)}

                        {conversations.map((conversation) => (
                            <button
                                type="button"
                                className={`conversation-item ${Number(recipientId) === Number(conversation.userId) ? "active" : ""}`}
                                key={conversation.userId}
                                onClick={() => {
                                    setRecipientId(String(conversation.userId));
                                    handleGetMessages(conversation.userId);
                                }}>

                                <strong>{conversation.firstName} {conversation.lastName}</strong>

                                <span>{conversation.lastMessage}</span>

                                <small>{conversation.lastMessageAt ? new Date(conversation.lastMessageAt).toLocaleString("fr-FR") : ""}</small>
                            </button>
                        ))}
                    </div>
                </aside>

                <section className="chat-panel">
                    {recipientId ? (
                        <div className="chat-content">
                            <header className="chat-header">
                                <h2>
                                    {conversations.find((conversation) => Number(conversation.userId) === Number(recipientId))?.firstName}{" "}
                                    {conversations.find((conversation) => Number(conversation.userId) === Number(recipientId))?.lastName}
                                </h2>
                            </header>

                            <div className="chat-messages" aria-live="polite">
                                {isLoading && messages.length === 0 && (<p>Chargement des messages...</p>)}

                                {!isLoading && messages.length === 0 && (<p className="empty-chat">Aucun message dans cette conversation.</p>)}

                                {messages.map((item) => (
                                    <article
                                        className={`chat-message ${Number(item.senderId) === Number(recipientId) ? "received" : "sent"}`}
                                        key={item.id}>

                                        <p>{item.content}</p>

                                        <small>{item.createdAt ? new Date(item.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : ""}</small>
                                    </article>
                                ))}
                            </div>

                            <form className="chat-form" onSubmit={handleSendMessage}>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    placeholder="Écrire un message..."
                                    rows="2"
                                    required />

                                <button type="submit" disabled={isLoading || !recipientId || !content.trim()}>{isLoading ? "Envoi..." : "Envoyer"}</button>
                            </form>
                        </div>
                    ) : (
                        <div className="empty-chat">
                            <h2>Bienvenue dans ta messagerie</h2>
                            <p>Sélectionne une conversation pour afficher tes messages.</p>
                        </div>
                    )}
                </section>
            </section>

            {message && (<p className="form-message" role="status">{message}</p>)}
        </main>
    );
}

// Exportation de la page de messagerie
export default Messages;
