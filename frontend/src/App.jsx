// Importation des hooks React
import { useState } from "react";

// Création de l'interface des annonces
function App() {
    // Déclaration des variables des annonces
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // Déclaration des variables du formulaire
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [subject, setSubject] = useState("");
    const [location, setLocation] = useState("");

    // Récupération des annonces
    async function handleGetAnnouncements() {
        const token = localStorage.getItem("token");

        if (!token) {
            setAnnouncements([]);
            setMessage("Connectez-vous pour consulter les annonces.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Connectez-vous pour consulter les annonces.");
                return;
            }

            const response = await fetch("http://localhost:3000/api/announcements",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Impossible de récupérer les annonces.");
                return;
            }

            setAnnouncements(Array.isArray(data) ? data : data.announcements || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des annonces :", error);
            setMessage("Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    }

    // Création d'une annonce
    async function handleCreateAnnouncement(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("Connectez-vous pour créer une annonce.");
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Connectez-vous pour créer une annonce.");
                return;
            }

            const response = await fetch("http://localhost:3000/api/announcements",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, description, type, subject, location })
                }
            );

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

    return (
        <main className="announcements-container">
            <h1>Transmission</h1>
            <h2>Annonces et demande d'échange</h2>

            <section className="announcement-card">
                <h3>Créer une annonce</h3>

                <form className="announcement-form" onSubmit={handleCreateAnnouncement}>
                    <label htmlFor="title">Titre</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required />
                    
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required />
                    
                    <label htmlFor="type">Type d'annonce</label>
                    <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        required >
                        <option value="">Choisir un type</option>
                        <option value="proposition">Proposition d'échange</option>
                        <option value="demande">Demande d'échange</option>
                    </select>

                    <label htmlFor="subject">Sujet</label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        required />

                    <label htmlFor="location">Localisation</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required />
                    
                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Publication en cours..." : "Publier l'annonce"}</button>
                </form>
            </section>

            <section className="announcements-list">
                <h3>Les annonces</h3>

                <button
                    type="button"
                    onClick={handleGetAnnouncements}
                    disabled={isLoading}>
                    {isLoading ? "Chargement..." : "Actualiser les annonces"}
                </button>

                {announcements.length === 0 && !isLoading && (<p>Aucune annonce à afficher.</p>)}

                {announcements.map((announcement) => (
                    <article className="announcement-card" key={announcement.id}>
                        <h4>{announcement.title}</h4>
                        <p>Description : {announcement.description}</p>
                        <p>Type : {announcement.type}</p>
                        <p>Sujet : {announcement.subject}</p>
                        <p>Localisation : {announcement.location}</p>
                    </article>
                ))}
            </section>

            {message && <p className="announcement-message" role="status">{message}</p>}
        </main>
    );
}

export default App;
