export interface NutritionItem {
  label: string;
  amount: string;
  dailyValue?: string;
  isIndent?: boolean;
  isBold?: boolean;
}

export interface ProductDetails {
  slug: string;
  id: string;
  numericId: number;
  variantIds: {
    single: number;
    trio: number;
    party: number;
  };
  name: string;
  badge: string;
  emoji: string;
  tagline: string;
  shortDesc: string;
  flavorProfile: {
    crunch: number; // out of 5
    spice: number; // out of 5
    tangy: number; // out of 5
    cheesiness: number; // out of 5
  };
  keyBenefits: string[];
  themeColor: string;
  accentBg: string;
  gradient: string;
  packImage: string;
  frontImage?: string;
  backImage?: string;
  galleryImages: string[];
  bgSvg: string;
  bgMobileSvg?: string;
  accentColor: string;
  servingSize: string;
  nutritionTitle?: string;
  nutritionColumn1?: string;
  nutritionColumn2?: string;
  ingredients: string;
  allergen: string;
  disclaimer: string;
  borderAccentColor: string; // matches the packaging nutrition label border
  nutrition: NutritionItem[];
  pricing: {
    single: { label: string; count: string; price: number; originalPrice: number; badge?: string };
    trio: { label: string; count: string; price: number; originalPrice: number; badge?: string };
    party: { label: string; count: string; price: number; originalPrice: number; badge?: string };
  };
  faqs: { q: string; a: string }[];
  reviews: { name: string; rating: number; title: string; comment: string; date: string }[];
}

export interface ComboItem {
  slug: string;
  id: string;
  numericId: number;
  variantId: number;
  name: string;
  badge: string;
  emoji: string;
  tagline: string;
  shortDesc: string;
  packImage: string;
  frontImage?: string;
  backImage?: string;
  galleryImages?: string[];
  secondaryImage?: string;
  bgSvg?: string;
  bgMobileSvg?: string;
  includedFlavours: string[];
  themeColor: string;
  accentBg: string;
  price: number;
  originalPrice: number;
  savingsBadge?: string;
  rating: number;
  reviewsCount: number;
  packCountText: string;
  isBestSeller?: boolean;
}

export const COMBOS: Record<string, ComboItem> = {
  "all-4-flavours-box": {
    slug: "all-4-flavours-box",
    id: "combo-all-4",
    numericId: 100004,
    variantId: 10000401,
    name: "ALL 4 FLAVOURS DISCOVERY BOX",
    badge: "🎁 ALL 4 FLAVOURS (4 PACKS)",
    emoji: "🎁",
    tagline: "1 × Cheddar Cheese + 1 × Peri Peri + 1 × Cream & Onion + 1 × Pink Salt",
    shortDesc:
      "Taste the full Pop Culture universe! One pouch of every single signature roasted flavour in one discovery crate. The ultimate crunch tasting kit.",
    packImage: "/packets/peri-peri.png",
    frontImage: "/packaging/peri-peri-front.jpg",
    backImage: "/packaging/peri-peri-back.jpg",
    galleryImages: [
      "/packets/peri-peri.png",
      "/packets/cheddar-cheese.png",
      "/packets/cream-n-onion.png",
      "/packets/himalayan-salt.png",
      "/packaging/peri-peri-front.jpg",
      "/packaging/cheddar-cheese-front.jpg",
      "/packaging/cream-and-onion-front.jpg",
      "/packaging/pink-salt-front.jpg",
    ],
    secondaryImage: "/packets/cheddar-cheese.png",
    bgSvg: "/product-bg/peri-peri.webp",
    bgMobileSvg: "/product-bg/mobile-peri-peri.webp",
    includedFlavours: [
      "1 × Peri Peri Punch (55g)",
      "1 × Cheddar Cheese Melt (55g)",
      "1 × Cream & Onion (55g)",
      "1 × Himalayan Pink Salt (55g)",
    ],
    themeColor: "#D73B3A",
    accentBg: "#ED0006",
    price: 596,
    originalPrice: 596,
    savingsBadge: "",
    rating: 4.9,
    reviewsCount: 342,
    packCountText: "4 × 55g Pouches (220g)",
    isBestSeller: true,
  },
  "bestseller-crunch-bundle": {
    slug: "bestseller-crunch-bundle",
    id: "combo-bestseller",
    numericId: 100005,
    variantId: 10000501,
    name: "BESTSELLER CRUNCH BUNDLE",
    badge: "⭐ TOP RATED (6 PACKS)",
    emoji: "⭐",
    tagline: "2 × Cheddar Cheese + 2 × Peri Peri + 1 × Cream & Onion + 1 × Pink Salt",
    shortDesc:
      "Stock up on our most loved flavours! Double portions of velvety Cheddar Cheese and fiery Peri Peri, complemented with Cream & Onion and Pink Salt. FREE express shipping included.",
    packImage: "/packets/cheddar-cheese.png",
    frontImage: "/packaging/cheddar-cheese-front.jpg",
    backImage: "/packaging/cheddar-cheese-back.jpg",
    galleryImages: [
      "/packets/cheddar-cheese.png",
      "/packets/peri-peri.png",
      "/packets/cream-n-onion.png",
      "/packets/himalayan-salt.png",
      "/packaging/cheddar-cheese-front.jpg",
      "/packaging/peri-peri-front.jpg",
      "/packaging/cream-and-onion-front.jpg",
      "/packaging/pink-salt-front.jpg",
    ],
    secondaryImage: "/packets/peri-peri.png",
    bgSvg: "/product-bg/cheese.webp",
    bgMobileSvg: "/product-bg/mobile-cheese.webp",
    includedFlavours: [
      "2 × Cheddar Cheese Melt (55g)",
      "2 × Peri Peri Punch (55g)",
      "1 × Cream & Onion (55g)",
      "1 × Himalayan Pink Salt (55g)",
    ],
    themeColor: "#FAC537",
    accentBg: "#F79E1B",
    price: 894,
    originalPrice: 894,
    savingsBadge: "FREE SHIPPING",
    rating: 5.0,
    reviewsCount: 218,
    packCountText: "6 × 55g Pouches (330g)",
    isBestSeller: true,
  },
  "cheese-and-spice-fiesta": {
    slug: "cheese-and-spice-fiesta",
    id: "combo-fiesta",
    numericId: 100009,
    variantId: 10000901,
    name: "CHEESE & SPICE FIESTA",
    badge: "🔥 PARTY BUNDLE (8 PACKS)",
    emoji: "🔥",
    tagline: "4 × Cheddar Cheese Melt + 4 × Peri Peri Punch",
    shortDesc:
      "The ultimate snack duel: velvety, aged cheddar cheese meets sizzling African peri-peri. 8 party-ready pouches perfect for gaming nights, movie marathons, and binge-watching.",
    packImage: "/packets/cheddar-cheese.png",
    frontImage: "/packaging/cheddar-cheese-front.jpg",
    backImage: "/packaging/cheddar-cheese-back.jpg",
    galleryImages: [
      "/packets/cheddar-cheese.png",
      "/packets/peri-peri.png",
      "/packaging/cheddar-cheese-front.jpg",
      "/packaging/peri-peri-front.jpg",
      "/packaging/cheddar-cheese-back.jpg",
      "/packaging/peri-peri-back.jpg",
    ],
    secondaryImage: "/packets/peri-peri.png",
    bgSvg: "/product-bg/cheese.webp",
    bgMobileSvg: "/product-bg/mobile-cheese.webp",
    includedFlavours: [
      "4 × Cheddar Cheese Melt (55g)",
      "4 × Peri Peri Punch (55g)",
    ],
    themeColor: "#ED0006",
    accentBg: "#FAC537",
    price: 1192,
    originalPrice: 1192,
    savingsBadge: "FREE SHIPPING",
    rating: 4.9,
    reviewsCount: 165,
    packCountText: "8 × 55g Pouches (440g)",
    isBestSeller: false,
  },
  "mega-crunch-party-stash": {
    slug: "mega-crunch-party-stash",
    id: "combo-mega",
    numericId: 100006,
    variantId: 10000601,
    name: "MEGA CRUNCH PARTY STASH",
    badge: "⚡ MEGA STASH (12 PACKS)",
    emoji: "⚡",
    tagline: "3 × Cheddar Cheese + 3 × Peri Peri + 3 × Cream & Onion + 3 × Pink Salt",
    shortDesc:
      "The heavyweight pantry stash for offices, families, and serious snackers. 3 jumbo pouches of every roasted flavour. Maximum variety, ultimate crunch, and free priority delivery.",
    packImage: "/packets/himalayan-salt.png",
    frontImage: "/packaging/pink-salt-front.jpg",
    backImage: "/packaging/pink-salt-back.jpg",
    galleryImages: [
      "/packets/himalayan-salt.png",
      "/packets/cheddar-cheese.png",
      "/packets/peri-peri.png",
      "/packets/cream-n-onion.png",
      "/packaging/pink-salt-front.jpg",
      "/packaging/cheddar-cheese-front.jpg",
      "/packaging/peri-peri-front.jpg",
      "/packaging/cream-and-onion-front.jpg",
    ],
    secondaryImage: "/packets/cream-n-onion.png",
    bgSvg: "/product-bg/pink-salt.webp",
    bgMobileSvg: "/product-bg/mobile-pink-salt.webp",
    includedFlavours: [
      "3 × Peri Peri Punch (55g)",
      "3 × Cheddar Cheese Melt (55g)",
      "3 × Cream & Onion (55g)",
      "3 × Himalayan Pink Salt (55g)",
    ],
    themeColor: "#8B1E3F",
    accentBg: "#3CA837",
    price: 1788,
    originalPrice: 1788,
    savingsBadge: "BEST VALUE",
    rating: 4.9,
    reviewsCount: 142,
    packCountText: "12 × 55g Pouches (660g)",
    isBestSeller: false,
  },
  // Backward compatibility aliases
  "ultimate-trio-pack": {
    slug: "all-4-flavours-box",
    id: "combo-all-4-legacy",
    numericId: 100004,
    variantId: 10000401,
    name: "ALL 4 FLAVOURS DISCOVERY BOX",
    badge: "🎁 ALL 4 FLAVOURS (4 PACKS)",
    emoji: "🎁",
    tagline: "1 × Cheddar Cheese + 1 × Peri Peri + 1 × Cream & Onion + 1 × Pink Salt",
    shortDesc:
      "Taste the full Pop Culture universe! One pouch of every single signature roasted flavour in one discovery crate.",
    packImage: "/packets/peri-peri.png",
    includedFlavours: [
      "1 × Peri Peri Punch (55g)",
      "1 × Cheddar Cheese Melt (55g)",
      "1 × Cream & Onion (55g)",
      "1 × Himalayan Pink Salt (55g)",
    ],
    themeColor: "#D73B3A",
    accentBg: "#ED0006",
    price: 596,
    originalPrice: 596,
    rating: 4.9,
    reviewsCount: 342,
    packCountText: "4 × 55g Pouches (220g)",
    isBestSeller: true,
  },
  "party-crunch-box": {
    slug: "bestseller-crunch-bundle",
    id: "combo-bestseller-legacy",
    numericId: 100005,
    variantId: 10000501,
    name: "BESTSELLER CRUNCH BUNDLE",
    badge: "⭐ TOP RATED (6 PACKS)",
    emoji: "⭐",
    tagline: "2 × Cheddar Cheese + 2 × Peri Peri + 1 × Cream & Onion + 1 × Pink Salt",
    shortDesc:
      "Double up on our fan favourites: 2 Cheddar Cheese, 2 Peri Peri, plus Cream & Onion and Pink Salt.",
    packImage: "/packets/cheddar-cheese.png",
    includedFlavours: [
      "2 × Cheddar Cheese Melt (55g)",
      "2 × Peri Peri Punch (55g)",
      "1 × Cream & Onion (55g)",
      "1 × Himalayan Pink Salt (55g)",
    ],
    themeColor: "#FAC537",
    accentBg: "#F79E1B",
    price: 894,
    originalPrice: 894,
    rating: 5.0,
    reviewsCount: 218,
    packCountText: "6 × 55g Pouches (330g)",
  },
  "mega-muncher-stash": {
    slug: "mega-crunch-party-stash",
    id: "combo-mega-legacy",
    numericId: 100006,
    variantId: 10000601,
    name: "MEGA CRUNCH PARTY STASH",
    badge: "⚡ MEGA STASH (12 PACKS)",
    emoji: "⚡",
    tagline: "3 × Cheddar Cheese + 3 × Peri Peri + 3 × Cream & Onion + 3 × Pink Salt",
    shortDesc:
      "The heavyweight pantry stash for offices, families, and serious snackers.",
    packImage: "/packets/himalayan-salt.png",
    includedFlavours: [
      "3 × Peri Peri Punch (55g)",
      "3 × Cheddar Cheese Melt (55g)",
      "3 × Cream & Onion (55g)",
      "3 × Himalayan Pink Salt (55g)",
    ],
    themeColor: "#8B1E3F",
    accentBg: "#3CA837",
    price: 1788,
    originalPrice: 1788,
    rating: 4.9,
    reviewsCount: 142,
    packCountText: "12 × 55g Pouches (660g)",
  },
};

export const PRODUCTS: Record<string, ProductDetails> = {
  "peri-peri": {
    slug: "peri-peri",
    id: "periperi",
    numericId: 100001,
    variantIds: { single: 10000101, trio: 10000102, party: 10000103 },
    name: "PERI PERI",
    badge: "🌶️ PERI PERI",
    emoji: "🌶️",
    tagline: "Fiery, Tangy & Irresistibly Crunchy",
    shortDesc:
      "Sun-ripened red chillies, aromatic dried garlic, and authentic African peri-peri zest slow-tossed over jumbo handpicked foxnuts. A bold kick that explodes with every crunch.",
    flavorProfile: {
      crunch: 5,
      spice: 4,
      tangy: 5,
      cheesiness: 0,
    },
    keyBenefits: [
      "Slow-Roasted, Never Fried",
      "Rich in Plant Protein & Fibre",
      "Zero Cholesterol & 0g Trans Fat",
      "Authentic Peri Peri Spices",
    ],
    themeColor: "#D73B3A", // Scarlet Rush
    accentBg: "#ED0006", // Accent Vibrant Red
    gradient: "from-[#D73B3A] via-[#ED0006] to-[#522C28]",
    packImage: "/packets/peri-peri.png",
    frontImage: "/packaging/peri-peri-front.jpg",
    backImage: "/packaging/peri-peri-back.jpg",
    galleryImages: [
      "/packets/peri-peri.png",
      "/packets/cheddar-cheese.png",
      "/packets/cream-n-onion.png",
      "/packets/himalayan-salt.png",
      "/packaging/peri-peri-front.jpg",
      "/packaging/cheddar-cheese-front.jpg",
      "/packaging/cream-and-onion-front.jpg",
      "/packaging/pink-salt-front.jpg",
    ],
    bgSvg: "/product-bg/peri-peri.webp",
    bgMobileSvg: "/product-bg/mobile-peri-peri.webp",
    accentColor: "#FAC537", // Accent Warm Yellow
    servingSize: "20g",
    borderAccentColor: "#FF5B00", // Vibrant Orange as seen in packaging
    nutritionTitle: "NUTRITIONAL FACTS",
    nutritionColumn1: "Amount per 100g*",
    nutritionColumn2: "%Daily Value**",
    ingredients:
      "Foxnut (Makhana) , Edible Vegetable Oil (Rice Bran Oil, Olive Oil), Peri Peri Seasoning [Iodized Salt, Sugar, Black Salt, Acidity Regulators (INS 330, INS 262),Spices & Condiments (Red Chilli, Turmeric, Black Pepper, Cumin, Dried Garlic Powder,Dried Onion Powder), Maltodextrin, Flavour Enhancer (INS 621), Natural Colour (INS160c), Anticaking Agent (INS 551)]. CONTAINS ADDED FLAVOURS (NATURAL & NATURE IDENTICAL).",
    allergen: "ALLERGEN: MAY CONTAIN NUTS.",
    disclaimer:
      "*%RDA Values Are Based On A 2000 Kcal Diet As Per Fssai Guidelines. Actual Needs May Vary Based On Individual Dietary Requirements.",
    nutrition: [
      { label: "Energy", amount: "512 kcal", dailyValue: "4.80%", isBold: true },
      { label: "Protein", amount: "10g", dailyValue: "-", isBold: true },
      { label: "Carbohydrates", amount: "70g", dailyValue: "-", isBold: true },
      { label: "Total Sugar", amount: "5g", dailyValue: "-", isIndent: true },
      { label: "Dietary Fibre", amount: "3g", dailyValue: "-", isIndent: true },
      { label: "Total Fat", amount: "20g", dailyValue: "6.60%", isBold: true },
      { label: "Saturated Fat", amount: "4g", dailyValue: "4.0%", isIndent: true },
      { label: "M.U.F.A", amount: "10g", dailyValue: "-", isIndent: true },
      { label: "P.U.F.A", amount: "7g", dailyValue: "-", isIndent: true },
      { label: "Trans Fat", amount: "0g", dailyValue: "-", isBold: true },
      { label: "Cholesterol", amount: "1mg", dailyValue: "-", isBold: true },
      { label: "Sodium", amount: "600mg", dailyValue: "6.0%", isBold: true },
    ],
    pricing: {
      single: { label: "Pack of 4 (4pcs)", count: "4 × 55g Pouches (220g)", price: 596, originalPrice: 596, badge: "MIN. 4 PACKS" },
      trio: { label: "Pack of 8 (8pcs)", count: "8 × 55g Pouches (440g)", price: 1192, originalPrice: 1192, badge: "POPULAR" },
      party: { label: "Party Box (12pcs)", count: "12 × 55g Pouches (660g)", price: 1788, originalPrice: 1788, badge: "BEST VALUE" },
    },
    faqs: [
      {
        q: "How spicy is Peri Peri?",
        a: "It has a medium-high zesty punch! The heat is balanced with tangy lime notes and aromatic garlic so it's addictively snackable.",
      },
      {
        q: "Is this fried or roasted?",
        a: "100% slow-roasted in small batches. We never deep-fry our foxnuts.",
      },
      {
        q: "What is the shelf life?",
        a: "Pop Culture Makhana stays fresh and ultra-crunchy for 9 months from the date of manufacture.",
      },
    ],
    reviews: [
      {
        name: "Aakash V.",
        rating: 5,
        title: "Best evening work snack!",
        comment: "The peri peri spice hits just right without being overwhelmingly hot. Super crunchy!",
        date: "2 days ago",
      },
      {
        name: "Sneha R.",
        rating: 5,
        title: "Replaced my potato chips",
        comment: "Finally a healthy guilt-free snack that actually tastes exciting. Love the bold flavor.",
        date: "1 week ago",
      },
    ],
  },

  "cheddar-cheese": {
    slug: "cheddar-cheese",
    id: "cheddar",
    numericId: 100002,
    variantIds: { single: 10000201, trio: 10000202, party: 10000203 },
    name: "CHEDDAR CHEESE",
    badge: "🧀 CHEDDAR CHEESE",
    emoji: "🧀",
    tagline: "Rich, Melty & Velvety Golden Crunch",
    shortDesc:
      "A velvety cloud of slow-aged golden cheddar dust melted over fluffy, crunchy lotus pops. Rich, savory, and indulgently cheesy without the greasy guilt.",
    flavorProfile: {
      crunch: 5,
      spice: 0,
      tangy: 2,
      cheesiness: 5,
    },
    keyBenefits: [
      "Real Cheddar Cheese Seasoning",
      "Slow-Roasted, Never Deep-Fried",
      "0g Trans Fat & Zero Cholesterol",
      "Kid-Friendly & Guilt-Free",
    ],
    themeColor: "#FAC537", // Accent Warm Yellow
    accentBg: "#F79E1B",
    gradient: "from-[#FAC537] via-[#F79E1B] to-[#522C28]",
    packImage: "/packets/cheddar-cheese.png",
    frontImage: "/packaging/cheddar-cheese-front.jpg",
    backImage: "/packaging/cheddar-cheese-back.jpg",
    galleryImages: [
      "/packets/cheddar-cheese.png",
      "/packets/peri-peri.png",
      "/packets/cream-n-onion.png",
      "/packets/himalayan-salt.png",
      "/packaging/cheddar-cheese-front.jpg",
      "/packaging/peri-peri-front.jpg",
      "/packaging/cream-and-onion-front.jpg",
      "/packaging/pink-salt-front.jpg",
    ],
    bgSvg: "/product-bg/cheese.webp",
    bgMobileSvg: "/product-bg/mobile-cheese.webp",
    accentColor: "#522C28", // Espresso
    servingSize: "20g",
    borderAccentColor: "#A855F7", // Purple Accent as seen in packaging image
    nutritionTitle: "NUTRITIONAL FACTS",
    nutritionColumn1: "Amount per 100g*",
    nutritionColumn2: "%Daily Value**",
    ingredients:
      "Foxnut (Makhana) , Edible Vegetable Oil (Rice Bran Oil, Olive Oil), Cheddar Cheese Seasoning [Sugar, Iodized Salt, Black Salt, Acidity Regulators (INS 330, INS 262), Cheese Powder, Milk Solids, Maltodextrin, Flavour Enhancers (INS621),Anticaking Agent (INS 551)]. CONTAINS ADDED FLAVOURS (NATURAL & NATURE IDENTICAL).",
    allergen: "ALLERGEN: CONTAINS MILK. MAY CONTAIN NUTS.",
    disclaimer:
      "*%RDA Values Are Based On A 2000 Kcal Diet As Per Fssai Guidelines. Actual Needs May Vary Based On Individual Dietary Requirements.",
    nutrition: [
      { label: "Energy", amount: "505 kcal", dailyValue: "4.80%", isBold: true },
      { label: "Protein", amount: "7.8g", dailyValue: "-", isBold: true },
      { label: "Carbohydrates", amount: "63g", dailyValue: "-", isBold: true },
      { label: "Total Sugar", amount: "3.2g", dailyValue: "-", isIndent: true },
      { label: "Dietary Fibre", amount: "11.8g", dailyValue: "-", isIndent: true },
      { label: "Total Fat", amount: "18.5g", dailyValue: "5.50%", isBold: true },
      { label: "Saturated Fat", amount: "10.2g", dailyValue: "9.3%", isIndent: true },
      { label: "M.U.F.A", amount: "8g", dailyValue: "-", isIndent: true },
      { label: "P.U.F.A", amount: "2g", dailyValue: "-", isIndent: true },
      { label: "Trans Fat", amount: "0g", dailyValue: "-", isBold: true },
      { label: "Cholesterol", amount: "0mg", dailyValue: "-", isBold: true },
      { label: "Sodium", amount: "290mg", dailyValue: "2.90%", isBold: true },
    ],
    pricing: {
      single: { label: "Pack of 4 (4pcs)", count: "4 × 55g Pouches (220g)", price: 596, originalPrice: 596, badge: "MIN. 4 PACKS" },
      trio: { label: "Pack of 8 (8pcs)", count: "8 × 55g Pouches (440g)", price: 1192, originalPrice: 1192, badge: "POPULAR" },
      party: { label: "Party Box (12pcs)", count: "12 × 55g Pouches (660g)", price: 1788, originalPrice: 1788, badge: "BEST VALUE" },
    },
    faqs: [
      {
        q: "Does this contain real cheese?",
        a: "Yes! We use authentic cheddar cheese powder blended with milk solids for that golden, velvety savoriness.",
      },
      {
        q: "Is it suitable for vegetarians?",
        a: "Yes, 100% vegetarian friendly with green dot certification.",
      },
      {
        q: "What makes it healthier than cheese puffs?",
        a: "Regular cheese puffs are deep-fried corn starch. Pop Culture uses nutrient-dense foxnuts with zero trans fats and 11.8g of natural dietary fibre per 100g.",
      },
    ],
    reviews: [
      {
        name: "Pooja M.",
        rating: 5,
        title: "Tastes like movie popcorn but better!",
        comment: "So light and airy with tons of cheese flavour. My kids finish the whole pack in minutes.",
        date: "3 days ago",
      },
      {
        name: "Rohan K.",
        rating: 5,
        title: "Obsessed with this crunch",
        comment: "The aged cheddar dust is gourmet quality. 10/10 recommendation.",
        date: "2 weeks ago",
      },
    ],
  },

  "pink-salt": {
    slug: "pink-salt",
    id: "pinksalt",
    numericId: 100007,
    variantIds: { single: 10000701, trio: 10000702, party: 10000703 },
    name: "HIMALAYAN PINK SALT",
    badge: "🧂 PINK SALT",
    emoji: "🧂",
    tagline: "Crisp, Mineral-Rich & Effortlessly Savoury",
    shortDesc:
      "Handpicked jumbo foxnuts slow-roasted in rice bran & olive oil and dusted with pure Himalayan pink rock salt. Clean, mineral-rich crunch made for everyday snacking.",
    flavorProfile: {
      crunch: 5,
      spice: 0,
      tangy: 1,
      cheesiness: 0,
    },
    keyBenefits: [
      "Pure Himalayan Rock Salt",
      "Slow-Roasted, Never Fried",
      "0.0g Added Sugar & 0.0g Trans Fat",
      "Gluten-Free & Mineral Rich",
    ],
    themeColor: "#E1366C",
    accentBg: "#E1366C",
    gradient: "from-[#F05A89] via-[#E1366C] to-[#522C28]",
    packImage: "/packets/himalayan-salt.png",
    frontImage: "/packaging/pink-salt-front.jpg",
    backImage: "/packaging/pink-salt-back.jpg",
    galleryImages: [
      "/packets/himalayan-salt.png",
      "/packaging/pink-salt-front.jpg",
      "/packaging/pink-salt-back.jpg",
    ],
    bgSvg: "/product-bg/pink-salt.webp",
    bgMobileSvg: "/product-bg/mobile-pink-salt.webp",
    accentColor: "#FAC537",
    servingSize: "Per serve size: 25g",
    borderAccentColor: "#EA580C",
    nutritionTitle: "Nutritional Information*",
    nutritionColumn1: "Per 100g",
    nutritionColumn2: "%RDA^ per Serve",
    ingredients:
      "Foxnut (Makhana) , Edible Vegetable Oil (Rice Bran Oil, Olive Oil),Rock Salt",
    allergen: "ALLERGEN: MAY CONTAIN NUTS.",
    disclaimer:
      "*Approximate Values. Guideline Daily Amount according to \"Recommended Dietary Allowance\" for average adult per day (2000 kcal Diet) as per FSSR (Labelling & Display) 2020. ^% Daily Values are based on a 2000 kcal diet.",
    nutrition: [
      { label: "Energy", amount: "510 kcal", dailyValue: "6.4%", isBold: true },
      { label: "Protein", amount: "7.8g", dailyValue: "-", isBold: true },
      { label: "Carbohydrates", amount: "68.0g", dailyValue: "-", isBold: true },
      { label: "Total Sugar", amount: "0.5g", dailyValue: "-", isIndent: true },
      { label: "Added Sugar", amount: "0.0g", dailyValue: "0.0%", isIndent: true },
      { label: "Dietary Fibre", amount: "11.2g", dailyValue: "-", isIndent: true },
      { label: "Total Fat", amount: "22.5g", dailyValue: "8.4%", isBold: true },
      { label: "Saturated Fat", amount: "9.2g", dailyValue: "10.3%", isIndent: true },
      { label: "M.U.F.A.", amount: "10.0g", dailyValue: "-", isIndent: true },
      { label: "P.U.F.A.", amount: "7.0g", dailyValue: "-", isIndent: true },
      { label: "Trans Fat", amount: "0.0g", dailyValue: "-", isBold: true },
      { label: "Cholesterol", amount: "0.0mg", dailyValue: "-", isBold: true },
      { label: "Sodium", amount: "315.0mg", dailyValue: "3.9%", isBold: true },
    ],
    pricing: {
      single: { label: "Pack of 4 (4pcs)", count: "4 × 55g Pouches (220g)", price: 596, originalPrice: 596, badge: "MIN. 4 PACKS" },
      trio: { label: "Pack of 8 (8pcs)", count: "8 × 55g Pouches (440g)", price: 1192, originalPrice: 1192, badge: "POPULAR" },
      party: { label: "Party Box (12pcs)", count: "12 × 55g Pouches (660g)", price: 1788, originalPrice: 1788, badge: "BEST VALUE" },
    },
    faqs: [
      {
        q: "What kind of salt is used in Pink Salt Makhana?",
        a: "We use pure Himalayan Pink Rock Salt gently tossed with slow-roasted jumbo foxnuts for a clean, balanced savoury finish.",
      },
      {
        q: "Is there any added sugar or trans fat?",
        a: "Zero! It contains 0.0g Added Sugar, 0.0g Trans Fat, and 0.0mg Cholesterol per our nutritional panel.",
      },
      {
        q: "Is it suitable for daily guilt-free snacking?",
        a: "Yes — packed with 11.2g of dietary fibre and 7.8g protein per 100g, it keeps hunger away cleanly.",
      },
    ],
    reviews: [
      {
        name: "Meera N.",
        rating: 5,
        title: "So clean and addictive!",
        comment: "Just the right amount of pink salt with an insane crunch. My new go-to desk snack.",
        date: "3 days ago",
      },
      {
        name: "Kabir S.",
        rating: 5,
        title: "Light, airy & zero heaviness",
        comment: "Love that there is 0g added sugar and authentic rock salt taste.",
        date: "1 week ago",
      },
    ],
  },

  "raw-makhana": {
    slug: "raw-makhana",
    id: "plain",
    numericId: 100003,
    variantIds: { single: 10000301, trio: 10000302, party: 10000303 },
    name: "RAW MAKHANA",
    badge: "🌱 RAW MAKHANA",
    emoji: "🌱",
    tagline: "100% Pure, Lightly Roasted & Naturally Crisp",
    shortDesc:
      "Handpicked jumbo graded lotus pops slow-roasted to golden perfection with a delicate whisper of rock salt. Pure, unadulterated crunch that pairs with every lifestyle.",
    flavorProfile: {
      crunch: 5,
      spice: 0,
      tangy: 0,
      cheesiness: 0,
    },
    keyBenefits: [
      "100% Handpicked Lotus Pops",
      "Low Calorie & Naturally High Fibre",
      "Keto, Vegan & Fasting Friendly",
      "Zero Added Flavours or Preservatives",
    ],
    themeColor: "#3CA837", // Accent Kelly Green
    accentBg: "#3CA837",
    gradient: "from-[#93BF56] via-[#3CA837] to-[#522C28]",
    packImage: "/packets/raw-makhana-pouch.png",
    galleryImages: [
      "/packets/raw-makhana-pouch.png",
    ],
    bgSvg: "/product-bg/plain.webp",
    bgMobileSvg: "/product-bg/mobile-plain.webp",
    accentColor: "#93BF56", // Accent Lime Green
    servingSize: "25g",
    borderAccentColor: "#10B981", // Fresh Green Accent
    nutritionTitle: "NUTRITIONAL FACTS",
    nutritionColumn1: "Amount per 100g*",
    nutritionColumn2: "%Daily Value**",
    ingredients:
      "Foxnut (Makhana) [100% Handpicked Jumbo Lotus Seeds (5-Suta Grade)].\nCONTAINS NO OIL, ZERO ADDED SALT, ZERO ADDITIVES, ZERO PRESERVATIVES.",
    allergen: "ALLERGEN: MAY CONTAIN NUTS. GLUTEN FREE.",
    disclaimer:
      "*%RDA Values Are Based On A 2000 Kcal Diet As Per Fssai Guidelines. Actual Needs May Vary Based On Individual Dietary Requirements.",
    nutrition: [
      { label: "Energy", amount: "350 kcal", dailyValue: "3.50%", isBold: true },
      { label: "Protein", amount: "9.7g", dailyValue: "-", isBold: true },
      { label: "Carbohydrates", amount: "77g", dailyValue: "-", isBold: true },
      { label: "Total Sugar", amount: "0.5g", dailyValue: "-", isIndent: true },
      { label: "Dietary Fibre", amount: "14.5g", dailyValue: "-", isIndent: true },
      { label: "Total Fat", amount: "0.8g", dailyValue: "0.30%", isBold: true },
      { label: "Saturated Fat", amount: "0.2g", dailyValue: "0.2%", isIndent: true },
      { label: "M.U.F.A", amount: "0.3g", dailyValue: "-", isIndent: true },
      { label: "P.U.F.A", amount: "0.3g", dailyValue: "-", isIndent: true },
      { label: "Trans Fat", amount: "0g", dailyValue: "-", isBold: true },
      { label: "Cholesterol", amount: "0mg", dailyValue: "-", isBold: true },
      { label: "Sodium", amount: "120mg", dailyValue: "1.20%", isBold: true },
    ],
    pricing: {
      single: { label: "1 Pouch (250g)", count: "250g Jumbo Pouch", price: 399, originalPrice: 399, badge: "SINGLE POUCH" },
      trio: { label: "Pack of 2 (500g)", count: "2 × 250g (500g)", price: 798, originalPrice: 798 },
      party: { label: "Pack of 3 (750g)", count: "3 × 250g (750g)", price: 1197, originalPrice: 1197, badge: "BEST VALUE" },
    },
    faqs: [
      {
        q: "Can I eat this during fasting (Vrat)?",
        a: "Yes! 100% pure foxnuts roasted with rock salt (Sendha Namak) make this completely fasting compliant.",
      },
      {
        q: "How should I store it once opened?",
        a: "Seal the zipper pouch tightly or transfer to an airtight container to maintain maximum crunch.",
      },
      {
        q: "Are these good for weight management?",
        a: "Absolutely. With 14.5g fibre and almost zero fat, makhana keeps you full for hours with minimal calories.",
      },
    ],
    reviews: [
      {
        name: "Dr. Vikram S.",
        rating: 5,
        title: "Cleanest snack on the market",
        comment: "Great quality jumbo seeds, evenly roasted with no burnt bits. Perfect daily health snack.",
        date: "5 days ago",
      },
      {
        name: "Ananya B.",
        rating: 5,
        title: "Naturally crisp and pure",
        comment: "I love that there are no synthetic seasonings. Just pure roasted makhana that tastes fresh.",
        date: "3 weeks ago",
      },
    ],
  },

  "cream-and-onion": {
    slug: "cream-and-onion",
    id: "cream-and-onion",
    numericId: 100008,
    variantIds: { single: 10000801, trio: 10000802, party: 10000803 },
    name: "CREAM & ONION",
    badge: "🧅 CREAM & ONION",
    emoji: "🧅",
    tagline: "Smooth, Tangy & Irresistibly Creamy",
    shortDesc:
      "A velvety swirl of rich sour cream, sweet white onion powder, and garden parsley gently dusted over slow-roasted jumbo lotus pops. Classic comfort with a modern crunch.",
    flavorProfile: {
      crunch: 5,
      spice: 1,
      tangy: 4,
      cheesiness: 3,
    },
    keyBenefits: [
      "Rich Sour Cream & Onion Seasoning",
      "Slow-Roasted, Never Deep-Fried",
      "Rich in Dietary Fibre (14.2g)",
      "Zero Trans Fat & 0.0g Cholesterol",
    ],
    themeColor: "#8B1E3F", // Rich Wine / Crimson
    accentBg: "#9E1B42",
    gradient: "from-[#8B1E3F] via-[#B31B4B] to-[#522C28]",
    packImage: "/packets/cream-n-onion.png",
    frontImage: "/packaging/cream-and-onion-front.jpg",
    backImage: "/packaging/cream-and-onion-back.jpg",
    galleryImages: [
      "/packets/cream-n-onion.png",
      "/packaging/cream-and-onion-front.jpg",
      "/packaging/cream-and-onion-back.jpg",
    ],
    bgSvg: "/product-bg/cream-and-onion.png",
    bgMobileSvg: "/product-bg/mobile-cream-and-onion.png",
    accentColor: "#84CC16", // Bright Lime Green from packaging nutrition border
    servingSize: "20g",
    borderAccentColor: "#84CC16", // Lime Green
    nutritionTitle: "NUTRITIONAL FACTS",
    nutritionColumn1: "Amount per 100g*",
    nutritionColumn2: "%Daily Value**",
    ingredients:
      "Foxnut (Makhana) , Edible Vegetable Oil (Rice Bran Oil, Olive Oil), Sour Cream & Onion Seasoning [Sugar, Iodized Salt, White Onion Powder, Modified Starch (INS 1400), Cheese Powder, Milk Powder, Cream Powder, Parsley Leaves, Flavour Enhancer (INS 635), Anticaking Agent (INS 551)]. CONTAINS ADDED FLAVOURS (NATURAL & NATURE IDENTICAL).",
    allergen: "ALLERGEN: CONTAINS MILK. MAY CONTAIN NUTS.",
    disclaimer:
      "*%RDA Values Are Based On A 2000 Kcal Diet As Per Fssai Guidelines. Actual Needs May Vary Based On Individual Dietary Requirements.",
    nutrition: [
      { label: "Energy", amount: "440.31 kcal", dailyValue: "4.80%", isBold: true },
      { label: "Protein", amount: "8.62g", dailyValue: "-", isBold: true },
      { label: "Dietary Fibre", amount: "14.21g", dailyValue: "-", isIndent: false, isBold: false },
      { label: "Carbohydrates", amount: "59.4g", dailyValue: "-", isBold: true },
      { label: "Total Sugar", amount: "-", dailyValue: "-", isIndent: true },
      { label: "Total Fat", amount: "15.09g", dailyValue: "5.50%", isBold: true },
      { label: "Unsaturated Fat", amount: "10.61g", dailyValue: "-", isIndent: true },
      { label: "Trans Fat", amount: "0.0g", dailyValue: "-", isBold: true },
      { label: "Cholesterol", amount: "0.0g", dailyValue: "-", isBold: true },
      { label: "Sodium", amount: "567.29mg", dailyValue: "2.90%", isBold: true },
    ],
    pricing: {
      single: { label: "Pack of 4 (4pcs)", count: "4 × 55g Pouches (220g)", price: 596, originalPrice: 596, badge: "MIN. 4 PACKS" },
      trio: { label: "Pack of 8 (8pcs)", count: "8 × 55g Pouches (440g)", price: 1192, originalPrice: 1192, badge: "POPULAR" },
      party: { label: "Party Box (12pcs)", count: "12 × 55g Pouches (660g)", price: 1788, originalPrice: 1788, badge: "BEST VALUE" },
    },
    faqs: [
      {
        q: "What makes Cream & Onion so creamy?",
        a: "We blend genuine cream powder, milk powder, and real cheese powder with sweet white onion and parsley for a rich, silky savoury finish.",
      },
      {
        q: "Is it fried or roasted?",
        a: "100% slow-roasted in rice bran and olive oil. Never deep-fried.",
      },
      {
        q: "How much fibre is in each serving?",
        a: "It delivers an incredible 14.21g of natural dietary fibre per 100g, making it a satisfying, gut-healthy snack.",
      },
    ],
    reviews: [
      {
        name: "Devika P.",
        rating: 5,
        title: "Hands down my new favourite!",
        comment: "The sour cream tang is perfection. It beats every potato chip out there with way fewer calories.",
        date: "Just now",
      },
      {
        name: "Arjun M.",
        rating: 5,
        title: "So smooth and crunchy",
        comment: "The seasoning is generously coated and the crunch stays fresh. 10/10!",
        date: "1 day ago",
      },
    ],
  },
};
