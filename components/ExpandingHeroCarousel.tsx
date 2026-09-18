"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Destination } from "@/data/destinations";

interface ExpandingHeroCarouselProps {
  destinations: Destination[];
}

export default function ExpandingHeroCarousel({ destinations }: ExpandingHeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandingTarget, setExpandingTarget] = useState<Destination | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = destinations.length;
  const current = destinations[activeIndex];

  // Upcoming queue of cards (next 4 destinations)
  const queue = Array.from({ length: Math.min(4, count - 1) }, (_, i) => {
    const idx = (activeIndex + 1 + i) % count;
    return {
      destination: destinations[idx],
      index: idx,
      queuePosition: i,
    };
  });

  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || isExpanding) return;

      const targetDest = destinations[targetIndex];
      setExpandingTarget(targetDest);
      setIsExpanding(true);
      setPrevIndex(activeIndex);

      // Trigger card expansion animation then switch active slide
      const timer = setTimeout(() => {
        setActiveIndex(targetIndex);
        setIsExpanding(false);
        setExpandingTarget(null);
      }, 700);

      return () => clearTimeout(timer);
    },
    [activeIndex, count, destinations, isExpanding],
  );

  const handleNext = useCallback(() => {
    goToSlide((activeIndex + 1) % count);
  }, [activeIndex, count, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((activeIndex - 1 + count) % count);
  }, [activeIndex, count, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  // Optional gentle auto-advance (pauses on hover)
  useEffect(() => {
    if (isPaused || isExpanding) return;
    const interval = setInterval(() => {
      goToSlide((activeIndex + 1) % count);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, count, goToSlide, isPaused, isExpanding]);

  // Calculate progress percentage (0 to 100)
  const progressPercent = count > 1 ? (activeIndex / (count - 1)) * 100 : 0;

  return (
    <section
      id="top"
      aria-label="Featured Travel Destinations"
      className="relative h-[100svh] min-h-[640px] w-full select-none overflow-hidden bg-ink"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ================= BACKGROUND LAYER ================= */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${current.id}`}
            initial={{ opacity: 0.2, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.heroImage}
              alt={current.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradients for contrast & typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      </div>

      {/* ================= EXPANDING CARD OVERLAY (Signature "Cards Opening") ================= */}
      <AnimatePresence>
        {isExpanding && expandingTarget && (
          <motion.div
            key={`expanding-${expandingTarget.id}`}
            initial={{
              position: "absolute",
              right: typeof window !== "undefined" && window.innerWidth < 640 ? "1rem" : "4%",
              bottom: typeof window !== "undefined" && window.innerWidth < 640 ? "4rem" : "7%",
              width: typeof window !== "undefined" && window.innerWidth < 640 ? "135px" : "240px",
              height: typeof window !== "undefined" && window.innerWidth < 640 ? "180px" : "340px",
              borderRadius: "1.25rem",
              zIndex: 30,
              opacity: 1,
            }}
            animate={{
              right: "0%",
              bottom: "0%",
              width: "100%",
              height: "100%",
              borderRadius: "0rem",
              zIndex: 30,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.72,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden shadow-2xl"
          >
            <Image
              src={expandingTarget.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO CONTENT & CONTROLS CONTAINER ================= */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-4 pb-4 pt-20 sm:px-10 sm:pb-10 sm:pt-28 lg:px-16">
        
        {/* Top spacer (Header sits fixed above) */}
        <div className="hidden sm:block" />

        {/* Middle Section: Left Content + Right Card Carousel */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-12 mt-auto mb-3 sm:mb-8">
          
          {/* LEFT: Text & Discovery CTA */}
          <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {/* Location Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${current.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mb-2 sm:mb-4 flex items-center gap-2.5 sm:gap-3"
              >
                <span className="h-[2px] w-5 sm:w-8 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                <span className="font-anton text-[11px] sm:text-sm uppercase tracking-[0.2em] text-white/90">
                  {current.subtitle || `${current.region} - ${current.country}`}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Bold Display Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-anton text-[clamp(1.85rem,4.8vw,4.8rem)] uppercase leading-[0.9] sm:leading-[0.88] tracking-tight text-white drop-shadow-md break-words"
              >
                <span className="block">{current.titleLine1 || current.name}</span>
                {current.titleLine2 && (
                  <span className="block text-white/90">{current.titleLine2}</span>
                )}
              </motion.h1>
            </AnimatePresence>

            {/* Narrative Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${current.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2.5 sm:mt-5 max-w-lg text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/75 line-clamp-3 sm:line-clamp-none"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Button */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${current.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-7"
              >
                <a
                  href="#destinations"
                  className="group inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-white/30 bg-black/40 px-4 py-2 sm:px-6 sm:py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:border-ember hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,59,48,0.35)]"
                >
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110 group-hover:bg-ember group-hover:text-white">
                    <svg className="h-2 w-2 sm:h-2.5 sm:w-2.5 translate-x-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {current.id === "beyond-native-tours" ? "Explore Expeditions" : "Discover Location"}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Floating Preview Cards ("Upcoming Queue") */}
          <div className="relative w-full lg:w-auto overflow-x-auto lg:overflow-visible no-scrollbar pb-1 lg:pb-0">
            <div className="flex items-center gap-2.5 sm:gap-4.5 min-w-max">
              <AnimatePresence initial={false} mode="popLayout">
                {queue.map(({ destination, index, queuePosition }) => (
                  <motion.button
                    key={destination.id}
                    layout
                    initial={{ opacity: 0, x: 60, scale: 0.92 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      x: -50,
                      transition: { duration: 0.35 },
                    }}
                    whileHover={{
                      scale: 1.04,
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => goToSlide(index)}
                    className="group relative h-[180px] w-[135px] sm:h-[290px] sm:w-[210px] md:h-[320px] md:w-[230px] shrink-0 overflow-hidden rounded-xl sm:rounded-3xl border border-white/20 bg-black/40 text-left shadow-2xl backdrop-blur-sm transition-shadow hover:border-white/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                    aria-label={`View ${destination.name}`}
                  >
                    {/* Card Image */}
                    <Image
                      src={destination.thumbnailImage}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 640px) 150px, 230px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                    {/* Glowing highlight ring on hover */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/0 transition-colors duration-300 group-hover:border-white/40" />

                    {/* Card Content (Title in bold condensed uppercase) */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                      <p className="font-anton text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ember mb-0.5 sm:mb-1">
                        {destination.country}
                      </p>
                      <h3 className="font-anton text-xs sm:text-[15px] md:text-base uppercase leading-[0.95] tracking-tight text-white drop-shadow-sm">
                        <span className="block">{destination.titleLine1 || destination.name}</span>
                        {destination.titleLine2 && (
                          <span className="block text-white/85">{destination.titleLine2}</span>
                        )}
                      </h3>
                    </div>

                    {/* Position indicator badge (e.g. 02, 03) */}
                    <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/40 border border-white/20 font-anton text-[10px] sm:text-xs text-white/90 backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* BOTTOM: Slider Scrubber & Arrow Controls */}
        <div className="flex items-center justify-between gap-4 pt-2 sm:pt-4 border-t border-white/15">
          
          {/* Slider Progress Bar */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
            {/* Current Index Number */}
            <span className="font-anton text-sm sm:text-base text-white tracking-widest min-w-[2ch]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            {/* Clickable Scrubber Track */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                const targetIdx = Math.round(ratio * (count - 1));
                goToSlide(targetIdx);
              }}
              className="group relative h-4 flex-1 cursor-pointer flex items-center"
              role="slider"
              aria-label="Carousel slide progress"
              aria-valuenow={activeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={count}
            >
              {/* Background Track */}
              <div className="h-[2px] w-full rounded-full bg-white/25 transition-colors group-hover:bg-white/35" />

              {/* Active Filled Progress Bar */}
              <motion.div
                className="absolute left-0 h-[2px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Scrubber Dot */}
              <motion.div
                className="absolute h-3 w-3 sm:h-3.5 sm:w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-ember shadow-[0_0_12px_rgba(255,59,48,0.9)]"
                animate={{ left: `${progressPercent}%` }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Total Count Number */}
            <span className="font-anton text-sm sm:text-base text-white/50 tracking-widest min-w-[2ch]">
              {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Previous & Next Arrow Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isExpanding}
              aria-label="Previous destination"
              className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-white hover:text-black active:scale-95 disabled:opacity-50"
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-x-0.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isExpanding}
              aria-label="Next destination"
              className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-white hover:text-black active:scale-95 disabled:opacity-50"
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 translate-x-0.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
