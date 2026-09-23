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
    id: "rev-jocelyn",
    name: "Jocelyn",
    location: "Visitor to Ghana",
    avatarBg: "bg-[#8d3f5c]",
    initials: "J",
    tour: "Accra Heritage & Home-Hosted Dinner",
    rating: 5,
    date: "Personal Note",
    badge: "Handwritten Card",
    title: "A Ray of Sunshine — Warmth, Kindness & Unforgettable Memories",
    quote:
      "“Dear Aisha, I wanted to take a moment to thank you for being so incredible during our time here in Ghana. You are a ray of sunshine — your warmth and kindness made our time special & so much fun! I learned so much about your beautiful country & Accra thanks to you. A highlight was having dinner @ your home. Sharing a meal w/ you was an honor and so very yummy! Your graciousness + hospitality made me feel so welcome! I hope we can stay in touch because I will see you again on my next trip here! I'm leaving Ghana with great memories thanks to you! Here is a token of my appreciation... it's well deserved! ♡”",
  },
  {
    id: "rev-aishatu",
    name: "Aishatu",
    location: "Diaspora Traveler",
    avatarBg: "bg-[#3d2c5f]",
    initials: "A",
    tour: "Ghana Cultural & Heritage Experience",
    rating: 5,
    date: "Personal Note",
    badge: "Handwritten Card",
    title: "A Radiant Ray of Sunshine — A Friend for Life",
    quote:
      "“Dear Aisha, thank you for being the radiant ray of sunshine that you are. ☀️ Meeting you has truly been a highlight of my trip. Thank you for all your kindness, generosity & care. I hope you come to visit me very soon, so that I have the chance to pour the same love into you! You have a friend in me for life. ♡”",
  },
];
