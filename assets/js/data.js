/* ============================================================
   Le Stère Français – configuration & catalogue
   Modifiez ce fichier pour changer les coordonnées et les produits.
   ============================================================ */

const CONFIG = {
  brand: "Le Stère Français",
  tagline: "Bois de chauffage & granulés livrés chez vous",
  whatsapp: "33743047511",            // format international sans "+" ni espaces
  phoneDisplay: "+33 7 43 04 75 11",
  email: "",                          // à compléter (laisser vide pour masquer)
  address: "",                        // à compléter
  hours: "Lundi – Samedi, 8h – 19h"
};

const CATEGORIES = [
  { id: "bois",        name: "Bois de chauffage", desc: "Bûches de feuillus durs, en palette ou en vrac.",
    imgs: ["assets/img/photos/cat-bois.jpg"] },
  { id: "granules",    name: "Granulés de bois",  desc: "Pellets certifiés pour poêles et chaudières.",
    imgs: ["assets/img/photos/cat-granules.jpg"] },
  { id: "densifie",    name: "Bois densifié",     desc: "Bûches compressées à haut rendement, jour et nuit.",
    imgs: ["assets/img/photos/cat-densifie.jpg"] },
  { id: "allumage",    name: "Allumage",          desc: "Petit bois et allume-feux naturels.",
    imgs: ["assets/img/photos/cat-allumage.jpg"] },
  { id: "accessoires", name: "Accessoires",       desc: "Tout pour entretenir et profiter de votre feu.",
    imgs: ["assets/img/photos/cat-accessoires.jpg"] }
];

/* Prix TTC en euros, livraison gratuite incluse. featured : affiché sur la page d'accueil.
   img (facultatif) : photo propre au produit, ex. img: "assets/img/photos/ma-photo.jpg".
   Sans img, une photo de la catégorie est utilisée. */
const PRODUCTS = [
  /* ---------- Bois de chauffage ---------- */
  {
    id: "chene-hetre-33-1st", cat: "bois", featured: true, badge: "Best-seller",
    img: "assets/img/photos/chene-hetre-33-1st.jpg",
    name: "Bûches chêne & hêtre – 33 cm", unit: "Palette 1 stère", price: 135,
    desc: "Mélange de chêne et de hêtre fendu, séché pour un feu vif et durable. Idéal pour poêles et inserts.",
    specs: ["Longueur : 33 cm", "Humidité : < 20 %", "Essences : chêne, hêtre", "Palette filmée"]
  },
  {
    id: "chene-hetre-33-2st", cat: "bois",
    img: "assets/img/photos/chene-hetre-33-2st.jpg",
    name: "Bûches chêne & hêtre – 33 cm", unit: "Palette 2 stères", price: 255,
    desc: "Le même mélange de feuillus durs en grande palette, pour couvrir une bonne partie de l'hiver.",
    specs: ["Longueur : 33 cm", "Humidité : < 20 %", "Essences : chêne, hêtre", "Volume : 2 stères"]
  },
  {
    id: "chene-hetre-33-4st", cat: "bois", badge: "Lot hiver",
    img: "assets/img/photos/chene-hetre-33-4st.jpg",
    name: "Bûches chêne & hêtre – 33 cm", unit: "Lot 2 palettes (4 stères)", price: 489,
    desc: "Deux palettes de 2 stères livrées ensemble : la réserve complète pour l'hiver, à tarif dégressif.",
    specs: ["Longueur : 33 cm", "Humidité : < 20 %", "2 palettes de 2 stères", "Livraison avec hayon"]
  },
  {
    id: "chene-40-2st", cat: "bois",
    img: "assets/img/photos/chene-40-2st.jpg",
    name: "Bûches 100 % chêne – 40 cm", unit: "Palette 2 stères", price: 265,
    desc: "Chêne pur à combustion lente, très apprécié pour les grands poêles et les inserts profonds.",
    specs: ["Longueur : 40 cm", "Humidité : < 20 %", "Essence : chêne", "Volume : 2 stères"]
  },
  {
    id: "hetre-25-1-5st", cat: "bois",
    img: "assets/img/photos/hetre-25-1-5st.jpg",
    name: "Bûches 100 % hêtre – 25 cm", unit: "Palette 1,5 stère", price: 185,
    desc: "Bûches courtes pour petits poêles et cuisinières à bois. Allumage facile, flamme claire.",
    specs: ["Longueur : 25 cm", "Humidité : < 20 %", "Essence : hêtre", "Palette filmée"]
  },
  {
    id: "charme-50-vrac", cat: "bois",
    img: "assets/img/photos/charme-50-vrac.jpg",
    name: "Bûches charme – 50 cm en vrac", unit: "3 stères", price: 285,
    desc: "Charme dense et régulier, livré en vrac. Parfait pour cheminées ouvertes et grands foyers.",
    specs: ["Longueur : 50 cm", "Humidité : < 20 %", "Essence : charme", "Livraison : benne basculante"]
  },
  {
    id: "feuillus-33-vrac", cat: "bois",
    img: "assets/img/photos/feuillus-33-vrac.jpg",
    name: "Feuillus mélangés – 33 cm en vrac", unit: "3 stères", price: 315,
    desc: "Chêne, hêtre et charme recoupés en 33 cm, livrés en vrac à l'endroit de votre choix.",
    specs: ["Longueur : 33 cm", "Humidité : < 20 %", "Essences : chêne, hêtre, charme", "Livraison : benne basculante"]
  },
  {
    id: "feuillus-1m", cat: "bois",
    img: "assets/img/photos/feuillus-1m.jpg",
    name: "Feuillus durs – 1 mètre", unit: "Palette 2 stères", price: 195,
    desc: "Bois en 1 m à recouper vous-même : la solution la plus économique pour les bricoleurs.",
    specs: ["Longueur : 1 m", "Humidité : < 25 %", "Essences : feuillus durs", "Volume : 2 stères"]
  },
  {
    id: "bois-sechoir-33", cat: "bois", badge: "Prêt à brûler",
    img: "assets/img/photos/bois-sechoir-33.jpg",
    name: "Bois séché au séchoir – 33 cm", unit: "Palette 1,8 m³", price: 295,
    desc: "Bûches séchées artificiellement, à moins de 15 % d'humidité : rendement maximal dès la livraison.",
    specs: ["Longueur : 33 cm", "Humidité : < 15 %", "Essences : feuillus durs", "Volume : 1,8 m³ apparent"]
  },

  /* ---------- Granulés ---------- */
  {
    id: "granules-sac", cat: "granules",
    img: "assets/img/photos/granules-sac.jpg",
    name: "Granulés de bois résineux", unit: "Sac de 15 kg", price: 7.9,
    desc: "Granulés 100 % résineux, faible taux de cendres, pour un fonctionnement propre de votre poêle.",
    specs: ["Diamètre : 6 mm", "Certification : ENplus A1", "Cendres : < 0,7 %", "Poids : 15 kg"]
  },
  {
    id: "granules-demi", cat: "granules",
    img: "assets/img/photos/granules-demi.jpg",
    name: "Granulés de bois résineux", unit: "1/2 palette 33 sacs (495 kg)", price: 239,
    desc: "Le format pratique pour un petit espace de stockage ou une utilisation d'appoint.",
    specs: ["33 sacs de 15 kg", "Certification : ENplus A1", "Diamètre : 6 mm", "Livraison avec hayon"]
  },
  {
    id: "granules-palette", cat: "granules", featured: true, badge: "Saison",
    img: "assets/img/photos/granules-palette.jpg",
    name: "Granulés de bois résineux", unit: "Palette 66 sacs (990 kg)", price: 449,
    desc: "La palette complète pour l'hiver. Granulés certifiés, stockage facile dans un garage ou un abri.",
    specs: ["66 sacs de 15 kg", "Certification : ENplus A1", "Pouvoir calorifique : ~4,9 kWh/kg", "Livraison avec hayon"]
  },
  {
    id: "granules-feuillus", cat: "granules",
    img: "assets/img/photos/granules-feuillus.jpg",
    name: "Granulés feuillus & résineux", unit: "Palette 70 sacs (1 050 kg)", price: 465,
    desc: "Mélange équilibré pour une combustion longue. Adapté à la plupart des poêles et chaudières à granulés.",
    specs: ["70 sacs de 15 kg", "Certification : DINplus", "Diamètre : 6 mm", "Livraison avec hayon"]
  },
  {
    id: "granules-premium", cat: "granules",
    img: "assets/img/photos/granules-premium.jpg",
    name: "Granulés Premium France", unit: "Palette 66 sacs (990 kg)", price: 489,
    desc: "Granulés fabriqués en France à partir de sciure de résineux, très faible taux de cendres.",
    specs: ["66 sacs de 15 kg", "Certification : ENplus A1", "Cendres : < 0,5 %", "Origine : France"]
  },
  {
    id: "granules-2-palettes", cat: "granules", badge: "Lot hiver",
    img: "assets/img/photos/granules-2-palettes.jpg",
    name: "Granulés de bois résineux – lot", unit: "2 palettes (1 980 kg)", price: 879,
    desc: "Deux palettes livrées ensemble pour passer tout l'hiver sereinement, à tarif dégressif.",
    specs: ["132 sacs de 15 kg", "Certification : ENplus A1", "2 palettes", "Livraison avec hayon"]
  },
  {
    id: "granules-vrac", cat: "granules",
    img: "assets/img/photos/granules-vrac.jpg",
    name: "Granulés en vrac (soufflés)", unit: "La tonne – min. 2 t", price: 415,
    desc: "Livraison par camion souffleur directement dans votre silo. Tarif à la tonne.",
    specs: ["Minimum : 2 tonnes", "Certification : ENplus A1", "Livraison : camion souffleur", "Accès camion requis"]
  },

  /* ---------- Bois densifié ---------- */
  {
    id: "densifie-jour", cat: "densifie", featured: true,
    img: "assets/img/photos/densifie-jour.jpg",
    name: "Bûches densifiées de jour", unit: "Palette 960 kg", price: 365,
    desc: "Bûches compressées sans liant, à forte chaleur rapide. Moins de place de stockage qu'un bois classique.",
    specs: ["Humidité : < 10 %", "Sans colle ni additif", "Pouvoir calorifique : ~5 kWh/kg", "Paquets de 10 kg"]
  },
  {
    id: "densifie-demi", cat: "densifie",
    img: "assets/img/photos/densifie-demi.jpg",
    name: "Bûches densifiées de jour", unit: "1/2 palette 480 kg", price: 195,
    desc: "Le format découverte pour tester le bois densifié dans votre appareil.",
    specs: ["Humidité : < 10 %", "Sans colle ni additif", "Paquets de 10 kg", "Livraison avec hayon"]
  },
  {
    id: "densifie-nuit", cat: "densifie",
    img: "assets/img/photos/densifie-nuit.jpg",
    name: "Bûches densifiées de nuit", unit: "Palette 960 kg", price: 385,
    desc: "Combustion lente pour maintenir la chaleur toute la nuit. Idéales en complément du bois de jour.",
    specs: ["Combustion : jusqu'à 8 h", "Humidité : < 10 %", "Sans additif", "Paquets de 10 kg"]
  },
  {
    id: "densifie-nuit-demi", cat: "densifie",
    img: "assets/img/photos/densifie-nuit-demi.jpg",
    name: "Bûches densifiées de nuit", unit: "1/2 palette 480 kg", price: 205,
    desc: "Une demi-palette de bûches de nuit pour garder la maison au chaud jusqu'au matin.",
    specs: ["Combustion : jusqu'à 8 h", "Humidité : < 10 %", "Sans additif", "Paquets de 10 kg"]
  },
  {
    id: "densifie-feuillus", cat: "densifie",
    img: "assets/img/photos/densifie-feuillus.jpg",
    name: "Bûches densifiées 100 % feuillus", unit: "Palette 960 kg", price: 395,
    desc: "Fabriquées uniquement à partir de sciure de feuillus : flamme longue et très peu de cendres.",
    specs: ["Essences : feuillus", "Humidité : < 8 %", "Cendres : < 1 %", "Paquets de 12 kg"]
  },
  {
    id: "briquettes", cat: "densifie",
    img: "assets/img/photos/briquettes.jpg",
    name: "Briquettes de bois compressé", unit: "Palette 960 kg", price: 345,
    desc: "Briquettes rectangulaires faciles à empiler, pour un feu régulier et propre.",
    specs: ["Humidité : < 10 %", "Essences : feuillus", "Paquets de 10 kg", "Faible taux de cendres"]
  },
  {
    id: "mix-jour-nuit", cat: "densifie", badge: "Mix",
    img: "assets/img/photos/mix-jour-nuit.jpg",
    name: "Pack densifié jour + nuit", unit: "Palette 960 kg (50/50)", price: 375,
    desc: "Moitié bûches de jour, moitié bûches de nuit : le bon équilibre pour un chauffage continu.",
    specs: ["480 kg jour + 480 kg nuit", "Humidité : < 10 %", "Sans additif", "Paquets de 10 kg"]
  },

  /* ---------- Allumage ---------- */
  {
    id: "petit-bois", cat: "allumage", featured: true,
    img: "assets/img/photos/petit-bois.jpg",
    name: "Petit bois d'allumage", unit: "Sac de 30 L", price: 12,
    desc: "Bois tendre sec et fin pour démarrer vos feux en quelques secondes.",
    specs: ["Essence : résineux", "Calibre : 2–3 cm", "Volume : 30 litres", "Séché au four"]
  },
  {
    id: "petit-bois-lot", cat: "allumage",
    img: "assets/img/photos/petit-bois-lot.jpg",
    name: "Petit bois d'allumage – lot", unit: "10 sacs de 30 L", price: 99,
    desc: "Le lot pour toute la saison, à un tarif avantageux.",
    specs: ["10 sacs de 30 L", "Essence : résineux", "Séché au four", "Livré sur palette"]
  },
  {
    id: "allume-feux", cat: "allumage",
    img: "assets/img/photos/allume-feux.jpg",
    name: "Allume-feux naturels", unit: "Boîte de 100", price: 14.9,
    desc: "Laine de bois et cire végétale. Sans odeur, sans produit pétrolier.",
    specs: ["100 allume-feux", "Laine de bois + cire", "Durée : ~8 min", "Sans odeur"]
  },
  {
    id: "allume-feux-cubes", cat: "allumage",
    img: "assets/img/photos/allume-feux-cubes.jpg",
    name: "Cubes allume-feu écologiques", unit: "Lot de 3 × 32 cubes", price: 9.9,
    desc: "Cubes à base de fibres de bois, pratiques pour barbecues, poêles et cheminées.",
    specs: ["96 cubes", "Fibres de bois", "Sans odeur", "Usage intérieur et extérieur"]
  },

  /* ---------- Accessoires ---------- */
  {
    id: "humidimetre", cat: "accessoires",
    img: "assets/img/photos/humidimetre.jpg",
    name: "Humidimètre pour bois", unit: "Appareil numérique", price: 24.9,
    desc: "Mesurez en 2 secondes l'humidité de vos bûches pour brûler uniquement du bois sec.",
    specs: ["Plage : 5 – 50 %", "Écran LCD", "Piles fournies", "Pointes en acier"]
  },
  {
    id: "seau-cendres", cat: "accessoires",
    img: "assets/img/photos/seau-cendres.jpg",
    name: "Seau à cendres avec couvercle", unit: "18 litres", price: 29.9,
    desc: "Seau en acier galvanisé avec couvercle, pour stocker les cendres en toute sécurité.",
    specs: ["Volume : 18 L", "Acier galvanisé", "Couvercle et poignée", "Double fond"]
  },
  {
    id: "buche-ramonage", cat: "accessoires",
    img: "assets/img/photos/buche-ramonage.jpg",
    name: "Bûche de ramonage", unit: "1 bûche", price: 12.9,
    desc: "Aide à l'entretien du conduit entre deux ramonages mécaniques. Ne remplace pas le ramonage obligatoire.",
    specs: ["Pour poêles et cheminées", "Durée : ~90 min", "Utilisation : 1 fois / mois", "Sans danger pour l'appareil"]
  },
  {
    id: "gants", cat: "accessoires",
    img: "assets/img/photos/gants.jpg",
    name: "Gants anti-chaleur", unit: "La paire", price: 19.9,
    desc: "Gants en cuir doublé pour manipuler les bûches et les accessoires de foyer sans vous brûler.",
    specs: ["Cuir de croûte", "Résistance : jusqu'à 250 °C", "Taille unique", "Manchette longue"]
  }
];
