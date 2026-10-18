// Qitchen - Restaurant Japonais & Bar à Sushi d'Exception
// Données complètes, visuels officiels, typographie et traductions françaises soignées

export const RESTAURANT_INFO = {
  name: "Qitchen",
  tagline: "L'Art du Sushi Redéfini",
  subtitle: "Où l'artisanat culinaire ancestral rencontre l'élégance moderne. Savourez les sushis les plus raffinés, minutieusement composés pour magnifier votre voyage gastronomique.",
  address: "18 Rue Royale, 75008 Paris",
  phone: "+33 1 42 68 55 00",
  email: "contact@qitchen-paris.fr",
  reservationsEmail: "reservation@qitchen-paris.fr",
  hours: [
    { days: "Mardi — Vendredi", lunch: "12h00 — 14h30", dinner: "19h00 — 23h00" },
    { days: "Samedi — Dimanche", lunch: "12h30 — 15h00", dinner: "19h00 — 23h30" },
    { days: "Lundi", lunch: "Fermé", dinner: "Fermé" }
  ],
  socials: {
    instagram: "https://www.instagram.com/gola.design/",
    twitter: "https://x.com/gola99",
  },
  assets: {
    logo: "/assets/x0JzSofUJm2jTIMMg5jbgdRYVzU.webp",
    favicon: "/assets/SQZDQj2gDkUmN9upKjykPnd1NM.png",
    video: "/assets/KNjmnFp5kwda6KegO13wieYyI0.mp4",
    heroImage: "/assets/RAU19PL6ISblT8l98fG6ggBX9g.jpg",
    footerImage: "/assets/aNmmzqMc990oFx3uvtN2SJHyzvw.webp",
    menuCover: "/assets/EKJJBnLQzSzsS1Sp8JrOMfZgqw.webp",
    reservationCover: "/assets/slPotYXPFXAfEsa1a4GJhZIk.webp",
    aboutCover: "/assets/InB1qO4eodYHQXKOVBszhLURHE.webp",
    chefPortrait: "/assets/SMJY8uQcFDPv5vRNMRmZijjygkM.webp",
    reservationBanner: "/assets/apLVZGAMneXESKaZkziIssg86a8.webp",
  }
};

export const AWARDS = [
  {
    source: "Trip Advisor",
    title: "Meilleur Bar à Sushi",
    description: "Élu Meilleur Bar à Sushi de la capitale par nos convives pour la pureté des découpes et la fraîcheur absolue.",
    badge: "Choix des Voyageurs 2024"
  },
  {
    source: "Guide Michelin",
    title: "Cuisine de Haute Précision",
    description: "Distingué pour la sélection rigoureuse des poissons de ligne et la maîtrise magistrale du riz vinaigré akazu.",
    badge: "Sélection Gastronomique"
  },
  {
    source: "Star Dining",
    title: "Ambiance & Cadre d'Exception",
    description: "Une atmosphère intime et feutrée aux accents wabi-sabi qui transcende le simple repas en une cérémonie des sens.",
    badge: "Expérience 5 Étoiles"
  }
];

export const GALLERY_IMAGES = [
  {
    src: "/assets/I8AGYbzHAG3DaCqU2wYCmWnrFLw.webp",
    caption: "Le geste précis du Maître Sushi au comptoir hinoki",
    category: "Artisanat"
  },
  {
    src: "/assets/jFLjtiNrSbyMi9cGMowrM7Pc7Bg.webp",
    caption: "Plateau dégustation Omakase aux reflets d'or",
    category: "Signature"
  },
  {
    src: "/assets/InB1qO4eodYHQXKOVBszhLURHE.webp",
    caption: "L'intimité de nos salons privés et lumières tamisées",
    category: "Ambiance"
  },
  {
    src: "/assets/G4pBdBCgBUC7XWv710nE2LXLUTs.webp",
    caption: "Sélection d'anguille laquée et wagyu grillé au binchotan",
    category: "Grillades"
  },
  {
    src: "/assets/CFQGdIzQBxhDDSuVq7NiPP3wI.webp",
    caption: "Cérémonie du thé vert matcha et douceurs wagashi",
    category: "Tradition"
  },
  {
    src: "/assets/eN3OMUIE7k3yknjR7LKFRc8TlU.webp",
    caption: "Fraîcheur éclatante des rouleaux créatifs du jour",
    category: "Créations"
  }
];

export const MENU_CATEGORIES = [
  { id: "all", label: "Tous nos Plats" },
  { id: "maki", label: "Maki" },
  { id: "uramaki", label: "Uramaki" },
  { id: "special", label: "Créations Spéciales" },
  { id: "sashimi", label: "Nigiri & Sashimi" },
  { id: "drinks", label: "Sakés & Boissons" }
];

export const MENU_ITEMS = [
  // --- MAKI ---
  {
    id: "spicy-tuna-maki",
    category: "maki",
    title: "Spicy Tuna Maki",
    titleFr: "Maki Thon Épicé",
    price: 6,
    priceStr: "6 €",
    desc: "Un mariage captivant de thon rouge épicé, concombre croquant et avocat fondant, délicatement roulé dans une feuille de nori croustillante et un riz vinaigré assaisonné.",
    image: "/assets/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp",
    badges: ["🌶️ Épicé", "⭐ Favori"],
    ingredients: ["Thon rouge de ligne", "Concombre bio", "Avocat Hass", "Sauce togarashi maison", "Nori grillée", "Riz shari akazu"],
    allergens: ["Poisson", "Sésame", "Soja"],
    pieces: "6 pièces"
  },
  {
    id: "mango-maki",
    category: "maki",
    title: "Mango Maki",
    titleFr: "Maki Mangue & Crevette Tempura",
    price: 6,
    priceStr: "6 €",
    desc: "Crevette délicatement frite en tempura légère, concombre frais et pointe de fromage frais enrobant un cœur d'avocat mûr, offrant un contraste parfait de croquant et d'onctuosité.",
    image: "/assets/fhMMbGkmrMBjUIswKIN5x3w.webp",
    badges: ["🍤 Tempura", "Doux"],
    ingredients: ["Crevette impériale en tempura", "Mangue fraîche", "Concombre", "Fromage frais", "Riz shari"],
    allergens: ["Crustacés", "Gluten", "Lait"],
    pieces: "6 pièces"
  },
  {
    id: "salmon-maki",
    category: "maki",
    title: "Salmon Maki",
    titleFr: "Maki Saumon & Shiitaké",
    price: 6,
    priceStr: "6 €",
    desc: "Fines lamelles de saumon écossais, champignons shiitaké mijotés au mirin et radis daikon mariné, blottis dans un rouleau de riz délicatement saupoudré de graines de sésame torréfiées.",
    image: "/assets/9kkGOeR8XfJ0bkSq5vagmboso.webp",
    badges: ["🌊 Mer & Terre"],
    ingredients: ["Saumon Label Rouge", "Shiitaké braisés", "Avocat", "Radis daikon mariné", "Sésame grillé"],
    allergens: ["Poisson", "Sésame", "Soja"],
    pieces: "6 pièces"
  },
  {
    id: "tuna-maki",
    category: "maki",
    title: "Tuna Maki",
    titleFr: "Maki Thon & Légumes Croquants",
    price: 6,
    priceStr: "6 €",
    desc: "Un assortiment éclatant de carottes en julienne fine, poivrons doux et concombre rafraîchissant, entourant un cœur de thon frais, hermétiquement enveloppé d'algue nori artisanale.",
    image: "/assets/obPljpm9PHIdcU8RiJB5Q4qcTBo.webp",
    badges: ["🥗 Fraîcheur"],
    ingredients: ["Thon Albacore", "Carottes marinées", "Poivron doux", "Concombre", "Nori de la baie d'Ariake"],
    allergens: ["Poisson", "Soja"],
    pieces: "6 pièces"
  },

  // --- URAMAKI ---
  {
    id: "volcano-delight",
    category: "uramaki",
    title: "Volcano Delight",
    titleFr: "Délice Volcanique",
    price: 14,
    priceStr: "14 €",
    desc: "Salade de crabe onctueuse, avocat et concombre roulés à l'intérieur, coiffés d'un tartare de thon épicé et arrosés d'un trait ardent de sriracha maison et d'oignons croustillants.",
    image: "/assets/quqbVpcYdgH65rZqF71BSohYQ.webp",
    badges: ["🌶️ Chaud & Épicé", "🔥 Signature"],
    ingredients: ["Chair de crabe royal", "Tartare de thon", "Avocat", "Sriracha artisanale", "Ciboulette japonaise", "Pépites de tempura"],
    allergens: ["Crustacés", "Poisson", "Gluten", "Sésame"],
    pieces: "8 pièces"
  },
  {
    id: "rainbow-fusion",
    category: "uramaki",
    title: "Rainbow Fusion",
    titleFr: "Fusion Arc-en-Ciel",
    price: 14,
    priceStr: "14 €",
    desc: "Harmonie multicolore de thon rouge d'Atlantique, saumon mariné, sériole du Pacifique et avocat velouté, enlaçant un cœur généreux de chair de crabe et de bâtonnets de concombre.",
    image: "/assets/05utisiCSaVR87iUNMsXid3Jgs.webp",
    badges: ["🎨 Éclatant", "⭐ Recommandé"],
    ingredients: ["Thon rouge", "Saumon d'Écosse", "Sériole (Hamachi)", "Chair de crabe", "Avocat", "Tobiko orange"],
    allergens: ["Poisson", "Crustacés", "Soja"],
    pieces: "8 pièces"
  },
  {
    id: "dragon-elegance",
    category: "uramaki",
    title: "Dragon Elegance",
    titleFr: "Élégance du Dragon",
    price: 15,
    priceStr: "15 €",
    desc: "Anguille d'eau douce grillée au feu de bois (unagi) et avocat tendre lovés au cœur du rouleau, drapés de fines tranches d'avocat ciselées évoquant les écailles d'un dragon impérial et sauce kabayaki sirupeuse.",
    image: "/assets/Ed2EhaCAbs1wRkDTc5vxXiOczE4.webp",
    badges: ["👑 Incontournable", "Gourmet"],
    ingredients: ["Anguille grillée (Unagi)", "Avocat Hass", "Sauce kabayaki caramélisée", "Graines de sésame blanc", "Tobiko noir"],
    allergens: ["Poisson", "Soja", "Sésame", "Gluten"],
    pieces: "8 pièces"
  },
  {
    id: "sunset-serenity",
    category: "uramaki",
    title: "Sunset Serenity",
    titleFr: "Sérénité Crépusculaire",
    price: 14,
    priceStr: "14 €",
    desc: "Crevette en tempura dorée, concombre et mayonnaise épicée enveloppés d'une délicate feuille de soja végétale, couronnés de tranches de mangue fondante aux reflets crépusculaires.",
    image: "/assets/dewXkdK3qGBrcu5aDMswBstC4c.webp",
    badges: ["🥭 Sucré-Salé", "Fruité"],
    ingredients: ["Crevette tempura", "Feuille de soja naturelle", "Mangue fraîche", "Mayonnaise kewpie pimentée", "Perles de yuzu"],
    allergens: ["Crustacés", "Gluten", "Œufs", "Soja"],
    pieces: "8 pièces"
  },
  {
    id: "mystic-garden",
    category: "uramaki",
    title: "Mystic Garden",
    titleFr: "Jardin Mystique",
    price: 13,
    priceStr: "13 €",
    desc: "Champignons shiitaké mijotés, asperges vertes printanières et concombre croquant fusionnent avec des éclats de tempura dorés, recouverts d'un généreux manteau de graines de sésame bicolores.",
    image: "/assets/IioQcyucvy3RI3a1KSX7R95jxO4.webp",
    badges: ["🌱 Végétarien", "Croquant"],
    ingredients: ["Shiitaké glacés au mirin", "Asperges vertes", "Concombre bio", "Tempura croustillante", "Mélange sésame blanc & noir"],
    allergens: ["Gluten", "Sésame", "Soja"],
    pieces: "8 pièces"
  },
  {
    id: "ocean-breeze",
    category: "uramaki",
    title: "Ocean Breeze",
    titleFr: "Brise Marine",
    price: 14,
    priceStr: "14 €",
    desc: "Mosaïque subtile de crevettes sauvages, effiloché de crabe délicat et avocat soyeux, rehaussée d'une touche piquante d'œufs de poisson volant infusés au yuzu frais du Japon.",
    image: "/assets/KrDf3YKIs1qO70tsAQ00Ws.webp",
    badges: ["🍋 Agrumes & Yuzu", "Marin"],
    ingredients: ["Crevettes pochées au bouillon dashi", "Crabe royal", "Avocat", "Tobiko au yuzu", "Zeste de yuzu frais"],
    allergens: ["Crustacés", "Poisson", "Soja"],
    pieces: "8 pièces"
  },
  {
    id: "tokyo-blossom",
    category: "uramaki",
    title: "Tokyo Blossom",
    titleFr: "Floraison de Tokyo",
    price: 15,
    priceStr: "15 €",
    desc: "Une feuille de soja rose poudrée aux allures de fleur de cerisier enveloppe un cœur de thon noble, chair de crabe et concombre, magnifiée par de véritables pétales de fleurs comestibles et une émulsion douce.",
    image: "/assets/cOFzDBu3VcpPMyZrfpoqGTFdA4.webp",
    badges: ["🌸 Floral", "Signature Visuelle"],
    ingredients: ["Feuille de soja rose sakura", "Thon albacore", "Crabe", "Concombre", "Pétales de pensées comestibles", "Sauce ponzu douce"],
    allergens: ["Poisson", "Crustacés", "Soja"],
    pieces: "8 pièces"
  },

  // --- CRÉATIONS SPÉCIALES ---
  {
    id: "sunrise-bliss",
    category: "special",
    title: "Sunrise Bliss",
    titleFr: "Éclat de l'Aurore",
    price: 18,
    priceStr: "18 €",
    desc: "Une alliance d'une infinie délicatesse entre saumon frais de première découpe, cream cheese velouté et asperges vertes, entièrement roulée dans un tobiko orangé éclatant pour une explosion de saveurs solaires.",
    image: "/assets/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp",
    badges: ["🌅 Prestige", "Texture Fondante"],
    ingredients: ["Saumon Label Rouge d'Écosse", "Cream cheese fermier", "Asperges fines", "Tobiko orange intense", "Micro-pousses de shiso"],
    allergens: ["Poisson", "Lait", "Soja"],
    pieces: "8 pièces d'exception"
  },
  {
    id: "mango-tango",
    category: "special",
    title: "Mango Tango",
    titleFr: "Tango Mangue & Crevette Royale",
    price: 18,
    priceStr: "18 €",
    desc: "Crevettes impériales en tempura croustillante, concombre et avocat dansant en parfaite harmonie avec de généreuses tranches de mangue mûre, sublimées d'une réduction maison mangue-passion acidulée.",
    image: "/assets/bCZ9FLkc5BuH3LlY2ajVeE5Cb4o.webp",
    badges: ["👑 Coup de Cœur", "Saveurs Exotiques"],
    ingredients: ["Crevettes tigrées tempura", "Mangue Carabao", "Avocat", "Réduction mangue-fruit de la passion", "Piment d'Espelette doux"],
    allergens: ["Crustacés", "Gluten", "Soja"],
    pieces: "8 pièces d'exception"
  },
  {
    id: "truffle-indulgence",
    category: "special",
    title: "Truffle Indulgence",
    titleFr: "Tentation Truffe & Bœuf Wagyu",
    price: 22,
    priceStr: "22 €",
    desc: "Fines lamelles de truffe noire d'hiver délicatement posées sur un rouleau garni de bœuf Wagyu A5 saisi à la flamme, concombre croquant et micro-pousses, composant une symphonie umami d'une rare intensité.",
    image: "/assets/obWS2NDDG7Rnd4D7xOGDyh4FCA.webp",
    badges: ["🥩 Wagyu A5", "Truffe Noire", "⭐ Luxe Suprême"],
    ingredients: ["Bœuf Wagyu A5 de Miyazaki", "Truffe noire fraîche du Périgord", "Concombre", "Micro-pousses d'amarante", "Sauce tare à la truffe"],
    allergens: ["Soja", "Gluten"],
    pieces: "8 pièces d'exception"
  },
  {
    id: "pacific-firecracker",
    category: "special",
    title: "Pacific Firecracker",
    titleFr: "Pétard du Pacifique",
    price: 18,
    priceStr: "18 €",
    desc: "Salade de crabe épicée, crevettes en tempura croustillantes et piments jalapeño marinés s'unissent dans une composition enflammée, relevée d'un aïoli japonais au piment togarashi fumé.",
    image: "/assets/rUY8V3p7qMU6d0ymkSDqZWbG4.webp",
    badges: ["🌶️🌶️ Très Épicé", "Puissant"],
    ingredients: ["Crabe épicé", "Crevettes tempura", "Piments jalapeño marinés", "Aïoli togarashi", "Flocons de bonite séchée (Katsuobushi)"],
    allergens: ["Crustacés", "Gluten", "Œufs", "Poisson", "Soja"],
    pieces: "8 pièces d'exception"
  },
  {
    id: "eternal-eel",
    category: "special",
    title: "Eternal Eel",
    titleFr: "Anguille Éternelle & Feuilles d'Or",
    price: 24,
    priceStr: "24 €",
    desc: "Une création majestueuse alliant tempura d'anguille laquée fondante, médaillon de foie gras poêlé et concombre, élégamment couronnée d'un filet d'huile de truffe blanche et de véritables paillettes d'or 24 carats.",
    image: "/assets/zoCG6siF05pS2bpapbv0gEtdPqE.webp",
    badges: ["✨ Or 24 Carats", "Foie Gras", "Chef-d'œuvre"],
    ingredients: ["Anguille d'eau douce laquée", "Foie gras poêlé minute", "Concombre", "Huile de truffe blanche d'Alba", "Feuilles d'or 24k comestibles"],
    allergens: ["Poisson", "Gluten", "Soja"],
    pieces: "8 pièces d'exception"
  },

  // --- SASHIMI & NIGIRI D'EXCEPTION ---
  {
    id: "sashimi-omakase",
    category: "sashimi",
    title: "Omakase Sashimi Trio",
    titleFr: "Trio de Sashimi Omakase",
    price: 26,
    priceStr: "26 €",
    desc: "Découpe haute précision du Maître Sushi : 4 tranches de thon gras Otoro, 4 tranches de saumon mariné au saké et 4 tranches de sériole du Japon, présentées sur lit de glace pilée et shiso frais.",
    image: "/assets/jFLjtiNrSbyMi9cGMowrM7Pc7Bg.webp",
    badges: ["🐟 Otoro Suprême", "Pur"],
    ingredients: ["Thon Otoro", "Saumon d'Écosse", "Hamachi", "Shiso vert", "Wasabi frais râpé à la peau de requin"],
    allergens: ["Poisson", "Soja"],
    pieces: "12 tranches"
  },
  {
    id: "nigiri-selection-luxe",
    category: "sashimi",
    title: "Prestige Nigiri Set",
    titleFr: "Assortiment Nigiri Impérial",
    price: 28,
    priceStr: "28 €",
    desc: "Sélection de 6 nigiris d'orfèvre : Wagyu A5 torché, Anguille caramélisée, Saumon ikura, Thon rouge marinée au soja vieilli, Coquille Saint-Jacques d'Erquy et Oursin de Galice (selon arrivage).",
    image: "/assets/I8AGYbzHAG3DaCqU2wYCmWnrFLw.webp",
    badges: ["⭐ Signature Chef"],
    ingredients: ["Riz koshihikari vinaigré rouge", "Wagyu A5", "Unagi", "Saint-Jacques", "Ikura", "Wasabi frais"],
    allergens: ["Poisson", "Crustacés", "Mollusques", "Soja", "Gluten"],
    pieces: "6 nigiris"
  },

  // --- SAKÉS & BOISSONS ---
  {
    id: "sake-dassai-23",
    category: "drinks",
    title: "Dassai 23 Junmai Daiginjo",
    titleFr: "Saké Dassai 23 Junmai Daiginjo",
    price: 32,
    priceStr: "32 € / verre (12cl)",
    desc: "Le summum du saké moderne. Riz Yamada Nishiki poli à 23%, offrant des notes florales aériennes de melon blanc, pêche blanche et une finale d'une pureté cristalline inouïe.",
    image: "/assets/CFQGdIzQBxhDDSuVq7NiPP3wI.webp",
    badges: ["🍶 Saké Légendaire", "Prestige"],
    ingredients: ["Riz Yamada Nishiki poli à 23%", "Eau de source des montagnes de Yamaguchi", "Koji"],
    allergens: [],
    pieces: "Verre 12cl ou Flacon 72cl"
  },
  {
    id: "the-matcha-ceremonie",
    category: "drinks",
    title: "Grand Cru Matcha d'Uji",
    titleFr: "Thé Vert Matcha de Cérémonie d'Uji",
    price: 9,
    priceStr: "9 €",
    desc: "Matcha biologique d'ombrage récolté à la main à Kyoto, battu énergiquement au chasen en bambou selon le rituel ancestral Chanoyu. Texture mousseuse et veloutée aux notes végétales douces.",
    image: "/assets/eN3OMUIE7k3yknjR7LKFRc8TlU.webp",
    badges: ["🍵 Bio Kyoto", "Rituel"],
    ingredients: ["Poudre pure de feuilles de thé tencha d'Uji", "Eau de source minérale"],
    allergens: [],
    pieces: "Bol cérémoniel"
  }
];

export const STORY_CONTENT = {
  headline: "L'Excellence Nippone, l'Élégance Contemporaine",
  subheading: "Née d'une passion inconditionnelle pour la gastronomie nippone, la maison Qitchen a été fondée avec une volonté claire : élever le sushi au rang d'œuvre d'art vivante.",
  paragraphs: [
    "Chaque matin, nos maîtres sushis sélectionnent les plus beaux spécimens auprès de marayeurs engagés dans une pêche durable et locale. Chaque poisson est travaillé avec la minutie de l'Ikejime, garantissant une chair d'une fermeté et d'une pureté gustative sans égal.",
    "Notre riz shari est assaisonné selon une recette jalousement gardée, mariant un vinaigre rouge akazu maturé trois ans en fût de cèdre et du riz Koshihikari sélectionné au Japon. Ce subtil équilibre confère à nos créations une rondeur umami unique en bouche.",
    "Que vous veniez déguster nos makis d'auteur, admirer les gestes millimétrés de nos artisans au comptoir ou partager un moment d'intimité, Qitchen vous convie à un rituel où le temps s'arrête et où chaque bouchée raconte une histoire."
  ],
  commitments: [
    { title: "Pêche Durable & Responsable", desc: "100% de nos poissons sont issus de filières éco-certifiées et de pêche à la ligne respectueuse des fonds marins." },
    { title: "Riz Shari au Vinaigre Rouge Akazu", desc: "Un vinaigre d'exception vieilli 36 mois pour sublimer l'umami naturel des poissons sans sucres artificiels." },
    { title: "Couteaux Forgés à Sakai", desc: "Chaque lame utilisée au comptoir est forgée à la main par les maîtres forgerons historiques d'Osaka." },
    { title: "Légumes Bio & Condiments Rares", desc: "Wasabi frais râpé à la minute, agrumes yuzu du Japon et graines de sésame torréfiées artisanalement." }
  ]
};
