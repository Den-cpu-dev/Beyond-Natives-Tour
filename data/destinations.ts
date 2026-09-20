export interface Destination {
  id: string;
  name: string;
  titleLine1?: string;
  titleLine2?: string;
  region: string;
  country: string;
  subtitle?: string;
  description: string;
  heroImage: string;
  thumbnailImage: string;
  rank?: number;
  tourCount?: number;
}

const photo = (id: string, options = "auto=format&fit=crop&w=2200&q=90") =>
  `https://images.unsplash.com/${id}?${options}`;

const thumb = (id: string, options = "auto=format&fit=crop&w=800&q=85") =>
  `https://images.unsplash.com/${id}?${options}`;

// Flagship carousel destinations: 5 featured journeys
export const heroDestinations: Destination[] = [
  {
    id: "beyond-native-tours",
    name: "Beyond Native Tours",
    titleLine1: "BEYOND NATIVE",
    titleLine2: "TOURS",
    region: "West Africa",
    country: "Cultural Tourism",
    subtitle: "Cultural Tourism • Small-Group West Africa Journeys",
    description:
      "Beyond Native Travel is a boutique cultural tourism company specialising in small-group, immersive journeys across West Africa. It is designed for travellers who want to go beyond the surface — to experience Africa through the eyes of people who live it, love it, and call it home.",
    heroImage: "/images/tours/beyond-native.jpg",
    thumbnailImage: "/images/tours/beyond-native.jpg",
  },
  {
    id: "accra-city-tour",
    name: "Accra City Tour",
    titleLine1: "ACCRA",
    titleLine2: "CITY TOUR",
    region: "Accra City Tour",
    country: "Ghana",
    subtitle: "Ghana - Accra City Tour",
    description:
      "Immerse yourself in the vibrant energy of Ghana’s capital. Discover the monumental Black Star Square, bustling Makola open-air markets, the historic Jamestown lighthouse, and the colorful contemporary rhythm of Accra.",
    heroImage: "/images/tours/accra-city.jpg",
    thumbnailImage: "/images/tours/accra-city.jpg",
  },
  {
    id: "cape-coast-castle",
    name: "Cape Coast Castle and Heritage Tour",
    titleLine1: "CAPE COAST",
    titleLine2: "CASTLE & HERITAGE",
    region: "Cape Coast Castle",
    country: "Ghana",
    subtitle: "Ghana - Cape Coast Castle & Heritage Tour",
    description:
      "Step into living history on Ghana’s Atlantic coastline. Walk the imposing ramparts of Cape Coast Castle, journey through the Door of No Return, and explore vibrant coastal fishing harbors rich with enduring heritage.",
    heroImage: "/images/tours/cape-coast.jpg",
    thumbnailImage: "/images/tours/cape-coast.jpg",
  },
  {
    id: "togo-cultural-odyssey",
    name: "Togo Cultural Odyssey",
    titleLine1: "TOGO",
    titleLine2: "CULTURAL ODYSSEY",
    region: "Lomé & Plateaux",
    country: "Togo",
    subtitle: "Togo - Lomé & Cultural Heritage Expedition",
    description:
      "Cross into the living soul of Togo. Stand before Lomé’s towering Monument of Independence, wander the vibrant Grand Marché, discover sacred artisanal traditions in Togoville, and experience the warmth of Togolese hospitality.",
    heroImage: "/images/tours/togo.jpg",
    thumbnailImage: "/images/tours/togo.jpg",
  },
  {
    id: "benin-heritage-expedition",
    name: "Benin Kingdom & Heritage Expedition",
    titleLine1: "BENIN",
    titleLine2: "HERITAGE EXPEDITION",
    region: "Cotonou & Ouidah",
    country: "Benin",
    subtitle: "Benin - Cotonou & Dahomey Heritage Expedition",
    description:
      "Journey into the heart of Dahomey royalty and ancestral resilience. Behold the colossal bronze Amazon Statue in Cotonou, navigate the floating stilt city of Ganvié, and walk the historic sacred pathways of Ouidah.",
    heroImage: "/images/tours/benin.jpg",
    thumbnailImage: "/images/tours/benin.jpg",
  },
];

export const destinations: Destination[] = [
  {
    id: "ghana",
    name: "Ghana",
    region: "Living Heritage",
    country: "West Africa",
    subtitle: "Living Heritage & Coastal Forts",
    description:
      "From Cape Coast Castle to the vibrant energy of Accra and savanna wildlife of Mole, experience Ghana's warm, welcoming heritage.",
    heroImage: "/images/tours/cape-coast.jpg",
    thumbnailImage: "/images/tours/cape-coast.jpg",
    tourCount: 7,
    rank: 1,
  },
  {
    id: "togo",
    name: "Togo",
    region: "Spirit & Heritage",
    country: "West Africa",
    subtitle: "Spirit & Heritage of Lomé",
    description:
      "A slender coastal gem of profound spirituality, Lake Togo pirogue boat crossings, and renowned Kpalimé mountain artisans.",
    heroImage: "/images/tours/togo.jpg",
    thumbnailImage: "/images/tours/togo.jpg",
    tourCount: 3,
    rank: 2,
  },
  {
    id: "benin",
    name: "Benin",
    region: "Dahomey Kingdoms",
    country: "West Africa",
    subtitle: "Kingdoms & Sacred Traditions",
    description:
      "Behold the monumental Cotonou Amazon warrior, glide through Ganvié stilt city, and discover the ancestral sanctuaries of Ouidah.",
    heroImage: "/images/tours/benin.jpg",
    thumbnailImage: "/images/tours/benin.jpg",
    tourCount: 4,
    rank: 3,
  },
  {
    id: "liberia",
    name: "Liberia",
    region: "Atlantic Coast",
    country: "West Africa",
    subtitle: "Atlantic Coast & Rainforests",
    description:
      "Historic Monrovia heritage, raw Atlantic surf breaks in Robertsport, and lush inland rainforest waterfalls at Kpatawee.",
    heroImage: "/images/tours/liberia.jpg",
    thumbnailImage: "/images/tours/liberia.jpg",
    tourCount: 3,
    rank: 4,
  },
  {
    id: "ivory-coast",
    name: "Ivory Coast",
    region: "Lagoon & Modernity",
    country: "West Africa",
    subtitle: "Modernity & Lagoon Culture",
    description:
      "Gleaming Abidjan skyline, serene UNESCO colonial Grand-Bassam beach avenues, and the colossal Yamoussoukro Basilica.",
    heroImage: "/images/tours/ivory-coast.jpg",
    thumbnailImage: "/images/tours/ivory-coast.jpg",
    tourCount: 3,
    rank: 5,
  },
  {
    id: "sierra-leone",
    name: "Sierra Leone",
    region: "White Sands",
    country: "West Africa",
    subtitle: "White Sands & Ancestral Roots",
    description:
      "Pristine white sand coves at River No. 2, historic Freetown Krio heritage, and profound ancestral memory on Bunce Island.",
    heroImage: "/images/tours/sierra-leone.jpg",
    thumbnailImage: "/images/tours/sierra-leone.jpg",
    tourCount: 3,
    rank: 6,
  },
];

export const rankedDestinations = destinations;
