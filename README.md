# TaskFlow

[![CI/CD](https://github.com/pstawi/taskflow-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/pstawi/taskflow-starter/actions)
[![Release](https://img.shields.io/github/v/release/pstawi/taskflow-starter?cacheSeconds=300)](https://github.com/pstawi/taskflow-starter/releases)
[![Coverage](https://img.shields.io/badge/coverage-%3E70%25-brightgreen)](./coverage/)

> Application de gestion de tâches avec CI/CD complet

## 🚀 Demo

**GitHub Pages** : https://pstawi.github.io/taskflow-starter/  
**Render** : https://taskflow-starter.onrender.com

## Description

TaskFlow est une application web de gestion de tâches (todo list) avec un pipeline CI/CD complet.

**Stack technique :**
- Frontend : Vanilla JavaScript + Vite
- Tests : Vitest + Playwright (E2E)
- Linting : ESLint + Prettier
- Container : Docker + nginx
- Déploiement : GitHub Pages + Render

## 🐳 Docker

```bash
docker pull ghcr.io/pstawi/taskflow-starter:main
docker run -d -p 8080:80 ghcr.io/pstawi/taskflow-starter:main
```

## 🛠️ Development

```bash
# Cloner le repository
git clone https://github.com/pstawi/taskflow-starter.git
cd taskflow-starter

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Tests
npm test
npm run build
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build pour la production |
| `npm run preview` | Prévisualise le build |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les erreurs |
| `npm run format` | Formate le code avec Prettier |
| `npm run test` | Lance les tests |
| `npm run test:watch` | Lance les tests en mode watch |
| `npm run test:coverage` | Lance les tests avec couverture |

## Structure du projet

```
taskflow/
├── index.html          # Page principale
├── src/
│   ├── app.js          # Point d'entrée, gestion UI
│   ├── tasks.js        # Logique métier (testable)
│   └── styles.css      # Styles
├── tests/
│   └── tasks.test.js   # Tests unitaires
├── Dockerfile          # À compléter (Jour 5)
├── package.json
└── README.md
```

## Progression CI/CD

### Jour 1 : Premier workflow CI
- [ ] Créer `.github/workflows/ci.yml`
- [ ] Workflow : checkout → install → lint

### Jour 2 : Configuration avancée
- [ ] Ajouter job `build`
- [ ] Matrix Node 18/20/22
- [ ] Trigger `workflow_dispatch`

### Jour 3 : Tests et qualité
- [ ] Ajouter job `test`
- [ ] Atteindre coverage >= 70%
- [ ] Upload rapport en artifact

### Jour 4 : Branches et releases
- [ ] Configurer branch protection
- [ ] Créer workflow release
- [ ] Publier v1.0.0

### Jour 5 : Déploiement
- [x] Compléter le Dockerfile
- [x] Push image sur ghcr.io
- [x] Déployer sur GitHub Pages
- [x] Déployer sur Render

## 📦 CI/CD Pipeline

- ✅ Lint (ESLint)
- ✅ Test (Vitest + Coverage ≥ 70%)
- ✅ E2E Tests (Playwright)
- ✅ Build (Vite)
- ✅ Docker (ghcr.io)
- ✅ Deploy (GitHub Pages)
- ✅ Deploy (Render via webhook)
- ✅ Release (auto sur tag)

## Fonctionnalités de l'application

- Ajouter des tâches avec priorité (haute, moyenne, basse)
- Marquer les tâches comme terminées
- Filtrer par état (toutes, actives, terminées)
- Supprimer les tâches terminées
- Persistance dans le localStorage

## Licence

MIT - ForEach Academy
