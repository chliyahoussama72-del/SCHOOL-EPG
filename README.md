# Application Web de Gestion des Paiements et Suivi des Retards

## Prérequis
- Node.js (v14+)
- MySQL

## Installation

### 1. Base de Données
Créez une base de données MySQL nommée `school_epg`.
```sql
CREATE DATABASE school_epg;
```
Configurez les accès dans `backend/.env` si nécessaire (par défaut: root / sans mot de passe).

### 2. Backend
```bash
cd backend
npm install
npm start
```
Le serveur démarrera sur http://localhost:5000.
La base de données sera synchronisée automatiquement.
Un utilisateur admin doit être créé via l'API ou directement en base pour commencer (endpoint `/api/auth/register` disponible temporairement).

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
L'application sera accessible sur http://localhost:5173.

## Fonctionnalités
- **Authentification**: Connexion sécurisée.
- **Étudiants**: Gestion des étudiants (Ajout, Liste, Recherche).
- **Paiements**: Enregistrement des paiements, Génération de reçus PDF.
- **Tableau de bord**: Vue d'ensemble.

## Structure du Projet
- `backend/`: API Express, Modèles Sequelize, Contrôleurs.
- `frontend/`: Interface React, Tailwind CSS.
"# SCHOOL-EPG"  
