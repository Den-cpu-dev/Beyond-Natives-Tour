"use client";

import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import type { Destination } from "@/data/destinations";
import DestinationCard from "./DestinationCard";
import Hero from "./Hero";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStackSection({ destinations }: { destinations: Destination[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, section);

    return () => context.revert();
  }, []);

  const segmentCount = destinations.length;
  const travel = progress * segmentCount;
  const activeIndex = Math.min(segmentCount - 1, Math.floor(travel + 0.0001));
  const crossfade = activeIndex === segmentCount - 1 ? 0 : travel - activeIndex;
  const destination = destinations[activeIndex];
  const nextDestination = destinations[Math.min(activeIndex + 1, segmentCount - 1)];

  // Build a 3-card queue of the next upcoming destinations
  const queue: Destination[] = [];
  for (let i = 1; i <= 3; i++) {
    const idx = (activeIndex + i) % segmentCount;
    if (queue.length < 3) queue.push(destinations[idx]);
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${(segmentCount + 1) * 100}svh` }}
      aria-label="Explore Morocco locations"
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <Hero
          destinations={destinations}
          destination={destination}
          nextDestination={nextDestination}
          crossfade={crossfade}
          activeIndex={activeIndex}
        />

        {/* Vertical scroll-progress track — left edge */}
        <div className="pointer-events-none absolute inset-y-0 left-4 z-20 hidden w-10 pt-[24svh] sm:left-8 sm:block lg:left-14">
          <div
            className="pointer-events-auto flex h-[58svh] flex-col items-center"
            role="progressbar"
            aria-label="Scroll progress through destinations"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <a
              href="#destinations"
              className="mb-4 -rotate-90 whitespace-nowrap rounded-full border border-white/35 bg-black/25 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur"
            >
              Discover location
            </a>
            <div className="relative w-px flex-1 bg-white/35">
              <span
                className="absolute -left-[5px] h-3 w-3 rounded-full border border-white bg-ember shadow-[0_0_0_4px_rgba(255,59,48,0.16)] transition-[top] duration-100 ease-out"
                style={{ top: `calc(${progress * 100}% - 6px)` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Destination card queue — bottom-left */}
        <div className="absolute bottom-3 left-4 z-30 w-[min(18rem,calc(100vw-2rem))] sm:bottom-12 sm:left-24 sm:w-[min(18rem,calc(100vw-6.5rem))] lg:left-40">
          <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.19em] text-white/60">Upcoming places</p>
          <div className="space-y-2">
            <AnimatePresence initial={false} mode="popLayout">
              {queue.map((item, index) => (
                <div
                  key={`card-${item.id}`}
                  style={
                    index === 0
                      ? {
                          opacity: Math.max(0.2, 1 - crossfade),
                          transform: `scale(${1 - crossfade * 0.035})`,
                        }
                      : undefined
                  }
                >
                  <DestinationCard destination={item} order={index} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
