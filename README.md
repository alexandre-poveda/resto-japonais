# Qitchen — Restaurant Japonais Gastronomique & Bar à Sushi

> **L'Art du Sushi Redéfini.**  
> Où l'artisanat culinaire ancestral rencontre l'élégance contemporaine. Découpes d'orfèvre, poissons d'exception issus d'une pêche durable et riz shari au vinaigre rouge akazu.  
> Situé au 18 Rue Royale, 75008 Paris.

---

## 🍣 Aperçu du Projet

Site web immersif, réactif et fluide pour le restaurant japonais d'exception **Qitchen**, fidèlement adapté du template officiel [Qitchen sur Framer](https://qitchen-template.framer.website/).

L'intégralité des visuels, menus, catégories et vidéos a été intégrée localement, avec tous les textes traduits dans un français culinaire soigné et les prix présentés en **Euros (€)**.

---

## ✨ Fonctionnalités & Spécificités

- **🎥 Hero Vidéo Immersif (`/`)** : Vidéo officielle en boucle haute définition avec contrôle audio discret, titre monumental *SENSATION SUSHI* et grille Bento interactive (*Notre Carte*, *Réservation*, *Notre Histoire*).
- **🔍 Double Fonctionnalité de Zoom sur les Plats (`/menu`)** :
  - **Zoom au survol** : Animation fluide `scale-115` avec vignette assombrie et icône loupe incitant à l'interaction.
  - **Zoom au clic (Lightbox Modal `DishModal`)** : Vue agrandie interactive jusqu'à **250%**, fiche technique complète, composition des ingrédients, liste officielle des allergènes, et ajout direct à la sélection de table.
- **🍱 Carte Gastronomique Complète (`/menu`)** :
  - **Makis** (6 €) : Thon Épicé, Mangue & Crevette Tempura, Saumon & Shiitaké, Thon & Légumes Croquants.
  - **Uramakis** (13 € — 15 €) : Délice Volcanique, Fusion Arc-en-Ciel, Élégance du Dragon (Unagi), Sérénité Crépusculaire, Jardin Mystique, Brise Marine, Floraison de Tokyo.
  - **Créations Spéciales** (18 € — 24 €) : Éclat de l'Aurore, Tango Mangue, Tentation Truffe & Bœuf Wagyu A5, Pétard du Pacifique, Anguille Éternelle & Feuilles d'Or 24k.
  - **Nigiri & Sashimi d'Exception** (26 € — 28 €) : Trio Omakase Sashimi, Assortiment Nigiri Impérial.
  - **Sakés & Thés d'Exception** (9 € — 32 €) : Saké Dassai 23 Junmai Daiginjo, Thé Matcha Grand Cru d'Uji.
  - Recherche instantanée multi-critères et filtres rapides (*🌶️ Épicé*, *🌱 Végétarien*, *⭐ Signatures*).
- **📋 Panier de Présélection de Table** : Les convives peuvent noter leurs plats préférés avec total estimé en € et transférer leur sélection directement vers la réservation.
- **🏆 Page À Propos & Galerie Interactive (`/about`)** :
  - Distinctions officielles : Guide Michelin, TripAdvisor (*Meilleur Bar à Sushi*), Star Dining.
  - Carrousel photo interactif avec visionneuse plein écran ([`ImageLightbox.jsx`](src/components/ImageLightbox.jsx)).
  - Portrait du Maître Sushi Kenzo Takahashi et les 4 engagements fondateurs (pêche responsable, riz akazu vieilli 3 ans, couteaux forgés à Sakai, wasabi frais).
- **📅 Réservation en Ligne Complète (`/reservation`)** :
  - Formulaire interactif : Nom, convives (1 à 8+ personnes), date, créneau horaire midi/soir cliquable, choix du placement (*Comptoir Omakase* ou *Table intime*), remarques & allergies.
  - Confirmation animée avec référence unique de réservation et pluie de confettis dorés (`canvas-confetti`).
- **🛡️ Mentions Légales & Crédits Typographiques (`LicensingModal`)** : Conformité RGPD, licence Open Font pour Forum et Satoshi, crédits photographiques.
- **📱 100% Responsive & Autonome** : Menu tiroir mobile optimisé, assets 100% stockés en local dans `public/assets/`.

---

## 🛠️ Stack Technique

- **Framework** : React 19 + Vite 6
- **Styles** : Tailwind CSS 3 (Palette Qitchen : `#0a0b0a`, `#efe7d2`, `#cfbe91`, `#333330`)
- **Typographie** : **Forum** (Google Fonts) & **Plus Jakarta Sans** / **Satoshi**
- **Animations & Effets** : CSS Transitions 3D, Canvas Confetti
- **Icônes** : Lucide React & SVGs vectoriels sur-mesure

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation & Lancement
```bash
# 1. Cloner le dépôt
git clone https://github.com/alexandre-poveda/resto-japonais.git
cd resto-japonais

# 2. Installer les dépendances
npm install

# 3. Lancer en local
npm run dev
```

Ouvrez ensuite [http://localhost:5173](http://localhost:5173) ou [http://localhost:4173](http://localhost:4173) dans votre navigateur.

### Build de Production
```bash
npm run build
```
Les fichiers statiques optimisés seront générés dans le dossier `dist/`.

---

## 📂 Architecture du Projet

```text
├── index.html                   # HTML d'entrée & import des polices Forum et Plus Jakarta Sans
├── package.json                 # Configuration & scripts
├── tailwind.config.js           # Palette sombre, tokens Qitchen & police Forum
├── vite.config.js               # Configuration Vite
├── public/
│   └── assets/                  # 32 images WebP haute définition & vidéo MP4 officielle
├── src/
│   ├── main.jsx                 # Point d'entrée React
│   ├── App.jsx                  # Routeur client, tiroir de sélection & toasts
│   ├── index.css                # Styles globaux, scrollbar personnalisée & effets de zoom
│   ├── data/
│   │   └── restaurantData.js    # Menus complets en français, prix en €, histoire & distinctions
│   ├── components/
│   │   ├── Navbar.jsx           # En-tête flottant avec logo, liens et tiroir mobile
│   │   ├── Footer.jsx           # Pied de page avec horaires, coordonnées & réseaux
│   │   ├── DishModal.jsx        # Modale détaillée avec zoom d'image jusqu'à 250%
│   │   ├── ImageLightbox.jsx    # Visionneuse plein écran pour la galerie photo
│   │   └── LicensingModal.jsx   # Modale des mentions légales & licences
│   └── pages/
│       ├── HomePage.jsx         # Accueil : Hero vidéo, cartes Bento & distinctions
│       ├── MenuPage.jsx         # Carte gastronomique complète & zoom au survol/clic
│       ├── AboutPage.jsx        # L'Art du Sushi Redéfini, carrousel photo & histoire
│       ├── ReservationPage.jsx  # Formulaire de réservation interactif & confettis
│       └── NotFoundPage.jsx     # Page 404 aux couleurs de Qitchen
```

---

## 📜 Licence
Projet réalisé sous licence MIT.
Crédits design originaux : Paweł Gola (Qitchen Template Framer).
