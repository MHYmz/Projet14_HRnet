# HRnet - Application de Gestion des Employés

## 📌 Présentation

HRnet est une application de gestion des employés développée avec React. Cette application permet aux utilisateurs de créer, visualiser et gérer des enregistrements d'employés. Elle est conçue pour remplacer une ancienne version de l'application utilisant jQuery, en améliorant les performances et la maintenabilité grâce à React.

## 🚀 Fonctionnalités

* Création d'employés avec des informations détaillées (nom, date de naissance, date d'embauche, adresse, département).
* Visualisation, recherche, tri et pagination des employés enregistrés
* Sélection de date via un composant calendrier personnalisé.
* Menu déroulant pour sélectionner les départements et les régions.

## 📦 Installation

## Prérequis

* Node.js (version 18 ou supérieure)
* NPM (version 9 ou supérieure)
* Un éditeur de texte comme Visual Studio Code (VS Code)

## ⚙️ Étapes d'installation

```bash
git clone https://github.com/MHYmz/Projet14_HRnet.git
cd Projet14_HRnet
npm install
npm run dev
``` 

## ✅ Utilisation

L'application se divise en deux pages principales :

1. **Formulaire de création d'employés** : Permet d'ajouter de nouveaux employés.
2. **Répertoire des employés** : Permet de visualiser, trier et rechercher parmi les employés enregistrés.

## 📚 Architecture

* **React + Vite** pour une performance optimale.
* **Redux** pour la gestion de l'état des employés.
* **React-Select** pour les menus déroulants.
* **React-Datepicker** pour la sélection de dates.
* **React-Router-Dom** pour la navigation entre les pages.

## 🚀 Déploiement

L'application peut être déployée en utilisant Vite pour une build optimisée :

```bash
npm run build
```

## 📦 Composant HRNET

### ✅ HRNET Option Selector

👉 [Voir le composant sur npm](https://www.npmjs.com/package/hrnet-option-selector)

## Comparatifs Lighthouse

🚀 jQuery vs React – Create Employee
La version React offre des gains nets de performance :

✅ Score global : 0.98 → 1.00 (max)
⏱ FCP : 0.9s → 0.5s (44% plus rapide)
📸 LCP : 0.9s → 0.6s (33% plus rapide)
🕹 TTI : 0.9s → 0.6s (33% plus rapide)
🚀 Speed Index : stable à 0.9s
👉 Résultat : React améliore clairement la rapidité et la fluidité de l'application.


🚀 jQuery vs React – Employee Directory
La version React confirme sa modernisation efficace :

✅ Score global : 0.98 → 1.00
⏱ FCP : 0.6s → 0.5s (17% plus rapide)
📸 LCP : 0.6s → 0.5s (17% plus rapide)
🕹 TTI : 0.8s → 0.6s (25% plus rapide)
🚀 Speed Index : 0.6s → 0.7s (légère baisse)
📱 Viewport : absent → corrigé ✅ (responsive activé)
👉 Résultat : React améliore la réactivité, réduit les temps de chargement principaux et corrige les problèmes de responsive design. Malgré une légère hausse du Speed Index, l’application gagne en fluidité et en structure, tout en maintenant d’excellentes performances globales.


## 📄 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le distribuer, sous réserve de conserver les mentions de copyright.
