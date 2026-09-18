"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Destination } from "@/data/destinations";

export default function DestinationCard({ destination, order }: { destination: Destination; order: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 38, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.92 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[58px] items-center gap-2 border border-white/15 bg-black/35 p-2 backdrop-blur-md sm:h-[92px] sm:gap-3 sm:p-2.5"
      style={{ marginLeft: `${order * 11}px` }}
    >
      <div className="relative h-full w-[50px] shrink-0 overflow-hidden sm:w-[82px]">
        <Image src={destination.thumbnailImage} alt="" fill sizes="(max-width: 640px) 50px, 82px" className="object-cover" />
      </div>
      <div className="min-w-0 pr-2">
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:text-xs">{destination.name}</p>
        <p className="mt-0.5 truncate text-[8px] uppercase tracking-[0.11em] text-white/55 sm:mt-1 sm:text-[9px] sm:tracking-[0.13em]">
          {destination.region} <span className="text-ember">&#8226;</span> {destination.country}
        </p>
      </div>
    </motion.article>
  );
}
