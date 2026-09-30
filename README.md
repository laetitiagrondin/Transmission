# Transmission

## Présentation

Transmission est une plateforme intergénerationnelle permettant de favoriser les échanges entre seniors et jeunes autour du partage de savoir-faire, d'expériences et de souvenirs.

L'application permet aux utilisateurs de proposer ou de demander des compétences, d'échanger des messages et d'organiser des rendez-vous.

## Objectif

L'objectif de Transmission est de faciliter la transmission de connaissances et d'expériences entre différentes générations grâce à une plateforme simple et accessible.

## Fonctionnalités

* Création et gestion d'un compte utilisateur
* Authentification des utilisateurs
* Création et consultation d'annonces
* Propositions et demandes d'échange
* Messagerie entre utilisateurs
* Organisation de rendez-vous
* Notifications
* Gestion du profil utilisateur

## Technologies utilisées

### Front-End

* JavaScript
* React
* Vite

### Back-End

* JavaScript
* Node.js
* Express

### Base de données

* PostgreSQL

### API externe

Une API externe sera intégrée au projet pour compléter les fontionnalités de la plateforme.

## Installation

### Cloner le projet

```bash
git clone <URL_DU_DEPOT>
cd Transmission
```

### Installer les dépendances du Back-End

```bash
cd backend
npm install
```

### Installer les dépendances du Front-End

```bash
cd ../frontend
npm install
```

## Lancement

### Back-End

Depuis le dossier `backend` :

```bash
node server.js
```

Le serveur fonctionne sur :

```text
http://localhost:3000
```

### Front-End

Depuis le dossier `Front-End` :

```bash
npm run dev
```

L'application est ensuite accessible depuis l'adresse indiquée par Vite.

### API

L'API utilise actuellement les routes pricipales suivantes :

```text
/api/users/
/api/announcements/
/api/exchange-requests/
/api/messages/
/api/appointments/
/api/notifications/
```
