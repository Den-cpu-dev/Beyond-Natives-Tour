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

// =========================================================================
// CONSOLIDATED MULTI-ITEM BOOKINGS & ORDERS
// =========================================================================

export interface ConsolidatedTourItem {
  tourName: string;
  country: string;
  duration?: string;
  journeyTier?: string;
  tripStyle?: string;
  travelDate?: string;
  groupSize?: string;
  dietaryOrPreferences?: string;
  notes?: string;
}

export interface ConsolidatedToursBookingDetails {
  fullName: string;
  emailOrPhone: string;
  tours: ConsolidatedTourItem[];
  generalNotes?: string;
}

export function formatConsolidatedToursBookingMessage(details: ConsolidatedToursBookingDetails): string {
  let msg = `✨ *CONSOLIDATED EXPEDITION BOOKINGS (${details.tours.length})* ✨\n`;
  msg += `*Beyond Native Tours*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Guest Name:* ${details.fullName.trim()}\n`;
  msg += `📱 *Contact:* ${details.emailOrPhone.trim()}\n`;
  msg += `🗓️ *Total Tours Selected:* ${details.tours.length}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  details.tours.forEach((tour, idx) => {
    msg += `📍 *TOUR ${idx + 1}: ${tour.tourName}* (${tour.country})\n`;
    if (tour.duration) msg += `   • ⏳ *Duration:* ${tour.duration}\n`;
    if (tour.journeyTier) msg += `   • 🌟 *Tier:* ${tour.journeyTier}\n`;
    if (tour.tripStyle) msg += `   • 🧭 *Style:* ${tour.tripStyle}\n`;
    if (tour.groupSize) msg += `   • 👥 *Travelers:* ${tour.groupSize}\n`;
    if (tour.travelDate) msg += `   • 📅 *Preferred Date:* ${tour.travelDate}\n`;
    if (tour.dietaryOrPreferences) msg += `   • 🥗 *Preferences:* ${tour.dietaryOrPreferences.trim()}\n`;
    if (tour.notes) msg += `   • 📝 *Specific Notes:* ${tour.notes.trim()}\n`;
    msg += `\n`;
  });

  if (details.generalNotes && details.generalNotes.trim()) {
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📝 *Overall Inquiries / Requests:* ${details.generalNotes.trim()}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_DON'T JUST VISIT. BELONG_\n`;
  msg += `_Sent via Beyond Native Tours Multi-Booking Cart_`;

  return msg;
}

export function getConsolidatedToursWhatsAppUrl(details: ConsolidatedToursBookingDetails): string {
  const message = formatConsolidatedToursBookingMessage(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface ConsolidatedStoreOrderItem {
  productName: string;
  quantity: number;
  priceUSD: string;
  priceGHS: string;
  notes?: string;
}

export interface ConsolidatedStoreOrderDetails {
  customerName: string;
  customerContact: string;
  deliveryLocation: string;
  items: ConsolidatedStoreOrderItem[];
  totalUSD?: string;
  totalGHS?: string;
  generalNotes?: string;
}

export function formatConsolidatedStoreOrderMessage(details: ConsolidatedStoreOrderDetails): string {
  const totalItemCount = details.items.reduce((acc, i) => acc + i.quantity, 0);
  let msg = `🛍️ *CONSOLIDATED ARTISAN CURATION ORDER (${totalItemCount} ITEMS)* 🛍️\n`;
  msg += `*Beyond Native Travel Store*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Customer Name:* ${details.customerName.trim()}\n`;
  msg += `📱 *WhatsApp / Phone:* ${details.customerContact.trim()}\n`;
  msg += `📍 *Delivery Location / Region:* ${details.deliveryLocation.trim()}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  details.items.forEach((item, idx) => {
    msg += `📦 *ITEM ${idx + 1}: ${item.productName}*\n`;
    msg += `   • 🔢 *Qty:* ${item.quantity}\n`;
    msg += `   • 💰 *Price:* ${item.priceUSD} (${item.priceGHS}) each\n`;
    if (item.notes && item.notes.trim()) {
      msg += `   • 📝 *Note:* ${item.notes.trim()}\n`;
    }
    msg += `\n`;
  });

  if (details.totalUSD || details.totalGHS) {
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *Estimated Total:* ${details.totalUSD || ""} ${details.totalGHS ? `(${details.totalGHS})` : ""}\n`;
  }

  if (details.generalNotes && details.generalNotes.trim()) {
    msg += `📝 *General Order Notes:* ${details.generalNotes.trim()}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Please advise on availability, delivery timeframe & payment details. Thank you!_\n`;
  msg += `_Sent via Beyond Native Travel Store Multi-Item Bag_`;

  return msg;
}

export function getConsolidatedStoreWhatsAppUrl(details: ConsolidatedStoreOrderDetails): string {
  const message = formatConsolidatedStoreOrderMessage(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface CombinedCheckoutDetails {
  customerName: string;
  customerContact: string;
  deliveryLocation?: string;
  tours: ConsolidatedTourItem[];
  storeItems: ConsolidatedStoreOrderItem[];
  totalStoreUSD?: string;
  totalStoreGHS?: string;
  generalNotes?: string;
}

export function formatCombinedCheckoutMessage(details: CombinedCheckoutDetails): string {
  let msg = `🌿 *BEYOND NATIVE EXPEDITIONS & CURATIONS INQUIRY* 🛍️\n`;
  msg += `*Beyond Native Tours & Travel Store*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Guest / Customer:* ${details.customerName.trim()}\n`;
  msg += `📱 *Contact:* ${details.customerContact.trim()}\n`;
  if (details.deliveryLocation && details.deliveryLocation.trim()) {
    msg += `📍 *Delivery Location / Region:* ${details.deliveryLocation.trim()}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (details.tours.length > 0) {
    msg += `🗺️ *SELECTED EXPEDITIONS (${details.tours.length}):*\n`;
    details.tours.forEach((tour, idx) => {
      msg += `${idx + 1}. *${tour.tourName}* (${tour.country})\n`;
      if (tour.duration) msg += `   • Duration: ${tour.duration}\n`;
      if (tour.journeyTier) msg += `   • Tier: ${tour.journeyTier}\n`;
      if (tour.travelDate) msg += `   • Date: ${tour.travelDate}\n`;
      if (tour.groupSize) msg += `   • Travelers: ${tour.groupSize}\n`;
      if (tour.dietaryOrPreferences) msg += `   • Note: ${tour.dietaryOrPreferences}\n`;
    });
    msg += `\n`;
  }

  if (details.storeItems.length > 0) {
    msg += `📦 *ARTISAN CURATIONS (${details.storeItems.length}):*\n`;
    details.storeItems.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.productName}* × ${item.quantity} [${item.priceUSD} / ${item.priceGHS}]\n`;
      if (item.notes) msg += `   • Note: ${item.notes}\n`;
    });
    if (details.totalStoreUSD || details.totalStoreGHS) {
      msg += `💰 *Store Est. Total:* ${details.totalStoreUSD || ""} ${details.totalStoreGHS ? `(${details.totalStoreGHS})` : ""}\n`;
    }
    msg += `\n`;
  }

  if (details.generalNotes && details.generalNotes.trim()) {
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📝 *Notes:* ${details.generalNotes.trim()}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_DON'T JUST VISIT. BELONG_\n`;
  msg += `_Sent via Beyond Native Unified Cart Portal_`;

  return msg;
}

export function getCombinedCheckoutWhatsAppUrl(details: CombinedCheckoutDetails): string {
  const message = formatCombinedCheckoutMessage(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
