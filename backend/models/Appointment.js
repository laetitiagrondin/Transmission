// Modèle représentant un rendez-vous
class Appointment {
    constructor(id, exchangeRequestId, appointmentDate, location, status) {
        this.id = id;
        this.exchangeRequestId = exchangeRequestId;
        this.appointmentDate = appointmentDate;
        this.location = location;
        this.status = status;
    }
}

module.exports = Appointment;
