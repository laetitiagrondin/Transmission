// Modèle représentant un message
class Message {
    constructor(id, senderId, recipientId, content, createdAt) {
        this.id = id;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.createdAt = createdAt;
    }
}

// Exportation du modèle Message
module.exports = Message;
