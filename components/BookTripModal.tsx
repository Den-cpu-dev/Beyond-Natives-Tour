"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTripBookingWhatsAppUrl, WHATSAPP_DISPLAY, type TripBookingDetails } from "@/data/whatsapp";
import { allTours } from "@/data/tours";
import { useCart } from "@/context/CartContext";

const availableTours = [
  ...allTours.map((t) => `${t.title} (${t.country})`),
  "Custom Bespoke Journey (Tailored Itinerary)",
];

const groupSizes = [
  "1 Solo Traveller",
  "2 Travellers (Duo / Couple)",
  "3–5 Travellers",
  "6–10 Travellers",
  "10+ Large Group",
];

const journeyTiers = [
  "Standard (3-Star / Group)",
  "Luxury (4-5 Star Resorts)",
  "Single Occupancy (From GHC 7,000)",
  "Shared Occupancy (From GHC 6,000)",
  "Flexible / Custom Tier",
];

const tripStyles = [
  "Cultural & Heritage",
  "Luxury Escapes & Gourmet",
  "Weekend Getaway",
  "Resorts Hopping",
  "Adventure Tour",
  "Family-Friendly",
  "Private Group / Custom",
  "Event Coordination",
];

const durationOptions = ["1 Day Excursion", "2–3 Days", "3N / 4D (Resort Hopping)", "5N / 6D (Benin & Togo)", "1–2 Weeks", "Custom Duration"];

export default function BookTripModal() {
  const { addTour, openCart, totalCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [tourName, setTourName] = useState(availableTours[0]);
  const [travelDate, setTravelDate] = useState("");
  const [groupSize, setGroupSize] = useState(groupSizes[1]);
  const [duration, setDuration] = useState(durationOptions[1]);
  const [journeyTier, setJourneyTier] = useState(journeyTiers[0]);
  const [tripStyle, setTripStyle] = useState(tripStyles[0]);
  const [dietaryOrPreferences, setDietaryOrPreferences] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const matchedTour = allTours.find(
      (t) =>
        `${t.title} (${t.country})`.toLowerCase() === tourName.toLowerCase() ||
        t.title.toLowerCase() === tourName.toLowerCase()
    );
    addTour({
      tourTitle: matchedTour ? matchedTour.title : tourName,
      country: matchedTour?.country || "West Africa",
      duration,
      pricing: matchedTour?.pricing,
      image: matchedTour?.image || "/images/tours/accra-city-flyer.jpg",
      travelDate,
      groupSize,
      journeyTier,
      tripStyle,
      dietaryOrPreferences,
      notes,
    });
    setIsOpen(false);
  };

  // Global listener so any button on the site can open the booking modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ tourName?: string }>;
      if (customEvent.detail?.tourName) {
        // If a specific tour was clicked, auto-select it
        const match = availableTours.find((t) =>
          t.toLowerCase().includes(customEvent.detail.tourName!.toLowerCase())
        );
        if (match) setTourName(match);
      }
      setSentSuccess(false);
      setErrorMsg("");
      setIsOpen(true);
    };

    window.addEventListener("open-trip-booking", handleOpen);
    return () => window.removeEventListener("open-trip-booking", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your name so we know how to address you.");
      return;
    }
    if (!emailOrPhone.trim()) {
      setErrorMsg("Please enter your WhatsApp number or email address.");
      return;
    }

    setErrorMsg("");
    const bookingDetails: TripBookingDetails = {
      fullName,
      emailOrPhone,
      tourName,
      travelDate,
      duration,
      groupSize,
      journeyTier,
      tripStyle,
      dietaryOrPreferences,
      notes,
    };

    const whatsappUrl = getTripBookingWhatsAppUrl(bookingDetails);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSentSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#292f16]/15 bg-white p-5 sm:p-8 shadow-2xl text-[#292f16] my-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full border border-[#292f16]/15 bg-[#f7f9f6] grid place-items-center text-[#292f16]/70 hover:text-[#292f16] hover:bg-[#292f16]/10 transition-colors"
              aria-label="Close booking modal"
            >
              &times;
            </button>

            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#3e5b34] shadow-[0_0_8px_rgba(62,91,52,0.8)] animate-pulse" />
                <span className="font-anton text-[10px] uppercase tracking-[0.2em] text-[#3e5b34]">
                  Direct Expedition Booking
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#3e5b34] bg-[#3e5b34]/10 px-2.5 py-1 rounded-full">
                WhatsApp: {WHATSAPP_DISPLAY}
              </span>
            </div>

            <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight text-[#292f16] leading-tight">
              Reserve Your Expedition
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#292f16]/75 leading-relaxed">
              Fill out your trip preferences below. When you submit, your full customized itinerary inquiry will open directly in our host&apos;s WhatsApp DM ({WHATSAPP_DISPLAY}).
            </p>

            {sentSuccess ? (
              <div className="mt-6 rounded-2xl border border-[#3e5b34]/30 bg-[#3e5b34]/10 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#3e5b34] text-white">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h3 className="font-anton text-lg uppercase text-[#292f16]">WhatsApp Chat Opened!</h3>
                <p className="mt-1 text-xs text-[#292f16]/80 leading-relaxed">
                  Your trip details & preferences have been prepared for WhatsApp DM. Send the message in WhatsApp to finalize dates and questions with our host!
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 rounded-full bg-[#3e5b34] px-6 py-2 text-xs font-anton uppercase tracking-wider text-white hover:bg-[#292f16] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
                {errorMsg && (
                  <div className="rounded-xl border border-red-500/40 bg-red-50 px-3.5 py-2 text-xs text-red-600 font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Your Full Name <span className="text-[#3e5b34]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      WhatsApp Phone or Email <span className="text-[#3e5b34]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+1 (555) 000-0000 or email"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* 2. Select Expedition */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                    Select Expedition / Tour
                  </label>
                  <select
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                  >
                    {availableTours.map((tour) => (
                      <option key={tour} value={tour} className="bg-white text-[#292f16] py-1">
                        {tour}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Package Tier & Trip Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Package / Accommodation Tier
                    </label>
                    <select
                      value={journeyTier}
                      onChange={(e) => setJourneyTier(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                    >
                      {journeyTiers.map((tier) => (
                        <option key={tier} value={tier} className="bg-white text-[#292f16]">
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Trip Style / Experience
                    </label>
                    <select
                      value={tripStyle}
                      onChange={(e) => setTripStyle(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                    >
                      {tripStyles.map((style) => (
                        <option key={style} value={style} className="bg-white text-[#292f16]">
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Dates & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Estimated Travel Dates / Month
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. November 2026, or flexible"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                    >
                      {durationOptions.map((dur) => (
                        <option key={dur} value={dur} className="bg-white text-[#292f16]">
                          {dur}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Group Size */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                    Group Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {groupSizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setGroupSize(size)}
                        className={`rounded-xl px-2.5 py-2 text-[11px] font-sans font-medium uppercase tracking-wider text-center transition-all ${
                          groupSize === size
                            ? "border border-[#3e5b34] bg-[#3e5b34] text-white font-bold shadow-md"
                            : "border border-[#292f16]/15 bg-[#f7f9f6] text-[#292f16]/80 hover:border-[#3e5b34] hover:text-[#3e5b34]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Dietary & Room Preferences */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                    Dietary & Room Preferences (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, Pescatarian, Ocean view, King bed"
                    value={dietaryOrPreferences}
                    onChange={(e) => setDietaryOrPreferences(e.target.value)}
                    className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2.5 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none transition-colors font-sans"
                  />
                </div>

                {/* 7. Custom Notes */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Flight arrival details, celebration, specific sites, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-[#292f16]/20 bg-[#f7f9f6] px-3.5 py-2 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none resize-none transition-colors font-sans"
                  />
                </div>

                {/* Submit / Add to Cart Actions */}
                <div className="pt-3 space-y-2.5">
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#3e5b34] bg-white py-3.5 px-5 font-anton text-xs uppercase tracking-wider text-[#3e5b34] hover:bg-[#3e5b34]/10 transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Add to Expedition Cart</span>
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#3e5b34] py-3.5 px-5 font-anton text-xs uppercase tracking-wider text-white shadow-md hover:bg-[#292f16] transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Book Direct via WhatsApp</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#292f16]/70 px-1 pt-1">
                    <span>Add multiple tours to book all in one single WhatsApp inquiry</span>
                    {totalCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          openCart("tours");
                        }}
                        className="text-[#3e5b34] font-bold hover:underline cursor-pointer"
                      >
                        View Cart ({totalCount}) →
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Global helper to trigger the modal from any component
export function openTripBookingModal(tourName?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-trip-booking", { detail: { tourName } }));
  }
}
