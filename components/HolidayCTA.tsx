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
          <h2 className="mt-4 font-anton text-[clamp(2.4rem,7.5vw,8.5rem)] uppercase leading-[0.98] tracking-normal text-white space-y-1 sm:space-y-2">
            <span className="block">Travel and enjoy</span>
            <span className="block">your holiday</span>
          </h2>
          
          <div className="mt-6 flex flex-wrap items-center gap-3.5 sm:gap-5">
            <button
              type="button"
              onClick={() => openTripBookingModal()}
              className="inline-flex items-center justify-center rounded-full bg-ember px-7 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(255,59,48,0.45)] transition-all hover:bg-[#e0342a] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Book Trip</span>
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
