<p align="center">
  <img src="./src/assets/icon/logo.svg" alt="SportSee Logo" width="200" />
</p>

<h1 align="center">SportSee — Frontend</h1>

<p align="center">
  Tableau de bord d'analytics sportif — Projet 12 OpenClassrooms
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=flat&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/pnpm-package_manager-F69220?style=flat&logo=pnpm&logoColor=white" />
</p>

---

## 📋 Description

Interface utilisateur du projet **SportSee**, une application de suivi d'activité sportive permettant à l'utilisateur de visualiser ses données d'entraînement via des graphiques interactifs.

---

## 🛠️ Stack technique

| Outil | Version |
|---|---|
| React | 19 |
| Vite | 7 |
| React Router | 7 |
| Recharts | — |
| pnpm | — |

---

## 🚀 Lancer le projet

> ⚠️ Le **backend doit être lancé** avant le frontend. Voir le README du dossier `backend/`.

### Installation des dépendances

```bash
pnpm install
```

### Lancer en développement

```bash
pnpm dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173)

### Build de production

```bash
pnpm build
```

### Prévisualiser le build

```bash
pnpm preview
```

---

## 📁 Structure du projet

```
src/
├── assets/
│   └── icon/          # Logo et icônes SVG
├── components/
│   ├── Header/        # Barre de navigation
│   ├── charts/        # Graphiques (BarChart, LineChart, RadarChart, RadialChart)
│   └── KeyData/       # Cartes de données clés
├── pages/
│   ├── Dashboard/     # Page principale
│   └── NotFound/      # Page 404
├── services/
│   └── api.js         # Appels vers l'API backend
├── App.jsx
└── main.jsx
```

---

## 🔗 Routes

| Route | Description |
|---|---|
| `/` | Redirige vers `/user/12` |
| `/user/:id` | Dashboard de l'utilisateur |
| `*` | Page 404 |

---

## 👤 Auteur

Projet réalisé dans le cadre de la formation **Développeur d'application JavaScript React** — OpenClassrooms.
