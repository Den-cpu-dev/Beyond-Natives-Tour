import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/data/destinations";

export default function RecommendationsGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="destinations" className="bg-ink px-4 py-16 sm:px-8 sm:py-28 lg:px-14 lg:py-36 border-t border-white/10">
      <div className="mx-auto max-w-[1600px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="h-[2px] w-6 sm:w-8 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-ember">
              Discover West Africa
            </p>
            <span className="h-[2px] w-6 sm:w-8 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
          </div>

          <h2 className="font-anton text-4xl sm:text-7xl lg:text-8xl uppercase leading-[0.98] tracking-normal text-white drop-shadow-md">
            Destinations
          </h2>
          
          <p className="mt-4 sm:mt-6 text-xs sm:text-base leading-relaxed text-white/70 max-w-xl mx-auto">
            Choose a country to explore its authentic tour sites, cultural heritage, and curated expeditions with Beyond Native Tours.
          </p>
        </div>

        {/* 6 Country Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/tours?country=${destination.id}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black/40 shadow-xl transition-all duration-300 hover:border-ember hover:shadow-[0_15px_35px_rgba(255,59,48,0.25)] hover:-translate-y-1.5 min-h-[380px] sm:min-h-[440px]"
              aria-label={`Explore tour sites in ${destination.name}`}
            >
              {/* Country Background Image */}
              <Image
                src={destination.thumbnailImage}
                alt={`${destination.name}, West Africa`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Ambient Gradients for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
              <div className="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:bg-transparent" />

              {/* Top Pill Badge: Tour count */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                <span className="font-anton text-[10px] sm:text-xs uppercase tracking-wider text-white">
                  {destination.tourCount || 3} Tours
                </span>
              </div>

              {/* Top Right: Country Rank Indicator */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 font-anton text-xs text-white/80 backdrop-blur-md">
                0{destination.rank || 1}
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-5 sm:p-7">
                <p className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-ember mb-1 sm:mb-1.5">
                  {destination.subtitle || destination.region}
                </p>

                <h3 className="font-anton text-2xl sm:text-4xl uppercase tracking-normal text-white leading-tight mb-2 sm:mb-2.5">
                  {destination.name}
                </h3>

                <p className="text-xs sm:text-[13px] leading-relaxed text-white/75 line-clamp-2 mb-4">
                  {destination.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ember transition-all duration-300 group-hover:translate-x-1">
                  <span>View {destination.name} Tours</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-16 sm:mt-24 space-y-2" aria-hidden="true">
          <div className="h-px bg-white/20" />
          <div className="h-px bg-white/10" />
        </div>

      </div>
    </section>
  );
}
