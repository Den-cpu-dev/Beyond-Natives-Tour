import Image from "next/image";
import type { Destination } from "@/data/destinations";

export default function RecommendationsGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="destinations" className="bg-ink px-4 py-16 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ember">Confusion? These recommendations</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.88] tracking-[-0.04em] text-mist sm:text-7xl lg:text-8xl">
            Destination<br />recommendations
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {destinations.map((destination) => (
            <article key={destination.id} className="group">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-lg sm:rounded-none bg-white/10">
                <Image
                  src={destination.thumbnailImage}
                  alt={`${destination.name}, ${destination.country}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-0 left-0 translate-y-1/2 bg-ember px-2 py-0.5 sm:px-3 sm:py-1.5 text-[8px] sm:text-xs font-bold uppercase tracking-[0.06em] text-white shadow-lg">
                  {destination.rank}{destination.rank === 1 ? "st" : destination.rank === 2 ? "nd" : destination.rank === 3 ? "rd" : "th"} place
                </span>
              </div>
              <p className="mt-3.5 sm:mt-5 border-t border-white/20 pt-2 sm:pt-3 text-[11px] sm:text-sm font-bold uppercase tracking-[0.06em] text-mist leading-tight">
                {destination.name}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-14 sm:mt-16 space-y-2" aria-hidden="true">
          <div className="h-px bg-white/25" />
          <div className="h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
