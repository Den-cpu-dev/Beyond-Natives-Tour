"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { openTripBookingModal } from "@/components/BookTripModal";
import { openReviewModal } from "@/components/ReviewModal";
import { customerReviews } from "@/data/reviews";
import { WHATSAPP_NUMBER } from "@/data/whatsapp";

export default function CustomerReviews() {
  const [filter, setFilter] = useState<string>("all");

  const reviewWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Ayishetu & Beyond Native Tours! I would like to share a review about my tour experience with you."
  )}`;

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews and Traveler Stories"
      className="relative overflow-hidden bg-[#fbfbf9] px-4 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-32 border-t border-[#8d3f5c]/10"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-[#292f16]/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8d3f5c]/20 bg-white px-4 py-1.5 shadow-sm mb-4">
              {/* Star SVG */}
              <svg className="w-3.5 h-3.5 fill-[#ffbe17]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-anton text-[11px] uppercase tracking-[0.22em] text-[#3d2c5f]">
                Traveler Stories • 5.0 Rated Journeys
              </span>
            </div>

            <h2 className="font-anton text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.96]">
              <span className="text-[#3d2c5f]">Voices From</span>{" "}
              <span className="text-[#8d3f5c]">The Journey</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-[#292f16]/75 max-w-2xl leading-relaxed">
              Real stories from diaspora returnees, families, couples, and cultural explorers who traveled across Ghana and West Africa with Beyond Native Tours.
            </p>
          </div>

          {/* Social Proof Trust Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="rounded-2xl border border-[#292f16]/10 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 fill-[#ffbe17]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="font-anton text-sm text-[#3d2c5f] ml-1">5.0 / 5.0</span>
              </div>
              <p className="text-[11px] font-sans font-medium text-[#292f16]/70 mt-1">
                100% Recommended Cultural Agency
              </p>
            </div>

            <button
              type="button"
              onClick={() => openReviewModal()}
              className="inline-flex items-center gap-2 rounded-full border border-[#8d3f5c] bg-[#8d3f5c] px-5 py-2.5 font-anton text-xs uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:bg-[#3d2c5f] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-[#ffbe17]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Write A Review</span>
            </button>
          </div>
        </div>

        {/* ================= REVIEWS GRID ================= */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6 sm:gap-8">
          {customerReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col justify-between rounded-3xl border border-[#292f16]/10 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#8d3f5c]/30 hover:-translate-y-1"
            >
              <div>
                {/* Header: Stars + Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3.5 h-3.5 fill-[#ffbe17]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {review.badge && (
                    <span className="rounded-full bg-[#3e5b34]/10 px-2.5 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#3e5b34]">
                      {review.badge}
                    </span>
                  )}
                </div>

                {/* Tour Name */}
                <p className="font-anton text-[11px] uppercase tracking-[0.16em] text-[#8d3f5c] mb-2 line-clamp-1">
                  {review.tour}
                </p>

                {/* Review Title */}
                <h3 className="font-anton text-lg sm:text-xl uppercase tracking-tight text-[#292f16] group-hover:text-[#3d2c5f] transition-colors leading-snug mb-3">
                  &ldquo;{review.title}&rdquo;
                </h3>

                {/* Quote Body */}
                <p className="text-xs sm:text-sm text-[#292f16]/75 leading-relaxed">
                  {review.quote}
                </p>
              </div>

              {/* Traveler Bio Footer */}
              <div className="mt-6 pt-5 border-t border-[#292f16]/10 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${review.avatarBg} text-white font-anton text-xs shadow-sm`}
                >
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-anton text-xs sm:text-sm uppercase tracking-wide text-[#292f16] truncate">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-[#292f16]/60 truncate">
                    {review.location} • {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM CTA BANNER ================= */}
        <div className="mt-14 rounded-3xl bg-[#3d2c5f] p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-anton text-xs uppercase tracking-[0.2em] text-[#ffbe17]">
              Ready to write your own story?
            </span>
            <h3 className="mt-2 font-anton text-2xl sm:text-4xl uppercase tracking-tight leading-tight">
              Begin Your Journey Beyond The Surface
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed">
              Join our small-group cultural expeditions across Ghana, Togo, Benin, and beyond. Personalized, authentic, and unforgettable.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => openTripBookingModal()}
              className="inline-flex items-center justify-center rounded-full bg-[#ffbe17] px-7 py-3.5 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-[#3d2c5f] shadow-lg transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer font-bold"
            >
              <span>Book Your Trip</span>
            </button>
            <a
              href={reviewWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-anton text-xs sm:text-sm uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#3d2c5f] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
