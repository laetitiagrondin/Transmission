// Importation du hook personnalisé du contexte
import { useApp } from "../context/useApp.js";

// Page des rendez-vous
function Appointments() {
    const { exchangeRequests, appointmentExchangeRequestId, setAppointmentExchangeRequestId, appointmentDate, setAppointmentDate,
        appointmentLocation, setAppointmentLocation, appointments, isLoading, isSubmitting, handleCreateAppointment, handleGetAppointments } = useApp();

    return (
        <main className="profile-container">
            <section className="profile-card">
                <h1>Mes rendez-vous</h1>

                <div className="profile-content">
                    <h2>Créer un rendez-vous</h2>

                    <form className="announcement-form" onSubmit={handleCreateAppointment}>
                        <label htmlFor="appointmentExchangeRequestId">Demande d'échange acceptée</label>
                        <select
                            id="appointmentExchangeRequestId"
                            value={appointmentExchangeRequestId}
                            onChange={(event) => setAppointmentExchangeRequestId(event.target.value)}
                            required
                        >
                            <option value="">Choisir une demande acceptée</option>
                            {exchangeRequests.filter((request) => request.status === "acceptee").map((request) => (
                                <option key={request.id} value={request.id}>{request.announcementTitle || `Demande ${request.id}`} — demande n° {request.id}</option>
                            ))}
                        </select>

                        <label htmlFor="appointmentDate">Date et heure</label>
                        <input
                            id="appointmentDate"
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(event) => setAppointmentDate(event.target.value)}
                            required
                        />

                        <label htmlFor="appointmentLocation">Lieu du rendez-vous</label>
                        <input
                            id="appointmentLocation"
                            type="text"
                            value={appointmentLocation}
                            onChange={(event) => setAppointmentLocation(event.target.value)}
                            required
                        />

                        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Création en cours..." : "Créer le rendez-vous"}</button>
                    </form>
                </div>
            </section>

            <section className="profile-card">
                <h2>Liste de mes rendez-vous</h2>

                <button type="button" onClick={handleGetAppointments} disabled={isLoading}>{isLoading ? "Chargement..." : "Afficher mes rendez-vous"}</button>

                {appointments.length === 0 && (<p>Aucun rendez-vous à afficher.</p>)}

                <div className="profile-content">
                    {appointments.map((appointment) => (
                        <article className="announcement-card" key={appointment.id}>
                            <h3>{appointment.announcementTitle || `Demande ${appointment.exchangeRequestId}`}</h3>
                            <p>Date : {new Date(appointment.appointmentDate).toLocaleString("fr-FR")}</p>
                            <p>Lieu : {appointment.location}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

// Exportation du composant
export default Appointments;
