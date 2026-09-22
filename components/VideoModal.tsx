"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface VideoModalProps {
  video: { src: string; title: string } | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!video) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-black/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-3.5 bg-black/60">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#ffbe17] animate-ping" />
                <p className="text-xs font-anton uppercase tracking-widest text-white">{video.title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-anton uppercase tracking-wider text-white/80 transition-all hover:bg-white hover:text-black"
              >
                <span>Close</span>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="relative flex max-h-[75vh] w-full items-center justify-center bg-black p-2 sm:p-4">
              <video
                key={video.src}
                className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
