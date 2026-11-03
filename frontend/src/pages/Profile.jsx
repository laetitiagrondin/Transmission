// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page du profil
function Profile() {
    const { profile, isProfileLoading, isProfileEditing, setIsProfileEditing, editFirstName, setEditFirstName, editLastName, setEditLastName, editEmail, setEditEmail, handleGetProfile, handleUpdateProfile, handleGoogleCalendarConnect } = useApp();

    return (
        <main className="profile-container">
            <section className="profile-card">
                <h1>Mon profil</h1>

                <button type="button" onClick={handleGetProfile} disabled={isProfileLoading}>{isProfileLoading ? "Chargement..." : "Afficher mon profil"}</button>

                {profile && (
                    <div className="profile-content">
                        {!isProfileEditing ? (
                            <div className="profile-details">
                                <p>Prénom : {profile.firstName}</p>
                                <p>Nom : {profile.lastName}</p>
                                <p>Adresse e-mail : {profile.email}</p>

                                <button type="button" onClick={() => setIsProfileEditing(true)}>Modifier mon profil</button>
                            </div>
                        ) : (
                            <form className="profile-form" onSubmit={(event) => {
                                event.preventDefault();
                                handleUpdateProfile();
                            }}>
                                <label htmlFor="editFirstName">Prénom</label>
                                <input
                                    id="editFirstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    value={editFirstName}
                                    onChange={(event) => setEditFirstName(event.target.value)}
                                    required
                                />

                                <label htmlFor="editLastName">Nom</label>
                                <input
                                    id="editLastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    value={editLastName}
                                    onChange={(event) => setEditLastName(event.target.value)}
                                    required
                                />

                                <label htmlFor="editEmail">Adresse e-mail</label>
                                <input
                                    id="editEmail"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={editEmail}
                                    onChange={(event) => setEditEmail(event.target.value)}
                                    required
                                />

                                <button type="submit">Enregistrer les modifications</button>

                                <button type="button" className="profile-cancel-button" onClick={() => {
                                    setEditFirstName(profile.firstName);
                                    setEditLastName(profile.lastName);
                                    setEditEmail(profile.email);
                                    setIsProfileEditing(false);
                                    }}
                                >
                                    Annuler
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

// Exportation du composant
export default Profile;
