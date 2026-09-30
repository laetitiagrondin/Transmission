// Modèle représentant un utilisateur
class User {
    constructor(id, firstName, lastName, email, password, createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}

module.exports = User;
