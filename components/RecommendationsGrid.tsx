import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/data/destinations";

export default function RecommendationsGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="destinations" className="bg-white px-4 py-16 sm:px-8 sm:py-28 lg:px-14 lg:py-36 border-t border-[#292f16]/10">
      <div className="mx-auto max-w-[1600px]">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="h-[2px] w-6 sm:w-8 bg-[#ffbe17]" />
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#ca8a04]">
              Discover West Africa
            </p>
            <span className="h-[2px] w-6 sm:w-8 bg-[#ffbe17]" />
          </div>

          <h2 className="font-anton text-4xl sm:text-7xl lg:text-8xl uppercase leading-[0.98] tracking-normal text-[#292f16]">
            Destinations
          </h2>
          
          <p className="mt-4 sm:mt-6 text-xs sm:text-base leading-relaxed text-[#292f16]/80 max-w-xl mx-auto">
            Choose a country to explore its authentic tour sites, cultural heritage, and curated expeditions with Beyond Native Tours.
          </p>
        </div>

        {/* 6 Country Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/tours?country=${destination.id}`}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl sm:rounded-3xl border border-[#292f16]/15 bg-black/40 shadow-xl transition-all duration-300 hover:border-[#3e5b34] hover:shadow-[0_15px_35px_rgba(62,91,52,0.25)] hover:-translate-y-1.5 min-h-[390px] sm:min-h-[450px]"
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
                <span className="h-1.5 w-1.5 rounded-full bg-[#ffbe17] animate-pulse" />
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
                <p className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#ffbe17] mb-1 sm:mb-1.5">
                  {destination.subtitle || destination.region}
                </p>

                <h3 className="font-anton text-2xl sm:text-4xl uppercase tracking-normal text-white leading-tight mb-3">
                  {destination.name}
                </h3>

                {/* Glassmorphic Description Card matching the Hero style */}
                <div className="rounded-xl sm:rounded-2xl bg-black/50 p-3 sm:p-3.5 backdrop-blur-md border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.45)] mb-4">
                  <p className="text-xs sm:text-sm leading-relaxed sm:leading-[1.65] text-white font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] line-clamp-2 sm:line-clamp-3">
                    {destination.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ffbe17] transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
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
          <div className="h-px bg-[#292f16]/15" />
          <div className="h-px bg-[#292f16]/10" />
        </div>

      </div>
    </section>
  );
}
