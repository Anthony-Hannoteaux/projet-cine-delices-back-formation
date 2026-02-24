# Cine Délices – Application Web Fullstack

Cine Délices est une application web fullstack permettant de partager et découvrir des recettes inspirées de films et de séries.

Projet réalisé en équipe dans le cadre du **Titre Professionnel Développeur Web et Web Mobile**.  
J’y ai occupé un rôle de référent technique et ai été fortement impliqué dans la conception et l’implémentation du front-end et du back-end.

---

## Objectif du projet

Développer une application complète avec :

- Un front-end en SPA (React)
- Une API REST sécurisée (Node.js / Express)
- Une base de données relationnelle (PostgreSQL)
- Un système d’authentification utilisateur

---

## Stack technique

### Front-end
- React
- React Router
- Context API
- Hooks personnalisés
- SCSS

### Back-end
- Node.js
- Express
- PostgreSQL
- Architecture MVC
- API REST

### Conception
- Modélisation de la base de données (MCD => MLD => MPD)
- Dictionnaire de données
- Séparation claire Front / API

---

## Authentification & Sécurité

- Système d’authentification basé sur JWT
- Gestion de l’état d’authentification via Context React
- Routes protégées côté client
- Requêtes SQL paramétrées (prévention des injections SQL)
- Logique de rôles (utilisateur / administrateur)

-- Les utilisateurs générés via les seedings stockent actuellement les mots de passe en clair (environnement de développement uniquement).  
L’implémentation du hachage des mots de passe est identifiée comme axe d’amélioration prioritaire. --

---

## Architecture

### Front-end

- Mise en place et configuration initiale de l’application React
- Structuration en composants réutilisables
- Implémentation des composants :
  - `AccountForm`
  - `LoginForm`
  - `SignupForm`
- Création des hooks personnalisés :
  - `useLogin`
  - `useSignup`
- Configuration initiale du contexte d’authentification

### Back-end

- Conception du dictionnaire de données
- Réalisation du MCD / MLD / MPD
- Création de la base PostgreSQL
- Mise en place des premières migrations et seedings
- Implémentation du modèle `User`
- Implémentation du `userController`
- Test unitaire sur la méthode `Create` du modèle `User`
- Tests de requêtes HTTP via REST Client

---

## Mes contributions

Bien que réalisé en équipe, j’ai été fortement impliqué dans les décisions techniques et la mise en place des éléments structurants du projet :

- Conception de la base de données
- Mise en place de l’architecture back-end
- Implémentation des premières briques d’authentification
- Configuration initiale de l’application React
- Mise en place des hooks et du contexte d’authentification
- Tests unitaires et tests HTTP

---

## Axes d’amélioration

- Mise en place du hachage des mots de passe (bcrypt)
- Implémentation d’un système de refresh token
- Centralisation de la validation des entrées
- Amélioration de la gestion des erreurs
- Augmentation de la couverture de tests
- Déploiement (Docker / CI/CD)

---

## Installation

### Back-end

```bash
cd projet-cine-delices-back-formation
npm install
npm run dev
```

Configurer le fichier `.env` à partir de `.env.example`.

### Front-end

```bash
cd projet-cine-delices-front-formation
npm install
npm start
```

---

## Liens des dépôts

Front-end :  
https://github.com/Anthony-Hannoteaux/projet-cine-delices-front-formation

Back-end :  
https://github.com/Anthony-Hannoteaux/projet-cine-delices-back-formation

---

## Documentation complète

Le dossier de projet complet (incluant wireframes, modélisation BDD, spécifications) est disponible ici :

[Dossier Projet - Titre Professionnel DWWM](<docs/Dossier Projet DWWM - Hannoteaux Anthony.pdf>)

[Annexes](<docs/Annexes - Dossier Projet DWWM - Hannoteaux Anthony.pdf>)
