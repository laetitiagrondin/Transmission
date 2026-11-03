// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page des annonces
function Announcements() {
    const { title, setTitle, description, setDescription, type, setType, subject, setSubject, location, setLocation,
        announcements, isLoading, isSubmitting, handleGetAnnouncements, handleCreateAnnouncement, message } = useApp();

    return (
        <main className="profile-container">
            <section className="profile-card">
                <h1>Annonces</h1>

                <div className="profile-content">
                    <h2>Créer une annonce</h2>

                    <form className="announcement-form" onSubmit={handleCreateAnnouncement}>
                        <label htmlFor="title">Titre</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                        />

                        <label htmlFor="type">Type d'annonce</label>
                        <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            required
                        >
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
                            required
                        />

                        <label htmlFor="location">Localisation</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            required
                        />

                        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Publication en cours..." : "Publier l'annonce"}</button>
                    </form>
                </div>
            </section>

            <section className="announcements-list">
                <h2>Les annonces</h2>

                <button type="button" onClick={handleGetAnnouncements} disabled={isLoading}>{isLoading ? "Chargement..." : "Actualiser les annonces"}</button>

                {announcements.length === 0 && !isLoading && (<p>Aucune annonce à afficher.</p>)}

                {announcements.map((announcement) => (
                    <article className="announcement-card" key={announcement.id}>
                        <h4>{announcement.title}</h4>
                        <p>Identifiant : {announcement.id}</p>
                        <p>Description : {announcement.description}</p>
                        <p>Type : {announcement.type}</p>
                        <p>Sujet : {announcement.subject}</p>
                        <p>Localisation : {announcement.location}</p>
                    </article>
                ))}
            </section>

            {message && <p role="status">{message}</p>}
        </main>
    );
}

// Exportation du composant
export default Announcements;