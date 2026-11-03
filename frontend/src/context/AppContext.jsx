// Importation des hooks React
import { useState, useEffect } from "react";

// Importation du contexte
import AppContext from "./AppContextObject.js";

// Création du fournisseur du contexte
export function AppProvider({ children }) {
    // Déclaration des variables d'authentification
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // Déclaration des variables d'inscription
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Déclaration des variables de connexion
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Déclaration des variables du profil
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [isProfileEditing, setIsProfileEditing] = useState(false);

    // Déclaration des variables des annonces
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("offre");
    const [subject, setSubject] = useState("");
    const [location, setLocation] = useState("");

    // Déclaration des variables des demandes d'échange
    const [announcementId, setAnnouncementId] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [exchangeRequests, setExchangeRequests] = useState([]);

    // Déclaration des variables de la messagerie
    const [recipientId, setRecipientId] = useState("");
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);

    // Déclaration des variables des notifications
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Déclaration des variables des rendez-vous
    const [appointments, setAppointments] = useState([]);
    const [appointmentExchangeRequestId, setAppointmentExchangeRequestId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentLocation, setAppointmentLocation] = useState("");

    // Déclaration des variables de la messagerie
    const [conversations, setConversations] = useState([]);
    const [isConversationsLoading, setIsConversationsLoading] = useState(false);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [error, setError] = useState("");

    // Envoi du formulaire d'inscription
    async function handleRegister(event) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            // Envoi des données à l'API
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            setIsSubmitting(false);
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
            body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "La connexion a échoué.");
            return;
        }

        // Enregistrement du token
        if (!data.token) {
            setMessage("Connexion réussie, mais aucun token n'a été reçu.");
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

    // Récupération du profil connecté
    async function handleGetProfile() {
        setMessage("");
        setIsProfileLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer le profil.");
                return;
            }

            setProfile(data);
            setEditFirstName(data.firstName);
            setEditLastName(data.lastName);
            setEditEmail(data.email);
        } catch (error) {
            console.error("Erreur lors de la récupération du profil :", error);
            setMessage(`Impossible de contacter le serveur : ${error.message}`);
        } finally {
            setIsProfileLoading(false);
        }
    }

    // Modification du profil connecté
    async function handleUpdateProfile() {
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/users/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ firstName: editFirstName, lastName: editLastName, email: editEmail })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les demandes.");
                return;
            }

            setProfile(data);
            setEditFirstName(data.firstName);
            setEditLastName(data.lastName);
            setEditEmail(data.email);
            setIsProfileEditing(false);
            setMessage("Profil modifié avec succès.");
        } catch (error) {
            console.error("Erreur lors de la modification du profil :", error);
            setMessage("Impossible de contacter le serveur.");
        }
    }

    // Récupération des messages échangés avec le destinataire
    async function handleGetMessages(userId = recipientId) {
        if (!userId || Number(userId) <= 0) {
            setMessage("Saisis un identifiant de destinataire valide.");
            return;
        }

        if (!token) {
            setMessages([]);
            setMessage("Connectez-vous pour consulter vos messages.");
            return;
        }

        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/api/messages/${encodeURIComponent(userId)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les messages.");
                return;
            }

            setMessages(Array.isArray(data) ? data : []);
            setMessage(data.length === 0 ? "Aucun message pour le moment." : "");
        } catch (error) {
            console.error("Erreur lors de la récupération des messages :", error);
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
            await handleGetMessages(recipientId);
            await handleGetConversations();
            setMessage("Message envoyé.");
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Récupération des annonces
    async function handleGetAnnouncements() {
        if (!token) {
            setAnnouncements([]);
            setMessage("Connectez-vous pour consulter les annonces.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/announcements", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les annonces.");
                return;
            }

            setAnnouncements(Array.isArray(data) ? data : data.announcements || []);
        } catch (error) {
            console.log("Erreur lors de la récupération des annonces :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Création d'une annonce
    async function handleCreateAnnouncement(event) {
        event.preventDefault();

        if (!token) {
            setMessage("Connectez-vous pour créer une annonce.");
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ title, description, type, subject, location })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "La création de l'annonce a échoué.");
                return;
            }

            setTitle("");
            setDescription("");
            setType("");
            setSubject("");
            setLocation("");
            setMessage("Annonce créée avec succès.");

            await handleGetAnnouncements();
        } catch (error) {
            console.error("Erreur lors de la création de l'annonce :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Récupération des demandes d'échange envoyées et reçues
    async function handleGetExchangeRequests() {
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/exchange-requests", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();
        
            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les demandes.");
                return;
            }
            
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
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ announcementId: Number(announcementId), message: requestMessage })
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

    // Acceptation ou refus d'une demande d'échange
    async function handleUpdateExchangeRequestStatus(id, status) {
        setMessage("");

        try {
            const response = await fetch(`http://localhost:3000/api/exchange-requests/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de modifier le statut de la demande.");
                return;
            }

            // Actualisation des demandes et des notifications
            await handleGetExchangeRequests();
            await handleGetNotifications();

            setMessage(status === "acceptee" ? "La demande d'échange a été acceptée." : "La demande d'échange a été refusée.");
        } catch (error) {
            console.error("Erreur lors de la modification du statut :", error);
            setMessage("Impossible de contacter le serveur.");
        }
    }

    // Connexion à Google Calendar
    async function handleGoogleCalendarConnect() {
        try {
            const response = await fetch("http://localhost:3000/api/google-calendar/auth", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "La connexion à Google Calendar a échoué.");
                return;
            }

            // Redirection vers la page d'autorisation Google
            window.location.href = data.url;
        } catch (error) {
            console.error("Erreur lors de la connexion à Google Calendar :", error);
            setMessage("Impossible de contacter le serveur pour Google Calendar.");
        }
    }

    // Récupération de la liste des conversations
    async function handleGetConversations() {
        if (!token) {
            setConversations([]);
            setMessage("Connectez-vous pour consulter vos conversations.");
            return;
        }

        setIsConversationsLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/messages/conversations", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les conversations.");
                return;
            }

            setConversations(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erreur lors de la récupération des conversations :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsConversationsLoading(false);
        }
    }

    // Récupération des notifications de l'utilisateur connecté
    async function handleGetNotifications() {
        try {
            const response = await fetch("http://localhost:3000/api/notifications", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les notifications.");
                return;
            }

            setNotifications(Array.isArray(data) ? data : []);
            setUnreadCount(data.filter(notification => !notification.isRead).length);
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications :", error);
            setMessage("Impossible de contacter le serveur.");
        }
    }

    // Marquage d'une notification comme lue
    async function handleMarkNotificationAsRead(notificationId) {
        try {
            const response = await fetch(`http://localhost:3000/api/notifications/${notificationId}/read`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de marquer la notification comme lue.");
                return;
            }

            setNotifications(previousNotifications => previousNotifications.map(notification => notification.id === notificationId ? data : notification));
            setUnreadCount(previousCount => Math.max(0, previousCount - 1));
        } catch (error) {
            console.error("Erreur lors du marquage de la notification :", error);
            setMessage("Impossible de contacter le serveur.");
        }
    }

    // Récupération des rendez-vous de l'utilisateur connecté
    async function handleGetAppointments() {
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/appointments", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les rendez-vous.");
                return;
            }

            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erreur lors de la récupération des rendez-vous :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Création d'un rendez-vous
    async function handleCreateAppointment(event) {
        event.preventDefault();

        if (!appointmentExchangeRequestId || !appointmentDate || !appointmentLocation.trim()) {
            setMessage("Veuillez renseigner tous les champs du rendez-vous.");
            return;
        }

        setMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:3000/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    exchangeRequestId: Number(appointmentExchangeRequestId),
                    appointmentDate,
                    location: appointmentLocation.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "La création du rendez-vous a échoué.");
                return;
            }

            setAppointmentExchangeRequestId("");
            setAppointmentDate("");
            setAppointmentLocation("");

            await handleGetAppointments();

            setMessage(data.googleCalendarMessage ? `Rendez-vous créé avec succès. ${data.googleCalendarMessage}` : "Rendez-vous créé avec succès.");

        } catch (error) {
            console.error("Erreur lors de la création du rendez-vous :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Déconnexion de l'utilisateur
    function handleLogout() {
        localStorage.removeItem("token");
        setNotifications([]);
        setUnreadCount(0);
        setToken("");
        setProfile(null);
        setAnnouncements([]);
        setExchangeRequests([]);
        setMessages([]);
        setRecipientId("");
        setContent("");
        setMessage("Vous êtes déconnecté(e).");
    }

    // Gestion du retour après connexion à Google Calendar
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const googleCalendar = params.get("googleCalendar");

        const callbackMessage = googleCalendar === "connected"
            ? "Votre compte Google Calendar est connecté avec succès."
            : googleCalendar === "error"
                ? "La connexion à Google Calendar a échoué."
                : "";

        if (callbackMessage) {
            queueMicrotask(() => setMessage(callbackMessage));
        }

        // Suppression du paramètre dans l'URL
        if (googleCalendar) {
            const url = new URL(window.location.href);
            url.searchParams.delete("googleCalendar");

            window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
        }
    }, []);

    // Chargement des notifications lorsque l'utilisateur est connecté
    useEffect(() => {
        if (!token) {
            return;
        }

        let isActive = true;

        async function loadNotifications() {
            try {
                const response = await fetch("http://localhost:3000/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (!response.ok) {
                    if (isActive) {
                        setMessage(data.message || "Impossible de récupérer les notifications.");
                    }
                    return;
                }

                if (isActive) {
                    const userNotifications = Array.isArray(data) ? data : [];
                    setNotifications(userNotifications);
                    setUnreadCount(userNotifications.filter(notification => !notification.isRead).length);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des notifications :", error);
                if (isActive) {
                    setMessage("Impossible de contacter le serveur.");
                }
            }
        }

        loadNotifications();

        return () => {
            isActive = false;
        };
    }, [token]);

    // Chargement du profil lorsque l'utilisateur est connecté
    useEffect(() => {
        if (!token) {
            return;
        }

        let isActive = true;

        async function loadProfile() {
            try {
                const response = await fetch("http://localhost:3000/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (!response.ok) {
                    if (isActive) {
                        setMessage(data.message || "Impossible de récupérer le profil.");
                    }
                    return;
                }

                if (isActive) {
                    setProfile(data);
                    setEditFirstName(data.firstName);
                    setEditLastName(data.lastName);
                    setEditEmail(data.email);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du profil :", error);

                if (isActive) {
                    setMessage("Impossible de contacter le serveur.");
                }
            }
        }

        loadProfile();

        return () => {
            isActive = false;
        };
    }, [token]);

    // Chargement des annonces lorsque l'utilisateur est connecté
    useEffect(() => {
        if (!token) {
            return;
        }

        let isActive = true;

        async function loadAnnouncements() {
            try {
                const response = await fetch("http://localhost:3000/api/announcements", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();

                if (!response.ok) {
                    if (isActive) {
                        setMessage(data.message || "Impossible de récupérer les annonces.");
                    }
                    return;
                }

                if (isActive) {
                    setAnnouncements(Array.isArray(data) ? data : data.announcements || []);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces :", error);

                if (isActive) {
                    setMessage("Impossible de contacter le serveur.");
                }
            }
        }

        loadAnnouncements();

        return () => {
            isActive = false;
        };
    }, [token]);
    
    return (
        <AppContext.Provider
            value={{ token, setToken, message, setMessage, isLoading, setIsLoading, isSubmitting, setIsSubmitting,
                firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword,
                loginEmail, setLoginEmail, loginPassword, setLoginPassword, profile, setProfile, isProfileLoading, setIsProfileLoading,
                editFirstName, setEditFirstName, editLastName, setEditLastName, editEmail, setEditEmail, isProfileEditing, setIsProfileEditing,
                announcements, setAnnouncements, title, setTitle, description, setDescription, type, setType,  subject, setSubject,  location, setLocation,
                announcementId, setAnnouncementId, requestMessage, setRequestMessage, exchangeRequests, setExchangeRequests,
                recipientId, setRecipientId, content, setContent, conversations, isConversationsLoading, isMessagesLoading, setIsMessagesLoading,
                error, setError, messages, setMessages, notifications, setNotifications, unreadCount, setUnreadCount,
                appointments, setAppointments, appointmentExchangeRequestId, setAppointmentExchangeRequestId, appointmentDate, setAppointmentDate, appointmentLocation, setAppointmentLocation,
                handleRegister, handleLogin, handleGetProfile, handleUpdateProfile, handleGetMessages, handleSendMessage, handleGetAnnouncements, handleCreateAnnouncement,
                handleGetExchangeRequests, handleCreateExchangeRequest, handleUpdateExchangeRequestStatus, handleGoogleCalendarConnect,
                handleGetConversations, handleGetNotifications, handleMarkNotificationAsRead, handleGetAppointments, handleCreateAppointment, handleLogout
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
