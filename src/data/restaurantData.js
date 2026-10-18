// YŪGEN — Bar à Sushi & Haute Gastronomie Japonaise
// Données culinaires officielles, traductions françaises soignées, prix en Euros, zéro emoji

export const RESTAURANT_INFO = {
  name: "YŪGEN",
  tagline: "L'Art du Sushi Redéfini",
  subtitle: "Où l'artisanat culinaire ancestral rencontre l'élégance moderne. Savourez les sushis les plus raffinés, minutieusement composés pour magnifier votre voyage gastronomique.",
  address: "18 Rue Royale, 75008 Paris",
  phone: "+33 1 42 68 55 00",
  email: "contact@yugen-paris.fr",
  reservationsEmail: "reservation@yugen-paris.fr",
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
    description: "Élu Meilleur Bar à Sushi par nos convives pour la pureté des découpes et la fraîcheur absolue des arrivages.",
    badge: "Choix des Voyageurs"
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
    description: "Une atmosphère intime et feutrée aux accents wabi-sabi qui transcende le repas en une cérémonie des sens.",
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
  { id: "all", label: "Tous nos plats" },
  { id: "maki", label: "Maki" },
  { id: "uramaki", label: "Uramaki" },
  { id: "special", label: "Créations Spéciales" }
];

export const MENU_ITEMS = [
  // --- MAKI (4 plats) ---
  {
    id: "spicy-tuna-maki",
    category: "maki",
    title: "Maki Thon Épicé",
    origTitle: "Spicy Tuna Maki",
    price: 6,
    priceStr: "6 €",
    desc: "Un mélange savoureux de tartare de thon rouge épicé au togarashi, concombre croquant et avocat fondant, délicatement roulé dans une feuille d'algue nori croustillante et un riz vinaigré akazu assaisonné.",
    image: "/assets/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp"
  },
  {
    id: "mango-maki",
    category: "maki",
    title: "Maki Mangue & Crevette Tempura",
    origTitle: "Mango Maki",
    price: 6,
    priceStr: "6 €",
    desc: "Crevette impériale frite en tempura légère, lamelles de concombre frais et pointe de fromage blanc japonais enrobant un cœur d'avocat mûr et de mangue douce, offrant un parfait contraste de textures.",
    image: "/assets/fhMMbGkmrMBjUIswKIN5x3w.webp"
  },
  {
    id: "salmon-maki",
    category: "maki",
    title: "Maki Saumon & Shiitaké",
    origTitle: "Salmon Maki",
    price: 6,
    priceStr: "6 €",
    desc: "Lamelles de saumon Label Rouge d'Écosse, champignons shiitaké braisés au mirin doux et radis daikon mariné, blottis dans un rouleau de riz délicatement saupoudré de graines de sésame grillées.",
    image: "/assets/9kkGOeR8XfJ0bkSq5vagmboso.webp"
  },
  {
    id: "tuna-maki",
    category: "maki",
    title: "Maki Thon & Légumes Croquants",
    origTitle: "Tuna Maki",
    price: 6,
    priceStr: "6 €",
    desc: "Fines découpes de thon rouge de ligne associées à un assortiment vibrant de carottes en julienne, poivrons doux marinés et concombre frais, hermétiquement enserrés dans une feuille de nori de la baie d'Ariake.",
    image: "/assets/obPljpm9PHIdcU8RiJB5Q4qcTBo.webp"
  },

  // --- URAMAKI (7 plats) ---
  {
    id: "volcano-delight",
    category: "uramaki",
    title: "Délice Volcanique",
    origTitle: "Volcano Delight",
    price: 14,
    priceStr: "14 €",
    desc: "Salade de chair de crabe royal onctueuse, avocat et concombre roulés en riz inversé, coiffés d'un tartare de thon épicé, d'un filet de sauce sriracha artisanale et de pépites de tempura croustillantes.",
    image: "/assets/quqbVpcYdgH65rZqF71BSohYQ.webp"
  },
  {
    id: "rainbow-fusion",
    category: "uramaki",
    title: "Fusion Arc-en-Ciel",
    origTitle: "Rainbow Fusion",
    price: 14,
    priceStr: "14 €",
    desc: "Harmonie multicolore de thon rouge frais, saumon d'Écosse, sériole du Pacifique (hamachi) et avocat mûr, drapée autour d'un cœur gourmand de chair de crabe assaisonnée et de bâtonnets de concombre.",
    image: "/assets/05utisiCSaVR87iUNMsXid3Jgs.webp"
  },
  {
    id: "dragon-elegance",
    category: "uramaki",
    title: "Élégance du Dragon",
    origTitle: "Dragon Elegance",
    price: 15,
    priceStr: "15 €",
    desc: "Anguille d'eau douce grillée au feu de bois (unagi) et avocat fondant au cœur du rouleau, recouverts de fines lamelles d'avocat ciselées évoquant les écailles d'un dragon et laqués de sauce tare kabayaki.",
    image: "/assets/Ed2EhaCAbs1wRkDTc5vxXiOczE4.webp"
  },
  {
    id: "sunset-serenity",
    category: "uramaki",
    title: "Sérénité Crépusculaire",
    origTitle: "Sunset Serenity",
    price: 14,
    priceStr: "14 €",
    desc: "Crevette en tempura croustillante, concombre croquant et mayonnaise épicée enlacés dans une feuille de soja naturelle, surmontés de généreuses tranches de mangue fondante et perles d'agrumes.",
    image: "/assets/dewXkdK3qGBrcu5aDMswBstC4c.webp"
  },
  {
    id: "mystic-garden",
    category: "uramaki",
    title: "Jardin Mystique",
    origTitle: "Mystic Garden",
    price: 13,
    priceStr: "13 €",
    desc: "Champignons shiitaké mijotés, pointes d'asperges vertes printanières et concombre croquant mariés à des éclats de tempura dorés, protégés par un élégant manteau de graines de sésame blanc et noir torréfiées.",
    image: "/assets/IioQcyucvy3RI3a1KSX7R95jxO4.webp"
  },
  {
    id: "ocean-breeze",
    category: "uramaki",
    title: "Brise Marine",
    origTitle: "Ocean Breeze",
    price: 14,
    priceStr: "14 €",
    desc: "Mosaïque équilibrée de crevettes sauvages pochées au bouillon dashi, chair de crabe délicate et avocat soyeux, rehaussée d'œufs de poisson volant (tobiko) fraîchement infusés au yuzu acidulé.",
    image: "/assets/KrDf3YKIs1qO70tsAQ00Ws.webp"
  },
  {
    id: "tokyo-blossom",
    category: "uramaki",
    title: "Floraison de Tokyo",
    origTitle: "Tokyo Blossom",
    price: 15,
    priceStr: "15 €",
    desc: "Une feuille de soja rose poudrée aux reflets de fleur de cerisier sakura enveloppant un cœur de thon noble, chair de crabe et concombre, parée de pétales de fleurs comestibles et d'une émulsion ponzu.",
    image: "/assets/cOFzDBu3VcpPMyZrfpoqGTFdA4.webp"
  },

  // --- CRÉATIONS SPÉCIALES (5 plats) ---
  {
    id: "sunrise-bliss",
    category: "special",
    title: "Éclat de l'Aurore",
    origTitle: "Sunrise Bliss",
    price: 18,
    priceStr: "18 €",
    desc: "Alliance délicate de saumon frais de première découpe, fromage frais velouté et asperges vertes tendres, entièrement roulée dans un tobiko orange éclatant pour une explosion de saveurs iodées et solaires.",
    image: "/assets/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp"
  },
  {
    id: "mango-tango",
    category: "special",
    title: "Tango Mangue & Crevette Royale",
    origTitle: "Mango Tango",
    price: 18,
    priceStr: "18 €",
    desc: "Crevettes géantes en tempura croustillante, concombre et avocat dansant avec de savoureuses lamelles de mangue fraîche, nappées d'une réduction maison mangue et fruit de la passion acidulée.",
    image: "/assets/bCZ9FLkc5BuH3LlY2ajVeE5Cb4o.webp"
  },
  {
    id: "truffle-indulgence",
    category: "special",
    title: "Tentation Truffe & Bœuf Wagyu",
    origTitle: "Truffle Indulgence",
    price: 22,
    priceStr: "22 €",
    desc: "Tranches généreuses de truffe noire d'hiver délicatement posées sur un rouleau de bœuf Wagyu A5 de Miyazaki saisi au chalumeau, jeunes pousses et concombre, dans une symphonie umami sans égale.",
    image: "/assets/obWS2NDDG7Rnd4D7xOGDyh4FCA.webp"
  },
  {
    id: "pacific-firecracker",
    category: "special",
    title: "Pétard du Pacifique",
    origTitle: "Pacific Firecracker",
    price: 18,
    priceStr: "18 €",
    desc: "Salade de crabe relevée, crevettes en tempura croustillante et piments jalapeño marinés composant un ensemble intense, souligné d'un aïoli japonais au piment togarashi fumé et flocons de bonite katsuobushi.",
    image: "/assets/rUY8V3p7qMU6d0ymkSDqZWbG4.webp"
  },
  {
    id: "eternal-eel",
    category: "special",
    title: "Anguille Éternelle & Feuilles d'Or",
    origTitle: "Eternal Eel",
    price: 24,
    priceStr: "24 €",
    desc: "Création d'orfèvre alliant tempura d'anguille d'eau douce laquée, médaillon de foie gras poêlé à la minute et concombre croquant, sublimée par un trait d'huile de truffe blanche et feuilles d'or 24 carats comestibles.",
    image: "/assets/zoCG6siF05pS2bpapbv0gEtdPqE.webp"
  }
];

export const STORY_CONTENT = {
  headline: "L'Excellence Nippone, l'Élégance Contemporaine",
  subheading: "Née d'une passion inconditionnelle pour la gastronomie nippone, la maison YŪGEN a été fondée avec une volonté claire : élever le sushi au rang d'œuvre d'art vivante.",
  paragraphs: [
    "Chaque matin, nos maîtres sushis sélectionnent les plus beaux spécimens auprès de marayeurs engagés dans une pêche durable et locale. Chaque poisson est travaillé avec la minutie de l'Ikejime, garantissant une chair d'une fermeté et d'une pureté gustative sans égal.",
    "Notre riz shari est assaisonné selon une recette jalousement gardée, mariant un vinaigre rouge akazu maturé trois ans en fût de cèdre et du riz Koshihikari sélectionné au Japon. Ce subtil équilibre confère à nos créations une rondeur umami unique en bouche.",
    "Que vous veniez admirer les gestes millimétrés de nos artisans au comptoir ou partager un moment d'intimité, YŪGEN vous convie à un rituel où le temps s'arrête et où chaque bouchée raconte une histoire."
  ],
  commitments: [
    { title: "Pêche Durable & Responsable", desc: "100% de nos poissons sont issus de filières éco-certifiées et de pêche à la ligne respectueuse des fonds marins." },
    { title: "Riz Shari au Vinaigre Rouge Akazu", desc: "Un vinaigre d'exception vieilli 36 mois pour sublimer l'umami naturel des poissons sans sucres artificiels." },
    { title: "Couteaux Forgés à Sakai", desc: "Chaque lame utilisée au comptoir est forgée à la main par les maîtres forgerons historiques d'Osaka." },
    { title: "Légumes Bio & Condiments Rares", desc: "Wasabi frais râpé à la minute, agrumes yuzu du Japon et graines de sésame torréfiées artisanalement." }
  ]
};
