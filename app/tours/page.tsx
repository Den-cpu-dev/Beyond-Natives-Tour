"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { openTripBookingModal } from "@/components/BookTripModal";
import { allTours, countryList, type Tour, type CountryInfo } from "@/data/tours";
import { useCart } from "@/context/CartContext";

const filterTabs = [
  { id: "all", label: "All Tours" },
  { id: "ghana", label: "Ghana" },
  { id: "togo", label: "Togo" },
  { id: "benin", label: "Benin" },
  { id: "liberia", label: "Liberia" },
  { id: "ivory-coast", label: "Ivory Coast" },
  { id: "sierra-leone", label: "Sierra Leone" },
];

function ToursContent() {
  const searchParams = useSearchParams();
  const initialCountry = searchParams?.get("country") || "all";

  const [activeFilter, setActiveFilter] = useState<string>(initialCountry);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlyer, setSelectedFlyer] = useState<Tour | null>(null);
  const { addTour, openCart, tourItems } = useCart();

  const handleQuickAddToCart = (tour: Tour) => {
    addTour({
      tourTitle: tour.title,
      country: tour.country,
      duration: tour.duration,
      pricing: tour.pricing,
      image: tour.image,
      groupSize: "2 Travellers (Duo / Couple)",
      journeyTier: tour.pricing ? tour.pricing : "Standard (3-Star / Group)",
      tripStyle: "Cultural & Heritage",
    });
  };

  // Sync state when URL query parameter changes
  useEffect(() => {
    const countryParam = searchParams?.get("country");
    if (countryParam && filterTabs.some((tab) => tab.id === countryParam)) {
      setActiveFilter(countryParam);
      // Smooth scroll down to tours container
      const el = document.getElementById("tours-catalog");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [searchParams]);

  // Selected country details for spotlight header
  const activeCountryInfo: CountryInfo | undefined = useMemo(() => {
    return countryList.find((c) => c.id === activeFilter);
  }, [activeFilter]);

  // Filtered tours based on country tab and search query
  const filteredTours = useMemo(() => {
    return allTours.filter((tour) => {
      const matchesCountry = activeFilter === "all" || tour.countryId === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCountry && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <main className="min-h-screen bg-white text-[#292f16] selection:bg-[#3e5b34] selection:text-white">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24 overflow-hidden border-b border-[#292f16]/10 bg-gradient-to-b from-[#f7f9f6] to-white">
        {/* Ambient background glow */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-[#3e5b34]/15 via-[#ffbe17]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-[2px] w-6 sm:w-8 bg-[#3e5b34]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#3e5b34]">
              <span className="text-[#3d2c5f] font-bold">Beyond</span> Native Tours • West Africa Catalog
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#3e5b34]" />
          </div>

          <h1 className="font-anton text-4xl sm:text-7xl lg:text-8xl uppercase leading-[0.98] tracking-normal text-[#292f16]">
            Curated Tours & Expeditions
          </h1>

          <p className="mt-5 sm:mt-7 text-sm sm:text-lg md:text-xl leading-relaxed text-[#292f16]/80 max-w-2xl mx-auto font-light">
            Slow, intimate cultural journeys connecting you with living traditions, sacred ancestral sanctuaries, and native hosts across West Africa.
          </p>
        </div>
      </section>

      {/* ================= CATALOG SECTION & FILTERS ================= */}
      <section id="tours-catalog" className="py-12 sm:py-20 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="mx-auto max-w-[1500px]">
          
          {/* Controls Bar: Filter Tabs + Search Input */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-[#292f16]/10">
            
            {/* Country Tabs Rail */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0 touch-pan-x">
              {filterTabs.map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-anton uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-[#3e5b34] text-white shadow-[0_0_15px_rgba(62,91,52,0.35)] scale-105"
                        : "border border-[#292f16]/15 bg-[#f7f9f6] text-[#292f16]/80 hover:border-[#3e5b34] hover:text-[#3e5b34] hover:bg-[#3e5b34]/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search tours, sites, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#292f16]/20 bg-[#f7f9f6] pl-10 pr-4 py-2.5 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none transition-colors"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#292f16]/40 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#292f16]/50 hover:text-[#292f16]"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Optional Country Spotlight Banner */}
          <AnimatePresence mode="wait">
            {activeCountryInfo && (
              <motion.div
                key={`spotlight-${activeCountryInfo.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-3xl border border-[#3e5b34]/25 bg-gradient-to-r from-[#f7f9f6] via-white to-[#f7f9f6] p-6 sm:p-8 mb-12 shadow-lg"
              >
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-[#3e5b34]" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#3e5b34]">
                      Featured Country Spotlight
                    </span>
                  </div>
                  <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-normal text-[#292f16]">
                    {activeCountryInfo.name}
                  </h2>
                  <p className="mt-1 font-sans text-xs sm:text-sm font-semibold text-[#3e5b34]">
                    {activeCountryInfo.tagline}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#292f16]/80">
                    {activeCountryInfo.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tours Grid */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-20 border border-[#292f16]/15 rounded-3xl bg-[#f7f9f6]">
              <p className="font-anton text-xl sm:text-2xl uppercase tracking-wider text-[#292f16]">
                No tours found
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#292f16]/60">
                Try selecting &ldquo;All Tours&rdquo; or adjusting your search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3e5b34] px-6 py-2.5 font-anton text-xs uppercase tracking-wider text-white hover:bg-[#292f16] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <article
                  key={tour.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-[#292f16]/15 bg-white shadow-xl transition-all duration-300 hover:border-[#3e5b34] hover:shadow-[0_20px_40px_rgba(41,47,22,0.12)] hover:-translate-y-1"
                >
                  {/* Tour Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                    {/* Top Badges: Country + Custom Tag */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-anton text-[10px] uppercase tracking-wider text-white border border-white/20">
                        {tour.country}
                      </span>
                      {tour.badge && (
                        <span className="rounded-full bg-[#3e5b34] px-2.5 py-0.5 font-anton text-[10px] uppercase tracking-wider text-white shadow-md">
                          {tour.badge}
                        </span>
                      )}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white/90 border border-white/15">
                      <svg className="w-3.5 h-3.5 text-[#ffbe17]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{tour.duration}</span>
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                    <div>
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#3e5b34] mb-1.5">
                        {tour.region}
                      </p>

                      <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-normal text-[#292f16] leading-snug mb-2">
                        {tour.title}
                      </h3>

                      {/* Tagline */}
                      {tour.tagline && (
                        <p className="font-serif italic text-xs text-[#3e5b34] font-medium mb-2.5">
                          &ldquo;{tour.tagline}&rdquo;
                        </p>
                      )}

                      {/* Pricing badge if present */}
                      {tour.pricing && (
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#3e5b34]/10 border border-[#3e5b34]/25 px-3 py-1 text-[11px] font-anton uppercase tracking-wider text-[#3e5b34]">
                          <span>💰 {tour.pricing}</span>
                        </div>
                      )}

                      <p className="text-xs sm:text-[13px] leading-relaxed text-[#292f16]/75 mb-4">
                        {tour.description}
                      </p>

                      {/* Tour Includes Badge Box */}
                      {tour.includes && tour.includes.length > 0 && (
                        <div className="mb-4 rounded-2xl bg-[#f7f9f6] border border-[#3e5b34]/20 p-3">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-anton uppercase tracking-wider text-[#3e5b34] flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3e5b34]" />
                              Tour Includes:
                            </span>
                            {tour.motto && (
                              <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#292f16]/60">
                                {tour.motto}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {tour.includes.map((inc, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#292f16] shadow-sm border border-[#292f16]/10"
                              >
                                <span className="text-[#3e5b34] font-bold">✓</span>
                                {inc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      <div className="space-y-2 border-t border-[#292f16]/10 pt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#292f16]/50">
                          Experience Highlights
                        </p>
                        <ul className="space-y-1.5">
                          {tour.highlights.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#292f16]/85">
                              <span className="text-[#3e5b34] font-bold mt-0.5 shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities if specified */}
                      {tour.activities && tour.activities.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#292f16]/10">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e5b34] mb-2 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ffbe17]" />
                            Featured Activities
                          </p>
                          <ul className="space-y-1">
                            {tour.activities.slice(0, 4).map((act, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#292f16]/80">
                                <span className="text-[#3e5b34] font-bold shrink-0">•</span>
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action CTAs */}
                    <div className="pt-4 border-t border-[#292f16]/10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openTripBookingModal(tour.title)}
                          className="flex-1 inline-flex items-center justify-center rounded-full bg-[#3e5b34] py-3.5 px-4 font-anton text-xs uppercase tracking-[0.14em] text-white shadow-md transition-all hover:bg-[#292f16] hover:scale-[1.01] active:scale-95 cursor-pointer"
                        >
                          <span>Configure & Book</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAddToCart(tour)}
                          className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#3e5b34] bg-white hover:bg-[#3e5b34]/10 px-3.5 py-3 font-anton text-xs uppercase tracking-wider text-[#3e5b34] transition-all cursor-pointer"
                          title="Add directly to Expedition Cart"
                        >
                          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span>+ Cart</span>
                        </button>
                        {tour.flyerImage && (
                          <button
                            type="button"
                            onClick={() => setSelectedFlyer(tour)}
                            className="inline-flex items-center justify-center rounded-full border border-[#292f16]/20 bg-[#f7f9f6] hover:bg-[#292f16]/10 h-10 w-10 text-[#292f16] transition-all cursor-pointer shrink-0"
                            title="View Official Flyer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ================= FLYER PREVIEW MODAL ================= */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelectedFlyer(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#292f16]/10">
                <div>
                  <h4 className="font-anton text-lg uppercase text-[#292f16]">
                    {selectedFlyer.title}
                  </h4>
                  <p className="text-[11px] font-sans text-[#3e5b34] font-semibold">
                    Beyond Native Tours • Official Itinerary Flyer
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFlyer(null)}
                  className="h-8 w-8 rounded-full bg-[#292f16]/10 hover:bg-[#292f16]/20 flex items-center justify-center text-[#292f16] font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner border border-[#292f16]/10 bg-neutral-100">
                <Image
                  src={selectedFlyer.flyerImage || selectedFlyer.image}
                  alt={`${selectedFlyer.title} Flyer`}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedFlyer.title;
                    setSelectedFlyer(null);
                    openTripBookingModal(title);
                  }}
                  className="flex-1 rounded-full bg-[#3e5b34] py-3 text-center font-anton text-xs uppercase tracking-wider text-white hover:bg-[#292f16] transition-colors cursor-pointer"
                >
                  Configure & Book
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleQuickAddToCart(selectedFlyer);
                    setSelectedFlyer(null);
                  }}
                  className="rounded-full border-2 border-[#3e5b34] bg-white px-4 py-2.5 text-center font-anton text-xs uppercase tracking-wider text-[#3e5b34] hover:bg-[#3e5b34]/10 transition-colors cursor-pointer"
                >
                  + Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFlyer(null)}
                  className="rounded-full border border-[#292f16]/20 px-4 py-2.5 text-center font-anton text-xs uppercase tracking-wider text-[#292f16] hover:bg-[#292f16]/5 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-[#292f16] flex items-center justify-center font-anton">Loading Tours...</div>}>
      <ToursContent />
    </Suspense>
  );
}
