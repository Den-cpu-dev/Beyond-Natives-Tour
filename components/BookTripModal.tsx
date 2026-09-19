"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTripBookingWhatsAppUrl, type TripBookingDetails } from "@/data/whatsapp";

const availableTours = [
  "Accra City Tour & Cultural Discovery",
  "Cape Coast Castle and Heritage Tour",
  "Togo Cultural Odyssey (Lomé & Beyond)",
  "Benin Kingdom & Dahomey Heritage Tour",
  "2 Days 3 Nights Northern Adventure Tour (Mole & Larabanga)",
  "Batik Making and Traditional Cooking Class",
  "Kwame Nkrumah Memorial Park & Cultural Sanctuaries",
  "Custom Bespoke Journey (Tailored Itinerary)",
];

const groupSizes = [
  "1 Solo Traveller",
  "2 Travellers (Duo / Couple)",
  "3–5 Travellers",
  "6–10 Travellers",
  "10+ Large Group",
];

const durationOptions = ["1 Day Excursion", "2–3 Days", "4–7 Days", "1–2 Weeks", "Custom Duration"];

export default function BookTripModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [tourName, setTourName] = useState(availableTours[0]);
  const [travelDate, setTravelDate] = useState("");
  const [groupSize, setGroupSize] = useState(groupSizes[1]);
  const [duration, setDuration] = useState(durationOptions[1]);
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

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
            className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/20 bg-ink p-5 sm:p-8 shadow-2xl text-white my-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/20 bg-white/5 grid place-items-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close booking modal"
            >
              &times;
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)] animate-pulse" />
              <span className="font-anton text-[10px] uppercase tracking-[0.2em] text-ember">
                Direct Expedition Booking
              </span>
            </div>

            <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
              Reserve Your Expedition
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/70 leading-relaxed">
              Fill out your trip details below. When you submit, your full itinerary inquiry will open directly in our curator&apos;s WhatsApp DM.
            </p>

            {sentSuccess ? (
              <div className="mt-6 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-black">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h3 className="font-anton text-lg uppercase text-white">WhatsApp Chat Opened!</h3>
                <p className="mt-1 text-xs text-white/80 leading-relaxed">
                  Your booking details have been prepared for WhatsApp. Send the message in your chat to finalize your dates and questions with our host!
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-anton uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
                {errorMsg && (
                  <div className="rounded-xl border border-ember/40 bg-ember/15 px-3.5 py-2 text-xs text-ember font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      Your Full Name <span className="text-ember">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-ember focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      WhatsApp Phone or Email <span className="text-ember">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+1 (555) 000-0000 or email"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-ember focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* 2. Select Expedition */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Select Expedition / Tour
                  </label>
                  <select
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-ember focus:outline-none transition-colors font-sans"
                  >
                    {availableTours.map((tour) => (
                      <option key={tour} value={tour} className="bg-neutral-900 text-white py-1">
                        {tour}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Dates & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      Estimated Travel Dates / Month
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. November 2026, or flexible"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-ember focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                      Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-ember focus:outline-none transition-colors font-sans"
                    >
                      {durationOptions.map((dur) => (
                        <option key={dur} value={dur} className="bg-neutral-900 text-white">
                          {dur}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Group Size */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
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
                            ? "border border-white bg-white text-black font-bold shadow-md"
                            : "border border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Custom Notes */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Dietary preferences, flight arrival details, celebration, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-white/40 focus:border-ember focus:outline-none resize-none transition-colors font-sans"
                  />
                </div>

                {/* Submit Booking Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-full bg-ember py-3.5 px-6 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(255,59,48,0.4)] transition-all hover:bg-[#e0342a] hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <span>Book Trip</span>
                  </button>
                  <p className="mt-2 text-center text-[10px] text-white/50">
                    Connects directly to our curator&apos;s WhatsApp DM with your details pre-formatted
                  </p>
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
