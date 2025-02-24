
# API de Gestion de Films

Ce projet a pour objectif de fournir une API robuste et performante permettant la gestion d'une bibliothèque de films, l'administration des utilisateurs, ainsi que l'envoi de notifications par email. Il inclut également la possibilité d'effectuer des exports CSV des films à l'aide d'un système de gestion asynchrone via un message broker.

---

## Pré-requis

Avant de commencer l'installation du projet, assurez-vous que les éléments suivants sont installés sur votre machine :

- **Node.js**
- **MySQL**

---

## Installation et Configuration

### 1. Cloner le projet

Pour cloner le projet sur votre machine locale, exécutez la commande suivante dans votre terminal :

```bash
git clone https://github.com/Nico-ass/R6A.05
```

### 2. Installer les dépendances

Ensuite, naviguez vers le dossier du projet et installez les dépendances nécessaires :

```bash
cd R6A.05
npm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine de votre projet et ajoutez les variables suivantes pour la configuration de la base de données et du serveur d'envoi d'email.

```
# Configuration du serveur
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hapi
DB_NAME=filmsdb

# Configuration du serveur de mails
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=(créer un utilisateur ethereal)
EMAIL_PASS=(récupérer le mot de passe du compte ethereal crée)
```

- **DB_HOST** : Hôte de votre serveur MySQL
- **DB_USER** : Nom d'utilisateur de la base de données
- **DB_PASSWORD** : Mot de passe de la base de données
- **DB_NAME** : Nom de la base de données
- **EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS** : Informations nécessaires pour l'envoi des emails via un serveur SMTP

---

## Démarrer le serveur

Une fois les dépendances installées et le fichier `.env` configuré, démarrez le serveur avec la commande suivante :

```bash
npm start
```

Le serveur sera alors accessible sur le port **3000** ou celui défini dans votre fichier `.env`.

---

## Fonctionnalités de l'API

L'API permet de gérer les films et les favoris des utilisateurs, et d'envoyer des notifications par email. Voici un aperçu des fonctionnalités principales :

- **Ajouter un film** : Ajoute un film à la base de données.
- **Modifier un film** : Met à jour les informations d'un film existant.
- **Gérer les favoris** : Les utilisateurs peuvent ajouter ou retirer des films de leurs favoris.
- **Notifications par email** : Lorsqu'un film est ajouté ou modifié, les utilisateurs ayant ce film en favoris reçoivent une notification par email. **(à implémenter)**
- **Exporter les films au format CSV** : Les administrateurs peuvent exporter la liste des films sous forme de fichier CSV. **(à implémenter)**

---

## Technologies utilisées

- **Node.js** : Backend de l'application.
- **Express** : Gestion des routes et des requêtes HTTP.
- **Knex.js** : ORM pour la gestion de la base de données.
- **MySQL** : Base de données relationnelle.
- **Nodemailer** : Service d'envoi d'emails.
- **JWT** : Gestion de l'authentification des utilisateurs.

---

## Conclusion

Ce projet propose une API complète pour la gestion d'une bibliothèque de films avec des fonctionnalités de gestion des utilisateurs, des favoris, des notifications par email et des exports CSV. Il s'agit d'une base solide pour développer une application de films évolutive.

