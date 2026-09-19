"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Destination } from "@/data/destinations";

interface HeroProps {
  destinations: Destination[];
  destination: Destination;
  nextDestination: Destination;
  crossfade: number;
  activeIndex: number;
}

export default function Hero({ destinations, destination, nextDestination, crossfade, activeIndex }: HeroProps) {
  const factSlides = useMemo(
    () => destinations.slice(2).map((_, index) => Array.from({ length: 3 }, (_, offset) => destinations[(index + offset + 2) % destinations.length])),
    [destinations],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [factIndex, setFactIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setFactIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(Math.min(Math.max(activeIndex - 2, 0), factSlides.length - 1));
  }, [activeIndex, emblaApi, factSlides.length]);

  const progress = Math.max(30, ((factIndex + 1) / factSlides.length) * 100);

  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={destination.heroImage} alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: 1 - crossfade }} />
        <Image src={nextDestination.heroImage} alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: crossfade }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/85" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-80 pt-28 sm:px-8 sm:pb-12 lg:px-14 lg:pb-14">
        <div className="absolute right-4 top-28 text-right sm:right-8 lg:right-14">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">{destination.region}</p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">{destination.country}</p>
        </div>

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-end gap-3 sm:flex lg:right-14">
          <div className="flex flex-col items-end gap-1.5 text-right font-anton text-sm leading-none text-white/45">
            {[3, 4, 5, 6, 7].map((number, index) => {
              const active = index === factIndex;
              return (
                <div key={number} className="flex items-center gap-3">
                  {active && <span className="h-px w-12 bg-white/75" />}
                  <span className={active ? "text-2xl text-white" : ""}>{String(number).padStart(2, "0")}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-ember">Beyond Native Tours presents</p>
          <h1 className="max-w-4xl font-anton text-[clamp(4rem,12vw,10.5rem)] uppercase leading-[0.76] tracking-tight text-white">
            Visit<br />Morocco
          </h1>
          <div className="mt-6 max-w-xl border-l border-ember pl-4 sm:mt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">Now arriving</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-white sm:text-base">{destination.name}</p>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-white/70 sm:text-sm">{destination.description}</p>
          </div>
        </div>

        <div className="mt-7 max-w-4xl sm:mt-9">
          <div className="mb-3 flex items-center gap-4">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Swipe &gt;&gt;</span>
            <div className="h-px flex-1 bg-white/40">
              <div className="h-px bg-ember" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {factSlides.map((facts, index) => (
                <div className="min-w-0 shrink-0 grow-0 basis-full" key={`facts-${index}`}>
                  <div className="grid gap-3 sm:grid-cols-3 sm:gap-6">
                    {facts.map((fact, factPosition) => (
                      <article key={`${index}-${fact.id}`} className={`border-t border-white/30 pt-2.5 ${factPosition > 0 ? "hidden sm:block" : ""}`}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white">{fact.name}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-white/65">{fact.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
