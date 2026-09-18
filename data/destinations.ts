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

// Flagship carousel destinations featuring Beyond Native Tours and Ghana experiences
export const heroDestinations: Destination[] = [
  {
    id: "beyond-native-tours",
    name: "Beyond Native Tours",
    titleLine1: "BEYOND NATIVE",
    titleLine2: "TOURS",
    region: "Worldwide",
    country: "Expeditions",
    subtitle: "Immersive Global Journeys",
    description:
      "Beyond Native Tours crafts bespoke, slow-paced journeys across the world’s most breathtaking landscapes. From sacred mountain sanctuaries to golden dunes, discover authentic horizons and wild sanctuaries beyond the ordinary.",
    heroImage: photo("photo-1506744038136-46273834b3fb"),
    thumbnailImage: thumb("photo-1506744038136-46273834b3fb"),
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
    id: "kwame-nkrumah-park",
    name: "Kwame Nkrumah Memorial Park",
    titleLine1: "KWAME NKRUMAH",
    titleLine2: "MEMORIAL PARK",
    region: "Kwame Nkrumah Memorial Park",
    country: "Ghana",
    subtitle: "Ghana - Kwame Nkrumah Memorial Park",
    description:
      "Honoring Ghana’s founding father and pan-African visionary, this serene sanctuary features the iconic marble sword mausoleum, reflective water pools, manicured royal gardens, and fascinating independence archives.",
    heroImage: "/images/tours/kwame-nkrumah.jpg",
    thumbnailImage: "/images/tours/kwame-nkrumah.jpg",
  },
  {
    id: "batik-cooking-class",
    name: "Batik Making and Traditional Cooking Class",
    titleLine1: "BATIK MAKING &",
    titleLine2: "COOKING CLASS",
    region: "Batik Making & Cooking Class",
    country: "Ghana",
    subtitle: "Ghana - Batik Making & Traditional Cooking Class",
    description:
      "Experience Ghanaian artistry with hands-on batik stamping with authentic Adinkra symbols and rich natural dyes, followed by an intimate culinary workshop learning to prepare authentic Ghanaian jollof, plantains, and local spices.",
    heroImage: "/images/tours/batik-cooking.jpg",
    thumbnailImage: "/images/tours/batik-cooking.jpg",
  },
  {
    id: "northern-adventure-tour",
    name: "2 Days 3 Nights Northern Adventure Tour",
    titleLine1: "2 DAYS 3 NIGHTS",
    titleLine2: "NORTHERN ADVENTURE",
    region: "Northern Adventure Tour",
    country: "Ghana",
    subtitle: "Ghana - 2 Days 3 Nights Northern Adventure Tour",
    description:
      "Venture north to the untouched savanna of Mole National Park. Encounter herds of wild African elephants on walking safaris, marvel at the ancient 15th-century Larabanga mud mosque, and stargaze beneath tranquil savanna skies.",
    heroImage: "/images/tours/northen-1.jpg",
    thumbnailImage: "/images/tours/northen-1.jpg",
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
