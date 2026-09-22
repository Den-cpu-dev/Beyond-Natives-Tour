export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  avatarBg: string;
  initials: string;
  tour: string;
  rating: number;
  date: string;
  title: string;
  quote: string;
  badge?: string;
}

export const customerReviews: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Dr. Nia Washington",
    location: "Atlanta, GA, USA",
    avatarBg: "bg-[#3d2c5f]",
    initials: "NW",
    tour: "Ancestral Naming Ceremony & Cape Coast Dungeons",
    rating: 5,
    date: "August 2026",
    badge: "Verified Traveler",
    title: "A Life-Changing Spiritual & Cultural Return",
    quote:
      "Beyond Native Tours didn’t just show us Ghana; they welcomed us home. The Ancestral Naming Ceremony in Cape Coast brought tears to our eyes. Ayishetu and her team handled every detail with deep reverence, warmth, and grace. We left feeling connected to our roots in a way words cannot describe.",
  },
  {
    id: "rev-2",
    name: "Marcus & Elena Bennett",
    location: "London, United Kingdom",
    avatarBg: "bg-[#8d3f5c]",
    initials: "MB",
    tour: "Kakum Rainforest Canopy & Elmina Castle",
    rating: 5,
    date: "July 2026",
    badge: "Couple Expedition",
    title: "Unmatched Hospitality & Flawless Execution",
    quote:
      "From the early morning hike across the suspended walkways at Kakum to the emotional walk through the Door of No Return, every single minute was expertly curated. The small group size meant personalized attention, safety, and spontaneous local stops we could never have found in guidebooks.",
  },
  {
    id: "rev-3",
    name: "Amara Osei-Tutu",
    location: "Toronto, Canada",
    avatarBg: "bg-[#3e5b34]",
    initials: "AO",
    tour: "Accra Heritage, Cooking Class & Batik Workshop",
    rating: 5,
    date: "September 2026",
    badge: "Verified Traveler",
    title: "Hands Down the Most Authentic Experience",
    quote:
      "Making authentic Jollof and groundnut soup from scratch, pounding fufu, and designing my own traditional batik cloth was the absolute highlight of my vacation. Ayishetu's infectious energy and deep community connections make you feel like royalty.",
  },
  {
    id: "rev-4",
    name: "Jean-Paul & Chantal Mercier",
    location: "Paris, France",
    avatarBg: "bg-[#023051]",
    initials: "JM",
    tour: "West Africa Multi-Country: Ghana, Togo & Benin",
    rating: 5,
    date: "June 2026",
    badge: "Cross-Border Journey",
    title: "Seamless Cross-Border Travel With True Locals",
    quote:
      "Crossing borders into Togo and Benin can be daunting, but with Beyond Native Tours, everything was smooth, safe, and rich in history. The Ouidah voodoo sanctuary and Ganvié stilt village visits were unforgettable. Truly beyond the surface!",
  },
  {
    id: "rev-5",
    name: "David K. Campbell",
    location: "Houston, TX, USA",
    avatarBg: "bg-[#292f16]",
    initials: "DC",
    tour: "Traditional Drumming, Twi Lesson & Arts Center",
    rating: 5,
    date: "May 2026",
    badge: "Cultural Immersion",
    title: "Heartfelt, Educational & Supremely Fun",
    quote:
      "The drumming session and Twi language crash course had our whole group smiling for hours. Plus, their Native Habits wild honey and pure shea butter from the store are the real deal—I brought three jars back home and everyone is asking for more.",
  },
  {
    id: "rev-6",
    name: "Khadija & Fatima Al-Mansoor",
    location: "Dubai, UAE",
    avatarBg: "bg-[#3d2c5f]",
    initials: "KA",
    tour: "Accra City Landmark & Kwame Nkrumah Memorial",
    rating: 5,
    date: "August 2026",
    badge: "Verified Traveler",
    title: "Incredible Insight Into Ghana's Living History",
    quote:
      "The guides are living historians. Visiting Kwame Nkrumah Memorial Park, Black Star Square, and Makola Market with someone who knows every vendor and corner transformed a sightseeing day into an unforgettable human journey.",
  },
];
