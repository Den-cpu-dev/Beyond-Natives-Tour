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
    id: "marrakech",
    name: "Marrakech Medina",
    region: "Haouz",
    country: "Morocco",
    description:
      "Follow the first call to prayer through rose-walled lanes and hidden riads. Marrakech is a vivid starting point for journeys that move at their own pace.",
    heroImage: photo("photo-1548013146-72479768bada"),
    thumbnailImage: thumb("photo-1548013146-72479768bada"),
  },
  {
    id: "atlas",
    name: "High Atlas",
    region: "Al Haouz",
    country: "Morocco",
    description:
      "The road rises through terraced valleys, walnut trees, and Berber villages. Here, every bend opens toward another quiet summit.",
    heroImage: photo("photo-1489749798305-4fea3ae63d43"),
    thumbnailImage: thumb("photo-1489749798305-4fea3ae63d43"),
  },
  {
    id: "merzouga",
    name: "Merzouga Dunes",
    region: "Sahara Desert",
    country: "Morocco",
    description:
      "Walk out with the sun and watch the Erg Chebbi dunes redraw themselves. Nights are for mint tea, constellations, and the stillness of the desert.",
    heroImage: photo("photo-1547234935-80c7145ec969"),
    thumbnailImage: thumb("photo-1547234935-80c7145ec969"),
    rank: 1,
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    region: "Rif Mountains",
    country: "Morocco",
    description:
      "Blue paths climb beneath the Rif Mountains, full of paint-worn doors and warm bread. It is a place for leaving the map folded in your pocket.",
    heroImage: photo("photo-1553242086-5c1f8c7c9543"),
    thumbnailImage: thumb("photo-1553242086-5c1f8c7c9543"),
    rank: 2,
  },
  {
    id: "dades",
    name: "Dades Valley",
    region: "Drâa-Tafilalet",
    country: "Morocco",
    description:
      "A river threads between red rock walls and palm groves. Slow down for kasbahs, road-side figs, and a landscape shaped by time.",
    heroImage: photo("photo-1539650116574-75c0c6d73f6e"),
    thumbnailImage: thumb("photo-1539650116574-75c0c6d73f6e"),
    rank: 3,
  },
  {
    id: "essaouira",
    name: "Essaouira Coast",
    region: "Atlantic Coast",
    country: "Morocco",
    description:
      "Trade desert dust for salt air on the Atlantic. Essaouira brings whitewashed ramparts, wind-shaped beaches, and a bright blue horizon.",
    heroImage: photo("photo-1597212618440-806262de4f6b"),
    thumbnailImage: thumb("photo-1597212618440-806262de4f6b"),
    rank: 4,
  },
  {
    id: "ait-ben-haddou",
    name: "Aït Ben Haddou",
    region: "Ounila Valley",
    country: "Morocco",
    description:
      "At dusk, the earthen towers of this old ksar glow the color of fire. Cross the river and step into a story written in mudbrick and light.",
    heroImage: photo("photo-1530789253388-582c481c54b0"),
    thumbnailImage: thumb("photo-1530789253388-582c481c54b0"),
  },
];

export const rankedDestinations = destinations.filter((destination) => destination.rank);
