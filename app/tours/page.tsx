"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { openTripBookingModal } from "@/components/BookTripModal";
import { allTours, countryList, type Tour, type CountryInfo } from "@/data/tours";

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
    <main className="min-h-screen bg-ink text-white selection:bg-ember selection:text-white">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24 overflow-hidden border-b border-white/10">
        {/* Ambient background glow */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-ember/30 via-red-950/20 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 text-center">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-[2px] w-6 sm:w-8 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-ember">
              Beyond Native Tours • West Africa Catalog
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
          </div>

          <h1 className="font-anton text-4xl sm:text-7xl lg:text-8xl uppercase leading-[0.98] tracking-normal text-white drop-shadow-lg">
            Curated Tours & Expeditions
          </h1>

          <p className="mt-5 sm:mt-7 text-sm sm:text-lg md:text-xl leading-relaxed text-white/80 max-w-2xl mx-auto font-light">
            Slow, intimate cultural journeys connecting you with living traditions, sacred ancestral sanctuaries, and native hosts across West Africa.
          </p>
        </div>
      </section>

      {/* ================= CATALOG SECTION & FILTERS ================= */}
      <section id="tours-catalog" className="py-12 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          
          {/* Controls Bar: Filter Tabs + Search Input */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
            
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
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                        : "border border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/10"
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
                className="w-full rounded-full border border-white/20 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-ember focus:outline-none transition-colors"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
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
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-md"
              >
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-ember">
                      Featured Country Spotlight
                    </span>
                  </div>
                  <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-normal text-white">
                    {activeCountryInfo.name}
                  </h2>
                  <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-white/90">
                    {activeCountryInfo.tagline}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/70">
                    {activeCountryInfo.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tours Grid */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/5">
              <p className="font-anton text-xl sm:text-2xl uppercase tracking-wider text-white/80">
                No tours found
              </p>
              <p className="mt-2 text-xs sm:text-sm text-white/50">
                Try selecting &ldquo;All Tours&rdquo; or adjusting your search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-anton text-xs uppercase tracking-wider text-black hover:bg-ember hover:text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <article
                  key={tour.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-2xl transition-all duration-300 hover:border-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                    {/* Top Badges: Country + Custom Tag */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-anton text-[10px] uppercase tracking-wider text-white border border-white/20">
                        {tour.country}
                      </span>
                      {tour.badge && (
                        <span className="rounded-full bg-ember px-2.5 py-0.5 font-anton text-[10px] uppercase tracking-wider text-white shadow-md">
                          {tour.badge}
                        </span>
                      )}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white/90 border border-white/15">
                      <svg className="w-3.5 h-3.5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{tour.duration}</span>
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                    <div>
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-ember mb-1.5">
                        {tour.region}
                      </p>

                      <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-normal text-white leading-snug mb-3">
                        {tour.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] leading-relaxed text-white/70 mb-5">
                        {tour.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 border-t border-white/10 pt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                          Experience Highlights
                        </p>
                        <ul className="space-y-1.5">
                          {tour.highlights.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/85">
                              <span className="text-ember mt-0.5 shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Book Trip CTA */}
                    <div className="pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => openTripBookingModal(tour.title)}
                        className="w-full inline-flex items-center justify-center rounded-full bg-ember py-3.5 px-6 font-anton text-xs uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(255,59,48,0.35)] transition-all hover:bg-[#e0342a] hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        <span>Book Trip</span>
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink text-white flex items-center justify-center font-anton">Loading Tours...</div>}>
      <ToursContent />
    </Suspense>
  );
}
