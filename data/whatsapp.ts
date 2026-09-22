// =========================================================================
// WHATSAPP CONFIGURATION & DISPATCHER (BOOKINGS & STORE)
// =========================================================================
// Beyond Native Tours Official WhatsApp Business Contact: +233539691802
export const WHATSAPP_NUMBER = "233539691802";
export const WHATSAPP_DISPLAY = "+233 539 691 802";
export const INSTAGRAM_HANDLE = "@beyondnative_tours";
export const INSTAGRAM_URL = "https://www.instagram.com/beyondnative_tours";

export interface TripBookingDetails {
  fullName: string;
  emailOrPhone: string;
  tourName: string;
  travelDate: string;
  duration: string;
  groupSize: string;
  journeyTier?: string; // e.g. "Standard (3-Star)" | "Luxury (4-5 Star Resorts)" | "Single (GHC 7,000)" | "Shared (GHC 6,000)"
  tripStyle?: string; // e.g. "Cultural / Heritage" | "Luxury Escape" | "Weekend Getaway" | "Adventure" | "Family-Friendly" | "Custom Private Group"
  dietaryOrPreferences?: string;
  notes?: string;
}

export function formatTripBookingMessage(details: TripBookingDetails): string {
  return (
    `✨ *NEW EXPEDITION BOOKING INQUIRY* ✨\n` +
    `*Beyond Native Tours*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Name:* ${details.fullName.trim()}\n` +
    `📱 *Contact:* ${details.emailOrPhone.trim()}\n` +
    `📍 *Tour / Expedition:* ${details.tourName}\n` +
    (details.journeyTier ? `🌟 *Package Tier:* ${details.journeyTier}\n` : "") +
    (details.tripStyle ? `🧭 *Trip Style:* ${details.tripStyle}\n` : "") +
    `👥 *Group Size:* ${details.groupSize}\n` +
    `📅 *Preferred Dates:* ${details.travelDate || "Flexible / To be discussed"}\n` +
    `⏳ *Duration:* ${details.duration || "Standard itinerary"}\n` +
    (details.dietaryOrPreferences ? `🥗 *Dietary & Room Preferences:* ${details.dietaryOrPreferences.trim()}\n` : "") +
    (details.notes ? `📝 *Special Requests / Notes:* ${details.notes.trim()}\n` : "") +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `_DON'T JUST VISIT. BELONG_\n` +
    `_Sent via Beyond Native Tours Booking Portal_`
  );
}

export function getTripBookingWhatsAppUrl(details: TripBookingDetails): string {
  const message = formatTripBookingMessage(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface StoreOrderDetails {
  customerName: string;
  customerContact: string;
  deliveryLocation: string;
  productName: string;
  quantity: number;
  priceUSD: string;
  priceGHS: string;
  notes?: string;
}

export function formatStoreOrderMessage(details: StoreOrderDetails): string {
  return (
    `🛍️ *NEW ARTISAN CURATION ORDER* 🛍️\n` +
    `*Beyond Native Travel Store*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Customer Name:* ${details.customerName.trim()}\n` +
    `📱 *WhatsApp / Phone:* ${details.customerContact.trim()}\n` +
    `📍 *Delivery Location / Region:* ${details.deliveryLocation.trim()}\n` +
    `📦 *Product:* ${details.productName}\n` +
    `🔢 *Quantity:* ${details.quantity}\n` +
    `💰 *Price:* ${details.priceUSD} (${details.priceGHS}) each\n` +
    (details.notes ? `📝 *Custom Request / Sizing / Notes:* ${details.notes.trim()}\n` : "") +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `_Please advise on delivery timeframe and payment instructions. Thank you!_\n` +
    `_Sent via Beyond Native Travel Store_`
  );
}

export function getStoreOrderWhatsAppUrl(details: StoreOrderDetails): string {
  const message = formatStoreOrderMessage(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getDirectChatWhatsAppUrl(contextMessage?: string): string {
  const defaultMsg = "Hello Beyond Native Tours! 🌿 I am inquiring about your curated West Africa tours and experiences.";
  const text = contextMessage || defaultMsg;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
