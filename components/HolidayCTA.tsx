"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { openTripBookingModal } from "@/components/BookTripModal";

const videos = [
  {
    title: "A morning on the water",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    image: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&w=1100&q=84",
    size: "aspect-[16/10]",
  },
  {
    title: "Between the dunes",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=84",
    size: "aspect-[4/5] sm:-mt-16",
  },
];

export default function HolidayCTA({ onPlay }: { onPlay: (src: string, title: string) => void }) {
  return (
    <section id="holiday" className="relative isolate overflow-hidden px-4 py-16 sm:px-8 sm:py-32 lg:px-14 lg:py-40">
      <Image
        src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=2200&q=88"
        alt="A boat travelling across turquoise water"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
      <div className="mx-auto max-w-[1600px]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-ember">
            Immersive Cultural Tourism • Small Groups
          </p>
          <h2 className="mt-4 font-anton text-[clamp(2.4rem,7.5vw,8.5rem)] uppercase leading-[0.88] tracking-tight text-white">
            Travel and enjoy<br />your holiday
          </h2>
          
          <div className="mt-6 flex flex-wrap items-center gap-3.5 sm:gap-5">
            <button
              type="button"
              onClick={() => openTripBookingModal()}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.14em] text-black shadow-[0_0_25px_rgba(37,211,102,0.45)] transition-all hover:bg-[#20bd5a] hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Book Trip on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => onPlay(videos[0].src, videos[0].title)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-black/40 px-5 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              aria-label="Play video"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black text-[10px]">&#9654;</span>
              <span>Watch Moments</span>
            </button>
          </div>

          <p className="mt-5 sm:mt-7 max-w-md text-xs sm:text-sm leading-relaxed text-white/75">
            Spend a few days close to the ocean, then follow the red-earth roads inland. Our small-group journeys connect Ghana&apos;s Atlantic shores, vibrant canopy rainforests, historic castles, and tranquil savanna quiet.
          </p>
        </div>

        <div className="mt-10 grid max-w-4xl grid-cols-2 items-end gap-3 sm:mt-20 sm:gap-8">
          {videos.map((video) => (
            <motion.button
              type="button"
              key={video.title}
              onClick={() => onPlay(video.src, video.title)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative block overflow-hidden text-left rounded-xl sm:rounded-none ${video.size}`}
              aria-label={`Play ${video.title}`}
            >
              <Image src={video.image} alt="" fill sizes="(max-width: 640px) 50vw, 360px" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-black/25" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-white/80 bg-black/25 text-xs sm:text-sm text-white backdrop-blur transition group-hover:bg-ember">&#9654;</span>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-white drop-shadow">{video.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
