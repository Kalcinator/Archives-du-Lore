# 📜 Archives du Lore

> Répertoire des créateurs de contenu francophones dédiés à l'univers de Warhammer 40,000 et 30k.

[![Licence: CC0](https://img.shields.io/badge/Licence-CC0%201.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/deed.fr)
[![Site en ligne](https://img.shields.io/badge/Site-kalcinator.github.io-red)](https://kalcinator.github.io/Archives-du-Lore/)
[![Statut](https://img.shields.io/badge/Statut-Actif-green)](#)

---

## C'est quoi ?

<!-- Décris le projet en 2-3 phrases. Exemple : -->
<!-- Les Archives du Lore sont une ressource communautaire pour retrouver facilement les créateurs francophones qui parlent du lore Warhammer 40k. Chaînes YouTube, podcasts, livres audio — tout est là. -->

---

## Utilisation

<!-- Comment utiliser le site. Exemple : -->
<!-- Rendez-vous sur https://kalcinator.github.io/Archives-du-Lore/ -->
<!-- Utilisez la barre de recherche pour filtrer par nom, tag ("livre audio", "podcast"), ou statut ("actif", "pause"). -->

---

## Ajouter une chaîne

Toutes les chaînes sont dans `src/App.tsx`, dans le tableau `CHANNELS`. Chaque entrée suit ce format :

```ts
{
  name: "Nom de la chaîne",
  url: "https://www.youtube.com/@handle",
  description: "Description courte de la chaîne.",
  status: "active",   // active | pause | dead
  tags: ["lore"],     // lore | podcast | livre-audio | livre-audio-original | musique | figurines | news | jeux-video
},
```

---

## Architecture

```
src/
├── App.tsx          ← Données (CHANNELS) + composant principal
├── MatrixRain.tsx   ← Animation canvas (pluie de glyphes grecs)
├── NoosPulse.tsx    ← Animation canvas (pulsations dorées de la Noosphère)
├── main.tsx         ← Point d'entrée React
└── index.css        ← Thème Grimdark (Tailwind + tokens CSS)
```

**Stack** : React + TypeScript + Vite + Tailwind CSS  
**Déploiement** : GitHub Actions → GitHub Pages (branche `gh-pages`) — automatique à chaque push sur `main`

---

## Contribuer

<!-- Comment les gens peuvent contribuer. Exemple : -->
<!-- Tu connais une chaîne qui manque ? Ouvre une issue ou une pull request avec l'entrée à ajouter. -->

---

## Licence

Ce projet est sous licence **CC0 1.0 Universal** — domaine public, aucune restriction.  
Fais-en ce que tu veux. L'Empereur Protège.
