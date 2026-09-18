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
            className="relative w-full max-w-4xl overflow-hidden border border-white/20 bg-black shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">{video.title}</p>
              <button type="button" onClick={onClose} className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70 hover:text-white">
                Close <span aria-hidden="true">&#10005;</span>
              </button>
            </div>
            <video className="aspect-video w-full bg-black" controls autoPlay playsInline preload="metadata">
              <source src={video.src} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
