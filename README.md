# YŪGEN — Bar à Sushi & Haute Gastronomie Japonaise

> **L'Art du Sushi Redéfini.**  
> Où l'artisanat culinaire ancestral rencontre l'élégance contemporaine. Découpes d'orfèvre, poissons d'exception issus d'une pêche durable et riz shari au vinaigre rouge akazu.  
> Situé au 18 Rue Royale, 75008 Paris.

---

## 🍣 Aperçu du Projet

Site web immersif et réactif pour le restaurant japonais d'exception **YŪGEN**, reproduisant fidèlement l'architecture visuelle et les interactions du template de référence [Qitchen sur Framer](https://qitchen-template.framer.website/).

L'intégralité des visuels, menus, catégories et vidéos est intégrée localement, avec tous les textes traduits dans un français culinaire soigné et les prix présentés en **Euros (€)**.

---

## ✨ Fonctionnalités & Spécificités

- **🎥 Page d'Accueil Plein Écran (50 / 50)** :
  - **À gauche** : Carré vidéo immersif en boucle haute définition avec contrôle audio discret et le nom du restaurant animé au bas mot à mot.
  - **En haut à gauche** : Pilule de navigation rectangulaire avec liens rapides (*Menu*, *À Propos*, *Réservation*) et burger dépliant ouvrant un **menu plein écran** (*Accueil*, *Menu*, *Réservation*, *À Propos*, *Contact*).
  - **À droite** : 3 cartes visuelles verticales avec zoom fluide au survol :
    1. *Menu* (visuel sushi gastronomique)
    2. *Réservation* (visuel femme au restaurant)
    3. *Notre Restaurant* (visuel salle de restaurant)
- **✨ Animation Cinétique « Kinetic Title »** :
  - Sur chaque page (Menu, À Propos, Réservation), le titre émerge en bas à gauche lettre par lettre avec un effet de flou (*blur-in*) et de translation verticale fluide, comme une signature qui s'écrit.
- **🍱 Menu 50 / 50 Épuré & Descriptif (`/menu`)** :
  - **À gauche** : Grande image de couverture avec le titre animé `MENU`.
  - **À droite** : Carte défilante verticale épurée sans emojis :
    - Filtres de catégories : *Tous nos plats*, *Maki*, *Uramaki*, *Créations Spéciales*.
    - Chaque plat présente sa photo à gauche avec **zoom automatique fluide au survol**.
    - Titre en police Forum, ligne en pointillés fins et prix en Euros (€).
    - Description culinaire soignée intégrant tous les ingrédients et accords.
    - Zéro bouton de commande ou modale intrusive : expérience purement contemplative et gastronomique.
- **🏆 Page À Propos 50 / 50 avec Carrousel Automatique (`/about`)** :
  - **À gauche** : Grande image avec titre animé `À PROPOS`.
  - **À droite** : Distinctions officielles (Guide Michelin, TripAdvisor, Star Dining), carrousel photo qui défile automatiquement toutes les 3,5 secondes, récit de la maison et les 4 engagements fondateurs.
- **📅 Réservation 50 / 50 (`/reservation`)** :
  - **À gauche** : Grande photographie du maître sushi avec titre animé `RÉSERVATION`.
  - **À droite** : Formulaire interactif complet avec sélection de la date, des créneaux (midi / soir), convives et confirmation instantanée avec pluie de confettis.

---

## 🛠️ Stack Technique

- **Framework** : React 19 + Vite 6
- **Styles** : Tailwind CSS 3 (Palette sombre : `#0a0b0a`, `#efe7d2`, `#cfbe91`, `#333330`)
- **Typographie** : **Forum** (Google Fonts) & **Plus Jakarta Sans**
- **Animations & Effets** : Kinetic Typography (blur & stagger), Transitions 3D, Canvas Confetti
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
├── tailwind.config.js           # Palette sombre, tokens Yūgen & police Forum
├── vite.config.js               # Configuration Vite
├── public/
│   └── assets/                  # 32 images WebP haute définition & vidéo MP4 officielle
├── src/
│   ├── main.jsx                 # Point d'entrée React
│   ├── App.jsx                  # Routeur client & mise en page
│   ├── index.css                # Styles globaux, scrollbar personnalisée & effets de zoom
│   ├── data/
│   │   └── restaurantData.js    # Menus complets en français, prix en €, histoire & distinctions
│   ├── components/
│   │   ├── HeaderPill.jsx       # Pilule de navigation en haut à gauche avec burger
│   │   ├── FullscreenMenu.jsx   # Menu dépliant plein écran (Menu, Réservation, À Propos, Contact)
│   │   ├── KineticTitle.jsx     # Titre animé en bas à gauche (effet blur lettre par lettre)
│   │   ├── Footer.jsx           # Pied de page avec horaires, coordonnées & réseaux
│   │   └── LicensingModal.jsx   # Modale des mentions légales & licences
│   └── pages/
│       ├── HomePage.jsx         # Accueil : Vidéo à gauche, 3 cartes verticales à droite
│       ├── MenuPage.jsx         # Menu 50/50 : Image à gauche, carte verticale épurée à droite
│       ├── AboutPage.jsx        # À Propos 50/50 : Carrousel automatique & histoire
│       ├── ReservationPage.jsx  # Réservation 50/50 : Grande image à gauche & formulaire à droite
│       └── NotFoundPage.jsx     # Page 404
```

---

## 📜 Licence
Projet réalisé sous licence MIT.
Crédits design : Inspiré de l'esthétique Framer Qitchen par Paweł Gola.
