"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "@/data/whatsapp";

export function openReviewModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-review-modal"));
  }
}

const tourOptions = [
  "Accra Heritage, Cooking Class & Batik Workshop",
  "Ancestral Naming Ceremony & Cape Coast Dungeons",
  "Kakum Rainforest Canopy & Elmina Castle",
  "West Africa Multi-Country (Ghana, Togo & Benin)",
  "Togo Sacred Shrines & Lake Togo Heritage",
  "Benin Ouidah Python Temple & Ganvié Stilt Village",
  "Liberia Monrovia & Robertsport Coastal Surf",
  "Ivory Coast Modernity, Grand-Bassam & Yamoussoukro",
  "Sierra Leone Freetown Heritage & Peninsula Beaches",
  "Native Habits Products (Herbal Teas, Shea Butter, Wild Honey)",
  "Custom Bespoke Journey / Other",
];

export default function ReviewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tour, setTour] = useState(tourOptions[0]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [favoriteMemory, setFavoriteMemory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setSentSuccess(false);
      setErrorMsg("");
      setCopied(false);
      setIsOpen(true);
    };

    window.addEventListener("open-review-modal", handleOpen);
    return () => window.removeEventListener("open-review-modal", handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const generateReviewMessage = () => {
    const stars = "⭐".repeat(rating);
    return `🌟 NEW TRAVELER REVIEW FOR BEYOND NATIVE TOURS 🌟

👤 Traveler: ${name.trim()}
📍 From: ${location.trim() || "Visitor / Traveler"}
🗺️ Tour / Experience: ${tour}
⭐ Rating: ${rating}/5 Stars (${stars})
📝 Title: "${title.trim() || "Unforgettable Journey"}"

💬 Review & Story:
"${reviewText.trim()}"

${favoriteMemory.trim() ? `✨ Highlight / Favorite Memory:\n"${favoriteMemory.trim()}"\n` : ""}-----------------------------------------
Submitted via Beyond Native Tours Website for Aisha's review & publishing.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!reviewText.trim()) {
      setErrorMsg("Please share a few words about your experience.");
      return;
    }

    setErrorMsg("");
    const message = generateReviewMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSentSuccess(true);
  };

  const handleCopy = () => {
    const message = generateReviewMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-3xl bg-[#fbfbf9] p-6 sm:p-8 shadow-2xl border border-[#8d3f5c]/20 max-h-[92vh] overflow-y-auto z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 rounded-full bg-white/80 p-2 text-[#292f16]/60 hover:text-[#292f16] hover:bg-white shadow-sm transition-all cursor-pointer"
              aria-label="Close review modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {sentSuccess ? (
              /* Success State */
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffbe17]/20 text-[#ffbe17]">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <span className="font-anton text-xs uppercase tracking-[0.2em] text-[#8d3f5c]">
                  Thank You, {name}!
                </span>
                <h3 className="mt-1 font-anton text-2xl sm:text-3xl uppercase tracking-tight text-[#3d2c5f]">
                  Your Review Has Been Shared
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#292f16]/75 max-w-md mx-auto leading-relaxed">
                  Your words mean the world to Aisha and our local community guides. Your review has been dispatched to WhatsApp so Aisha can review and feature it on the site.
                </p>

                {/* Review Preview Card */}
                <div className="mt-6 rounded-2xl border border-[#8d3f5c]/20 bg-white p-5 text-left shadow-sm">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className={`w-4 h-4 ${s <= rating ? "fill-[#ffbe17]" : "fill-neutral-200"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-xs font-anton text-[#8d3f5c] uppercase tracking-wider">{tour}</span>
                  </div>
                  {title && <p className="font-anton text-base uppercase text-[#3d2c5f] mb-1">&ldquo;{title}&rdquo;</p>}
                  <p className="text-xs text-[#292f16]/80 italic leading-relaxed">&ldquo;{reviewText}&rdquo;</p>
                  <p className="mt-3 text-[11px] font-semibold text-[#8d3f5c]">— {name}{location ? `, ${location}` : ""}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#292f16]/20 bg-white px-4 py-2 font-anton text-xs uppercase tracking-wider text-[#292f16] shadow-sm hover:bg-neutral-50 transition cursor-pointer"
                  >
                    <span>{copied ? "✓ Copied Review!" : "Copy Review Text"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const message = generateReviewMessage();
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-5 py-2 font-anton text-xs uppercase tracking-wider text-white shadow-sm hover:brightness-105 transition cursor-pointer"
                  >
                    <span>Open in WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center rounded-full bg-[#3d2c5f] px-5 py-2 font-anton text-xs uppercase tracking-wider text-white shadow-sm hover:bg-[#8d3f5c] transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Review Form */
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8d3f5c]/20 bg-white px-3.5 py-1 shadow-sm mb-3">
                  <svg className="w-3.5 h-3.5 fill-[#ffbe17]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-anton text-[11px] uppercase tracking-[0.2em] text-[#3d2c5f]">
                    Share Your Experience
                  </span>
                </div>

                <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight text-[#3d2c5f] leading-tight">
                  Write A Review
                </h2>
                <p className="mt-1 text-xs text-[#292f16]/70 leading-relaxed">
                  Your feedback helps fellow travelers discover authentic West African heritage and supports our local community team.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const filled = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          >
                            <svg
                              className={`w-7 h-7 transition-colors ${
                                filled ? "fill-[#ffbe17] text-[#ffbe17]" : "fill-neutral-200 text-neutral-200"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        );
                      })}
                      <span className="ml-2 font-anton text-xs text-[#8d3f5c] uppercase tracking-wider">
                        {rating === 5 ? "5.0 • Exceptional" : `${rating}.0 Stars`}
                      </span>
                    </div>
                  </div>

                  {/* Name & Location Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jocelyn M."
                        className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] placeholder:text-[#292f16]/40 focus:border-[#8d3f5c] focus:outline-none focus:ring-1 focus:ring-[#8d3f5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1">
                        Location / Country
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Atlanta, GA, USA"
                        className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] placeholder:text-[#292f16]/40 focus:border-[#8d3f5c] focus:outline-none focus:ring-1 focus:ring-[#8d3f5c]"
                      />
                    </div>
                  </div>

                  {/* Tour Experience Dropdown */}
                  <div>
                    <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1">
                      Tour / Product Experienced
                    </label>
                    <select
                      value={tour}
                      onChange={(e) => setTour(e.target.value)}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3 py-2.5 text-xs text-[#292f16] focus:border-[#8d3f5c] focus:outline-none focus:ring-1 focus:ring-[#8d3f5c]"
                    >
                      {tourOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Review Headline / Title */}
                  <div>
                    <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1">
                      Headline / Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Warmest hospitality & unforgettable memories!"
                      className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] placeholder:text-[#292f16]/40 focus:border-[#8d3f5c] focus:outline-none focus:ring-1 focus:ring-[#8d3f5c]"
                    />
                  </div>

                  {/* Review Quote / Text */}
                  <div>
                    <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1">
                      Your Review & Story *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell us about your journey with Aisha and Beyond Native Tours..."
                      className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] placeholder:text-[#292f16]/40 focus:border-[#8d3f5c] focus:outline-none focus:ring-1 focus:ring-[#8d3f5c] leading-relaxed"
                    />
                  </div>

                  {/* Favorite Memory (optional) */}
                  <div>
                    <label className="block text-xs font-anton uppercase tracking-wider text-[#3d2c5f] mb-1">
                      Favorite Moment or Memory (Optional)
                    </label>
                    <input
                      type="text"
                      value={favoriteMemory}
                      onChange={(e) => setFavoriteMemory(e.target.value)}
                      placeholder="e.g. Having dinner at Aisha's home, or the drumming lesson"
                      className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] placeholder:text-[#292f16]/40 focus:border-[#8d3f5c] focus:outline-none focus:ring-1 focus:ring-[#8d3f5c]"
                    />
                  </div>

                  {/* Error Message */}
                  {errorMsg && (
                    <p className="rounded-lg bg-red-50 p-2 text-xs text-red-600 font-medium">{errorMsg}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#3d2c5f] px-6 py-3.5 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:bg-[#8d3f5c] hover:scale-[1.01] active:scale-95 cursor-pointer font-bold"
                    >
                      <svg className="w-4 h-4 fill-current text-[#ffbe17]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Submit My Review</span>
                    </button>
                    <p className="mt-2 text-center text-[10px] text-[#292f16]/60">
                      Reviews are submitted directly to Aisha for verification and published to the website.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
