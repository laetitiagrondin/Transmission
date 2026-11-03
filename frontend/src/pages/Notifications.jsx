// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page des notifications
function Notifications() {
    const { unreadCount, notifications, handleGetNotifications, handleMarkNotificationAsRead } = useApp();

    return (
        <main className="profile-container">
            <section className="profile-card">
                <h1>Notifications ({unreadCount})</h1>

                <div className="profile-content">
                    <button type="button" onClick={handleGetNotifications}>Actualiser</button>

                    {notifications.length === 0 ? (
                        <p>Aucune notification.</p>
                    ) : (
                        <ul>
                            {notifications.map((notification) => (
                                <li key={notification.id}>
                                    <p>{notification.message}</p>
                                    <p>{new Date(notification.createdAt).toLocaleString("fr-FR")}</p>

                                    {!notification.isRead && (
                                        <button type="button" onClick={() => handleMarkNotificationAsRead(notification.id)}>Marquer comme lue</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </main>
    );
}

// Exportation du composant
export default Notifications;
