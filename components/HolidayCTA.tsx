"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/35" />
      <div className="mx-auto max-w-[1600px]">
        <div className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-ember">Make time for wonder</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,7.5vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.055em] text-white">
            Travel and enjoy<br />your holiday
          </h2>
          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => onPlay(videos[0].src, videos[0].title)}
              className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-full border border-white/65 text-sm sm:text-base text-white transition hover:scale-105 hover:bg-white hover:text-black"
              aria-label="Play video"
            >&#9654;</button>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">Choose your fun holiday</span>
          </div>
          <p className="mt-5 sm:mt-7 max-w-md text-xs sm:text-sm leading-relaxed text-white/75">
            Spend a few days close to the water, then follow the roads inland. Our small journeys connect Morocco&apos;s bright coast, mountain air, and desert quiet.
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
