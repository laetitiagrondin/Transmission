// Modèle représentant une annonce
class Announcement {
    constructor(id, userId, title, description, type, subject, location) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.subject = subject;
        this.location = location;
    }
}

module.exports = Announcement;
