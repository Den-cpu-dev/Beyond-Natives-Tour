// =========================================================================
// WHATSAPP CONFIGURATION & BOOKING DISPATCHER
// =========================================================================
// Replace this with your exact WhatsApp business phone number
// (Include country code, without '+' or spaces, e.g. "233241234567" for Ghana)
export const WHATSAPP_NUMBER = "233000000000";

export interface TripBookingDetails {
  fullName: string;
  emailOrPhone: string;
  tourName: string;
  travelDate: string;
  duration: string;
  groupSize: string;
  notes?: string;
}

export function formatTripBookingMessage(details: TripBookingDetails): string {
  return (
    `✨ *NEW EXPEDITION BOOKING INQUIRY* ✨\n` +
    `*Beyond Native Tours*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Name:* ${details.fullName.trim()}\n` +
    `📱 *Contact:* ${details.emailOrPhone.trim()}\n` +
    `📍 *Expedition:* ${details.tourName}\n` +
    `👥 *Group Size:* ${details.groupSize}\n` +
    `📅 *Preferred Dates:* ${details.travelDate || "Flexible / To be discussed"}\n` +
    `⏳ *Duration:* ${details.duration || "Standard itinerary"}\n` +
    (details.notes ? `📝 *Notes & Requests:* ${details.notes.trim()}\n` : "") +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `_Sent via Beyond Native Tours Booking Portal_`
  );
}

export function getTripBookingWhatsAppUrl(details: TripBookingDetails): string {
  const message = formatTripBookingMessage(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
