"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { openTripBookingModal } from "@/components/BookTripModal";

interface TourVideo {
  id: string;
  number: string;
  title: string;
  src: string;
}

const tourVideos: TourVideo[] = [
  {
    id: "tour-moment-1",
    number: "01",
    title: "Moment 01",
    src: "/videos/tour-moment-1.mp4",
  },
  {
    id: "tour-moment-2",
    number: "02",
    title: "Moment 02",
    src: "/videos/tour-moment-2.mp4",
  },
  {
    id: "tour-moment-3",
    number: "03",
    title: "Moment 03",
    src: "/videos/tour-moment-3.mp4",
  },
  {
    id: "tour-moment-4",
    number: "04",
    title: "Moment 04",
    src: "/videos/tour-moment-4.mp4",
  },
];

export default function HolidayCTA({ onPlay }: { onPlay: (src: string, title: string) => void }) {
  // Keeps track of which video currently has audio unmuted (null if all are muted)
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Synchronize audio state across video elements
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (id === activeAudioId) {
        el.muted = false;
        el.volume = 1.0;
        // Make sure it is playing if unmuted
        el.play().catch(() => {});
      } else {
        el.muted = true;
      }
    });
  }, [activeAudioId]);

  const toggleSound = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setActiveAudioId((current) => (current === id ? null : id));
  };

  const handleOpenFullscreen = (video: TourVideo, e: React.MouseEvent) => {
    e.stopPropagation();
    // Mute inline videos when opening modal
    setActiveAudioId(null);
    onPlay(video.src, video.title);
  };

  const scrollToVideos = () => {
    const el = document.getElementById("tour-moments-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="holiday" className="relative isolate overflow-hidden px-4 py-16 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
      {/* Background Image & Gradient */}
      <Image
        src="/images/independence-square.jpg"
        alt="Independence Square and Black Star Gate in Accra, Ghana"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        priority
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/80 to-black/60 backdrop-blur-[1px]" />

      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#ffbe17]">
            Immersive Cultural Tourism • Authentic Tour Moments
          </p>
          <h2 className="mt-4 font-anton text-[clamp(2.4rem,7.5vw,8.5rem)] uppercase leading-[0.96] tracking-normal text-white space-y-1 sm:space-y-2">
            <span className="block">Travel and enjoy</span>
            <span className="block text-[#ffbe17]">your holiday</span>
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-3.5 sm:gap-5">
            <button
              type="button"
              onClick={() => openTripBookingModal()}
              className="inline-flex items-center justify-center rounded-full bg-[#3e5b34] px-7 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(62,91,52,0.55)] transition-all hover:bg-[#292f16] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Book Trip</span>
            </button>

            <button
              type="button"
              onClick={scrollToVideos}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-black/50 px-5 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Watch tour videos"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffbe17] text-black text-[10px]">&#9654;</span>
              <span>Watch Moments</span>
            </button>
          </div>

          <p className="mt-5 sm:mt-7 max-w-xl text-xs sm:text-sm leading-relaxed text-white/80">
            Spend a few days close to the ocean, then follow the red-earth roads inland. Our small-group journeys connect Ghana&apos;s Atlantic shores, vibrant canopy rainforests, historic castles, and tranquil savanna quiet.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-white/90">
              Videos autoplay silently • <strong className="text-[#ffbe17]">Click any video or audio button to hear sound</strong>
            </span>
          </div>
        </div>

        {/* 4 Videos Grid */}
        <div
          id="tour-moments-grid"
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {tourVideos.map((video) => {
            const isAudioActive = activeAudioId === video.id;

            return (
              <motion.div
                key={video.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => toggleSound(video.id)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-2xl cursor-pointer aspect-[9/14] sm:aspect-[9/15] ${
                  isAudioActive
                    ? "border-[#ffbe17] ring-2 ring-[#ffbe17]/50 shadow-[0_0_35px_rgba(255,190,23,0.35)]"
                    : "border-white/15 hover:border-white/40"
                }`}
                role="button"
                tabIndex={0}
                aria-label={`${video.title} - ${isAudioActive ? "Click to mute" : "Click to hear sound"}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSound(video.id);
                  }
                }}
              >
                {/* HTML5 Autoplaying Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el;
                  }}
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Shading Gradients for clean text & button contrast */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />

                {/* Top Bar: Number Tag & Fullscreen trigger */}
                <div className="relative z-10 flex items-center justify-between p-3.5 sm:p-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/15">
                    <span className="font-anton text-[11px] tracking-wider text-[#ffbe17]">Moment {video.number}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleOpenFullscreen(video, e)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white/80 backdrop-blur-md border border-white/15 transition-all hover:bg-white hover:text-black hover:scale-110"
                    title="Open Fullscreen"
                    aria-label="Open Fullscreen"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  </button>
                </div>

                {/* Center Hover / Sound State Hint */}
                <div className="relative z-10 flex flex-1 items-center justify-center p-4">
                  {isAudioActive ? (
                    <div className="flex items-center gap-2 rounded-full bg-[#3e5b34]/90 px-4 py-2 text-xs font-anton tracking-wider uppercase text-white shadow-2xl backdrop-blur-md border border-white/30">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
                      <span>Audio Playing</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-full bg-black/75 px-3.5 py-1.5 text-[11px] font-anton tracking-wider uppercase text-white/90 shadow-xl backdrop-blur-md border border-white/20 opacity-90 transition-all group-hover:scale-105 group-hover:bg-[#ffbe17] group-hover:text-black group-hover:border-transparent">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9.77l-4.5-4.5H3v7h4l4.5 4.5v-7z"/></svg>
                      <span>Tap for Sound</span>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: Sound Toggle Button & Expand */}
                <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between gap-2">
                  {/* Primary Sound Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleSound(video.id, e)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isAudioActive
                        ? "bg-[#3e5b34] text-white shadow-[0_0_20px_rgba(62,91,52,0.8)] border border-emerald-300/40"
                        : "bg-black/75 text-white/90 backdrop-blur-md border border-white/25 hover:border-[#ffbe17] hover:bg-[#ffbe17] hover:text-black hover:scale-105"
                    }`}
                  >
                    {isAudioActive ? (
                      <>
                        {/* Animated equalizer waves */}
                        <span className="flex items-end gap-0.5 h-3">
                          <span className="inline-block w-1 bg-white animate-pulse" style={{ height: "60%" }} />
                          <span className="inline-block w-1 bg-white animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                          <span className="inline-block w-1 bg-white animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                        </span>
                        <span>Sound On</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                        <span>Click for Sound</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleOpenFullscreen(video, e)}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    Expand &rarr;
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
