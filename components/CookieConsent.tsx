"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const storageKey = "beyond-native-tours-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(storageKey) === null);
  }, []);

  const saveChoice = (choice: "necessary" | "accepted") => {
    window.localStorage.setItem(storageKey, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-xl border border-white/20 bg-[#151516]/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto"
          aria-label="Privacy preferences"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white">Your privacy</p>
          <p className="mt-2 text-xs leading-relaxed text-white/65">
            This site uses only a device-local preference to remember this choice. We do not load analytics or advertising trackers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => saveChoice("necessary")} className="border border-white/35 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.13em] text-white hover:bg-white/10">
              Necessary only
            </button>
            <button type="button" onClick={() => saveChoice("accepted")} className="bg-ember px-3 py-2 text-[9px] font-bold uppercase tracking-[0.13em] text-white hover:bg-[#e82b21]">
              Accept
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
