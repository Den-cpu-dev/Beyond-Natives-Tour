export interface Tour {
  id: string;
  title: string;
  countryId: "ghana" | "togo" | "benin" | "liberia" | "ivory-coast" | "sierra-leone";
  country: string;
  region: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  tags: string[];
  badge?: string;
}

export interface CountryInfo {
  id: "ghana" | "togo" | "benin" | "liberia" | "ivory-coast" | "sierra-leone";
  name: string;
  tagline: string;
  description: string;
  capital: string;
  image: string;
  tourCount: number;
}

export const countryList: CountryInfo[] = [
  {
    id: "ghana",
    name: "Ghana",
    tagline: "Gateway to Living Heritage & Coastal Forts",
    description:
      "From the historic coastal ramparts of Cape Coast Castle to the pulsating markets of Accra and wild savanna elephants of Mole, Ghana is the welcoming cultural heartbeat of West Africa.",
    capital: "Accra",
    image: "/images/tours/cape-coast.jpg",
    tourCount: 5,
  },
  {
    id: "togo",
    name: "Togo",
    tagline: "Spirit & Heritage of Lomé and Sacred Lake Togoville",
    description:
      "A slender country steeped in profound ancestral spirituality, tranquil lagoons, vibrant Atlantic beaches, and the legendary craftsmanship of Kpalimé.",
    capital: "Lomé",
    image: "/images/tours/togo.jpg",
    tourCount: 3,
  },
  {
    id: "benin",
    name: "Benin",
    tagline: "Cradle of Dahomey Royalty & Sacred Traditions",
    description:
      "Home to the heroic Dahomey Amazons, the floating stilt marvel of Ganvié, ancient royal palaces in Abomey, and the profound ancestral memory of Ouidah.",
    capital: "Porto-Novo / Cotonou",
    image: "/images/tours/benin.jpg",
    tourCount: 4,
  },
  {
    id: "liberia",
    name: "Liberia",
    tagline: "Historic Coastlines, Atlantic Surfing & Lush Rainforests",
    description:
      "A land of untold history, untouched coastal beaches at Robertsport, verdant primary rainforests, and historic settlements brimming with authentic stories.",
    capital: "Monrovia",
    image: "/images/tours/liberia.jpg",
    tourCount: 3,
  },
  {
    id: "ivory-coast",
    name: "Ivory Coast",
    tagline: "Urban Modernity, Lagoon Culture & Colonial Heritage",
    description:
      "Experience the glittering skyline of Abidjan, the peaceful seaside colonial UNESCO architecture of Grand-Bassam, and the towering grandeur of the Yamoussoukro Basilica.",
    capital: "Yamoussoukro / Abidjan",
    image: "/images/tours/ivory-coast.jpg",
    tourCount: 3,
  },
  {
    id: "sierra-leone",
    name: "Sierra Leone",
    tagline: "Pristine White Sands & Deep Ancestral Reconnection",
    description:
      "Breathtaking mountain-meets-ocean scenery, tranquil turquoise coves along River Number 2 Beach, and poignant diaspora heritage on historic Bunce Island.",
    capital: "Freetown",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    tourCount: 3,
  },
];

export const allTours: Tour[] = [
  // ================= GHANA TOURS =================
  {
    id: "accra-city-tour",
    title: "Accra City Tour & Cultural Discovery",
    countryId: "ghana",
    country: "Ghana",
    region: "Greater Accra",
    duration: "Full Day (8 Hours)",
    description:
      "Immerse yourself in the bustling rhythms of Ghana's capital. Explore the historic Jamestown lighthouse, vibrant Makola open-air markets, the monumental Black Star Square, and local artisan casket craftsmen.",
    highlights: [
      "Historic Jamestown Fishing Harbour & Lighthouse",
      "Makola Market Sensory Walking Tour",
      "Black Star Square & Independence Arch",
      "Centre for National Culture Arts Centre",
      "Traditional Ghanaian lunch at native eatery",
    ],
    image: "/images/tours/accra-city.jpg",
    tags: ["Accra", "City Tour", "Culture", "Markets"],
    badge: "Popular",
  },
  {
    id: "cape-coast-castle-tour",
    title: "Cape Coast Castle & Heritage Sanctuary Tour",
    countryId: "ghana",
    country: "Ghana",
    region: "Central Region",
    duration: "Full Day / Overnight Available",
    description:
      "A deeply moving ancestral journey along Ghana's historic coastline. Walk the ramparts of Cape Coast Castle, pass through the sacred Door of No Return, and visit coastal fishing villages rich in oral history.",
    highlights: [
      "Guided historical walk through Cape Coast Castle",
      "The Door of No Return & Memorial Prayer",
      "Elmina Castle & historic St. George Harbour",
      "Traditional Fante coastal fishing community tour",
    ],
    image: "/images/tours/cape-coast.jpg",
    tags: ["Cape Coast", "Ancestral Heritage", "History", "Coastline"],
    badge: "Signature",
  },
  {
    id: "northern-adventure-mole",
    title: "2 Days 3 Nights Northern Adventure Tour",
    countryId: "ghana",
    country: "Ghana",
    region: "Savanna & Northern Region",
    duration: "3 Days / 2 Nights",
    description:
      "Venture north to the untouched savanna of Mole National Park. Encounter wild African elephants on walking safaris, marvel at the ancient 15th-century Larabanga mud-and-stick mosque, and stargaze beneath peaceful savanna skies.",
    highlights: [
      "Walking safaris with experienced wildlife rangers",
      "Wild African elephant and antelope tracking",
      "Ancient Larabanga 15th-Century Mud Mosque",
      "Mognori Eco-Village canoe safari",
      "Authentic Northern Ghanaian culinary experiences",
    ],
    image: "/images/tours/northen-1.jpg",
    tags: ["Mole National Park", "Wildlife", "Northern Ghana", "Safari"],
    badge: "Adventure",
  },
  {
    id: "batik-traditional-cooking",
    title: "Batik Making & Traditional Cooking Masterclass",
    countryId: "ghana",
    country: "Ghana",
    region: "Greater Accra",
    duration: "Half Day (5 Hours)",
    description:
      "Hands-on Ghanaian craftsmanship and culinary art. Stamp authentic Adinkra symbols into fabric using natural wax dyes, followed by cooking authentic Ghanaian Jollof rice, fried plantains, and local hibiscus drink.",
    highlights: [
      "Learn Adinkra symbolic meanings and history",
      "Hand-stamp your own personalized batik cloth",
      "Cook authentic Ghanaian Jollof from scratch",
      "Taste local natural juices (Bissap, Sobolo)",
    ],
    image: "/images/tours/batik-cooking.jpg",
    tags: ["Hands-on", "Artisan", "Culinary", "Adinkra"],
  },
  {
    id: "kwame-nkrumah-sanctuary",
    title: "Kwame Nkrumah Memorial Park & Heritage Sanctuaries",
    countryId: "ghana",
    country: "Ghana",
    region: "Accra",
    duration: "Half Day (4 Hours)",
    description:
      "Honor Ghana's founding father and pan-African visionary. Tour the iconic marble sword mausoleum, reflective water gardens, and rare historical independence archives.",
    highlights: [
      "Mausoleum of Osagyefo Dr. Kwame Nkrumah",
      "Personal museum with historical photographs and car",
      "Peaceful reflecting pools and royal trees",
      "W.E.B. Du Bois Memorial Centre visit",
    ],
    image: "/images/tours/kwame-nkrumah.jpg",
    tags: ["History", "Pan-African", "Museum", "Monuments"],
  },

  // ================= TOGO TOURS =================
  {
    id: "lome-heritage-tour",
    title: "Lomé Capital & Independence Heritage Odyssey",
    countryId: "togo",
    country: "Togo",
    region: "Maritime Region",
    duration: "Full Day (7 Hours)",
    description:
      "Discover the lively coastal charm of Lomé. Admire the towering Monument de l'Indépendance, browse the famous Nana Benz fabric stalls at Grand Marché, and explore the German colonial Cathedral.",
    highlights: [
      "Monument de l'Indépendance & Place de la Réconciliation",
      "Lomé Grand Marché & colourful Nana Benz textile halls",
      "Gothic Sacré-Cœur Cathedral & German heritage buildings",
      "Coastal palm boulevard and Atlantic beach promenade",
    ],
    image: "/images/tours/togo.jpg",
    tags: ["Lomé", "City Tour", "Heritage", "Architecture"],
    badge: "Featured",
  },
  {
    id: "togoville-lake-togo",
    title: "Togoville Sacred Traditions & Lake Togo Boat Journey",
    countryId: "togo",
    country: "Togo",
    region: "Maritime Region",
    duration: "Full Day (8 Hours)",
    description:
      "Cross tranquil Lake Togo in a traditional pirogue boat to ancient Togoville, the historic town that gave the country its name, rich with sacred shrines, German treaty sites, and colonial relics.",
    highlights: [
      "Traditional wooden pirogue crossing on Lake Togo",
      "Historic Togoville German-Ewe treaty monument",
      "Sacred village shrines and traditional priestesses",
      "Artisan pottery and woodcarving workshops",
    ],
    image: "/images/tours/togo.jpg",
    tags: ["Togoville", "Lake Togo", "Spirituality", "Tradition"],
  },
  {
    id: "kpalime-mountain-artisan",
    title: "Kpalimé Artisan Trails & Mount Kloto Trek",
    countryId: "togo",
    country: "Togo",
    region: "Plateaux Region",
    duration: "Full Day (9 Hours)",
    description:
      "Travel into Togo's lush mountain plateau. Hike the misty foothills of Mount Kloto, cool off under Tomegbe waterfall, and meet master weavers, batikeurs, and wood sculptors in Kpalimé.",
    highlights: [
      "Scenic Mount Kloto rainforest canopy hike",
      "Refreshing swim at Tomegbe crystal waterfall",
      "Artisan craft centre (Centre Artisanal de Kpalimé)",
      "Coffee and cocoa agro-forestry tastings",
    ],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Kpalimé", "Mountains", "Nature", "Artisans"],
  },

  // ================= BENIN TOURS =================
  {
    id: "cotonou-amazon-monument",
    title: "Cotonou City Tour & Monument of the Amazon",
    countryId: "benin",
    country: "Benin",
    region: "Littoral",
    duration: "Full Day (7 Hours)",
    description:
      "Stand in awe before the majestic 30-metre bronze statue of the Dahomey Amazon warrior in Cotonou. Experience Danokpa, West Africa's largest international open market, and vibrant beachfront cultural spaces.",
    highlights: [
      "Place de l'Amazone & towering Bio Guéra bronze warrior",
      "Dantokpa Market open-air commerce labyrinth",
      "Fondation Zinsou contemporary African art gallery",
      "Fidjrossè coastal beach boulevard and culinary stops",
    ],
    image: "/images/tours/benin.jpg",
    tags: ["Cotonou", "Amazon Statue", "City Tour", "Culture"],
    badge: "Must-See",
  },
  {
    id: "ouidah-route-des-esclaves",
    title: "Ouidah Ancestral Route des Esclaves & Temple of Pythons",
    countryId: "benin",
    country: "Benin",
    region: "Atlantique",
    duration: "Full Day (8 Hours)",
    description:
      "A profoundly spiritual pilgrimage along the 4km Route des Esclaves to the monumental Door of No Return on Ouidah beach. Visit the sacred Temple of the Pythons and the historic Portuguese fort.",
    highlights: [
      "Porte du Non-Retour seaside memorial monument",
      "Historic Portuguese Fort of São João Baptista de Ajudá",
      "Sacred Temple of the Pythons ritual visit",
      "Sacred Forest of King Kpassè with ancient carved statues",
    ],
    image: "/images/tours/benin.jpg",
    tags: ["Ouidah", "Ancestral Roots", "History", "Spiritual"],
    badge: "Deep Heritage",
  },
  {
    id: "ganvie-stilt-village",
    title: "Ganvié Stilt Village: The Venice of Africa",
    countryId: "benin",
    country: "Benin",
    region: "Lake Nokoué",
    duration: "Half Day / Full Day",
    description:
      "Board a motorized pirogue and glide into Lake Nokoué to explore Ganvié, a complete 300-year-old floating city built on stilts where thousands of Tofinu people live entirely over the water.",
    highlights: [
      "Scenic boat cruise through lush freshwater canals",
      "Floating market where merchants trade from canoes",
      "Stilt houses, floating churches, and schools",
      "Freshwater tilapia lunch prepared by lakeside hosts",
    ],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Ganvié", "Lake Nokoué", "Stilt Village", "Boat Tour"],
  },
  {
    id: "abomey-royal-palaces",
    title: "Royal Palaces of Abomey UNESCO Heritage Expedition",
    countryId: "benin",
    country: "Benin",
    region: "Zou",
    duration: "Full Day (9 Hours)",
    description:
      "Journey into the legendary Kingdom of Dahomey. Explore the earth-walled Royal Palaces of King Glèlè and King Ghézo, decorated with historic bas-reliefs illustrating bravery, war, and kingship.",
    highlights: [
      "UNESCO World Heritage Royal Palaces complex",
      "Throne room and royal ceremonial court",
      "Bas-reliefs depicting legendary Dahomey Amazon battles",
      "Royal bronze foundries and artisan weavers",
    ],
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=85",
    tags: ["Abomey", "UNESCO", "Kings", "Dahomey"],
  },

  // ================= LIBERIA TOURS =================
  {
    id: "monrovia-heritage-ducor",
    title: "Monrovia Historical City Tour & Ducor Heritage",
    countryId: "liberia",
    country: "Liberia",
    region: "Montserrado",
    duration: "Full Day (7 Hours)",
    description:
      "Delve into the singular history of the oldest republic in Africa. Visit the historic Providence Island where settlers first landed, the National Museum, Waterside Market, and the iconic Ducor Palace grounds.",
    highlights: [
      "Providence Island founding heritage landmark",
      "National Museum of Liberia cultural artifacts",
      "Panoramic views from historic Ducor Palace Hill",
      "Vibrant Waterside open-air market walk",
    ],
    image: "/images/tours/liberia.jpg",
    tags: ["Monrovia", "History", "City Tour", "Heritage"],
  },
  {
    id: "robertsport-surf-coastal",
    title: "Robertsport Atlantic Coastline & Surfing Discovery",
    countryId: "liberia",
    country: "Liberia",
    region: "Grand Cape Mount",
    duration: "2 Days / 1 Night",
    description:
      "Escape to the raw Atlantic beauty of Robertsport. Renowned for its world-class point breaks, serene golden beaches, historic 19th-century church ruins, and tranquil fishing villages.",
    highlights: [
      "Golden secluded beaches with Atlantic ocean breezes",
      "Surf lesson or watch world-renowned point breaks",
      "Historic Cape Mount Lighthouse & colonial ruins",
      "Fresh grilled ocean barracuda and cassava bread",
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Robertsport", "Beaches", "Surfing", "Coastal"],
    badge: "Coastal Escape",
  },
  {
    id: "kpatawee-waterfalls-retreat",
    title: "Kpatawee Waterfalls & Central Rainforest Retreat",
    countryId: "liberia",
    country: "Liberia",
    region: "Bong County",
    duration: "Full Day (8 Hours)",
    description:
      "Journey inland to the roaring cascades of Kpatawee Waterfalls nestled in pristine tropical rainforest. Swim in natural freshwater pools, walk through cocoa groves, and unwind with native hosts.",
    highlights: [
      "Multi-tiered natural jungle waterfalls & swimming pools",
      "Guided rainforest canopy nature walk",
      "Agro-tourism tour of rural cocoa and rubber groves",
      "Traditional picnic lunch by the roaring river",
    ],
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=85",
    tags: ["Kpatawee", "Waterfalls", "Nature", "Rainforest"],
  },

  // ================= IVORY COAST TOURS =================
  {
    id: "abidjan-plateau-modernity",
    title: "Abidjan Modernity, Plateau Architecture & St. Paul",
    countryId: "ivory-coast",
    country: "Ivory Coast",
    region: "Abidjan Autonomous District",
    duration: "Full Day (7 Hours)",
    description:
      "Explore the sophisticated 'Manhattan of West Africa'. Marvel at the striking modern architecture of St. Paul's Cathedral, the high-rises of Le Plateau, the vibrant Treichville market, and peaceful Ébrié lagoon.",
    highlights: [
      "Iconic Saint Paul's Cathedral modern architecture",
      "Le Plateau financial district architectural walking tour",
      "Treichville vibrant open market and African textiles",
      "Ébrié Lagoon boat cruise and waterfront sunset",
    ],
    image: "/images/tours/ivory-coast.jpg",
    tags: ["Abidjan", "Architecture", "Lagoon", "City Tour"],
  },
  {
    id: "grand-bassam-unesco",
    title: "Grand-Bassam UNESCO Colonial Heritage & Ocean Beach",
    countryId: "ivory-coast",
    country: "Ivory Coast",
    region: "Sud-Comoé",
    duration: "Full Day (8 Hours)",
    description:
      "Step back in time to Côte d'Ivoire's first capital. Walk through tree-lined avenues of 19th-century French colonial mansions, visit the National Costume Museum, and dine on fresh seafood on the Atlantic shore.",
    highlights: [
      "UNESCO World Heritage historic town of Grand-Bassam",
      "Musée National du Costume traditional attire collection",
      "Artisan pottery, glass, and woodcraft market",
      "Seaside palm beach lunch with fresh grilled seafood (Alloco & Poisson)",
    ],
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=85",
    tags: ["Grand-Bassam", "UNESCO", "Colonial", "Beach"],
    badge: "UNESCO",
  },
  {
    id: "yamoussoukro-basilica",
    title: "Yamoussoukro Basilica & Sacred Crocodiles Expedition",
    countryId: "ivory-coast",
    country: "Ivory Coast",
    region: "Lacs",
    duration: "Full Day (10 Hours)",
    description:
      "Witness the grandeur of the Basilica of Our Lady of Peace, the largest church in the world. Visit the presidential palace with its legendary sacred crocodiles and the peace foundation.",
    highlights: [
      "Basilica of Our Lady of Peace monumental architecture",
      "Vast Italian marble nave and hand-blown stained glass",
      "Sacred crocodile feeding spectacle at Presidential Lake",
      "Félix Houphouët-Boigny Peace Foundation monument",
    ],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Yamoussoukro", "Basilica", "Monuments", "Culture"],
  },

  // ================= SIERRA LEONE TOURS =================
  {
    id: "freetown-peninsula-cotton-tree",
    title: "Freetown Peninsula Heritage & Maroon Church Odyssey",
    countryId: "sierra-leone",
    country: "Sierra Leone",
    region: "Western Area",
    duration: "Full Day (7 Hours)",
    description:
      "Discover the storied history of Freetown. Trace the liberation of freed slaves at the historic Cotton Tree grounds, visit King's Yard Gate, the National Railway Museum, and climb Mount Aureol for panoramic harbour vistas.",
    highlights: [
      "Historic Cotton Tree & State House heritage plaza",
      "Old Maroon Church (dating to 1820) and King's Yard",
      "National Museum of Sierra Leone Krio artifacts",
      "Scenic drive along the Atlantic peninsula coastline",
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Freetown", "Heritage", "Krio", "History"],
  },
  {
    id: "bunce-island-gullah-heritage",
    title: "Bunce Island Ancestral Roots & Sierra Leone River Cruise",
    countryId: "sierra-leone",
    country: "Sierra Leone",
    region: "Sierra Leone River",
    duration: "Full Day (6 Hours)",
    description:
      "A profoundly powerful ancestral journey by boat up the Sierra Leone River to Bunce Island. Walk through overgrown 18th-century slave fortress ruins, intimately connected to the Gullah heritage of North America.",
    highlights: [
      "Scenic speedboat cruise up the Sierra Leone River estuary",
      "Guided walk through the haunting ruins of Bunce Island Fort",
      "Slave quarters, cannons, and merchant residence remnants",
      "Deep ancestral connection with Gullah Geechee history",
    ],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
    tags: ["Bunce Island", "Ancestral Roots", "Boat Cruise", "History"],
    badge: "Profound Heritage",
  },
  {
    id: "river-number-two-beach",
    title: "River Number 2 Beach & Banana Islands Paradise",
    countryId: "sierra-leone",
    country: "Sierra Leone",
    region: "Western Area Peninsula",
    duration: "Full Day / Overnight",
    description:
      "Sink into powder-soft pure white sand and turquoise lagoons at River Number Two Beach, internationally celebrated as one of the world's most pristine tropical coastlines.",
    highlights: [
      "Swim in the calm turquoise river lagoon and Atlantic surf",
      "Locally community-run eco-tourism beach sanctuary",
      "Fresh coconut water and caught-to-order lobster or barracuda",
      "Boat excursion into lush coastal mangroves",
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    tags: ["River No. 2", "White Sand", "Beaches", "Paradise"],
    badge: "Tropical Paradise",
  },
];
