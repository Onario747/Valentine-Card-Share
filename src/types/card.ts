export type CardStyle = {
  id: string;
  name: string;
  preview: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  description: string;
  envelopeColor: string;
  cardBg: string;
};

export const cardStyles: CardStyle[] = [
  {
    id: "classic",
    name: "Classic Romance",
    preview: "/card-styles/classic.png",
    bgColor: "from-pink-100 via-red-50 to-purple-100",
    textColor: "text-pink-600",
    accentColor: "from-pink-500 to-purple-600",
    description: "A timeless design with elegant colors and romantic elements",
    envelopeColor: "bg-pink-200",
    cardBg: "bg-white",
  },
  {
    id: "modern",
    name: "Modern Love",
    preview: "/card-styles/modern.png",
    bgColor: "from-rose-400 via-fuchsia-500 to-indigo-500",
    textColor: "text-white",
    accentColor: "from-white to-white",
    description: "Bold, contemporary design with vibrant gradients",
    envelopeColor: "bg-fuchsia-400",
    cardBg: "bg-gradient-to-br from-rose-500 to-indigo-500",
  },
  {
    id: "vintage",
    name: "Vintage Heart",
    preview: "/card-styles/vintage.png",
    bgColor: "from-amber-100 via-orange-50 to-yellow-100",
    textColor: "text-amber-800",
    accentColor: "from-amber-700 to-red-800",
    description: "A nostalgic design with warm, retro colors",
    envelopeColor: "bg-amber-200",
    cardBg: "bg-[url('/vintage-paper.jpg')] bg-cover",
  },
];

// Add color themes that users can choose from
export type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

export const colorThemes: ColorTheme[] = [
  {
    id: "romance",
    name: "Romantic Pink",
    primary: "from-pink-500 to-purple-600",
    secondary: "text-pink-600",
    accent: "bg-pink-200",
    background: "from-pink-100 via-red-50 to-purple-100",
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    primary: "from-blue-500 to-cyan-600",
    secondary: "text-blue-600",
    accent: "bg-blue-200",
    background: "from-blue-100 via-cyan-50 to-sky-100",
  },
  {
    id: "sunset",
    name: "Sunset",
    primary: "from-orange-500 to-red-600",
    secondary: "text-orange-600",
    accent: "bg-orange-200",
    background: "from-orange-100 via-amber-50 to-yellow-100",
  },
  {
    id: "lavender",
    name: "Lavender Dream",
    primary: "from-purple-500 to-violet-600",
    secondary: "text-purple-600",
    accent: "bg-purple-200",
    background: "from-purple-100 via-violet-50 to-fuchsia-100",
  },
  {
    id: "emerald",
    name: "Emerald Garden",
    primary: "from-emerald-500 to-green-600",
    secondary: "text-emerald-600",
    accent: "bg-emerald-200",
    background: "from-emerald-100 via-green-50 to-teal-100",
  },
];
