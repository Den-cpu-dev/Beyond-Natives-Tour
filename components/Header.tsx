"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Expeditions", href: "/#holiday" },
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#footer" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Only track section scroll on homepage
      const isHome = pathname === "/" || pathname === "";
      if (isHome) {
        const scrollPos = window.scrollY + 200;
        const destinationsEl = document.getElementById("destinations");
        const holidayEl = document.getElementById("holiday");
        const footerEl = document.getElementById("footer");

        if (footerEl && scrollPos >= footerEl.offsetTop) {
          setActiveSection("contact");
        } else if (holidayEl && scrollPos >= holidayEl.offsetTop) {
          setActiveSection("expeditions");
        } else if (destinationsEl && scrollPos >= destinationsEl.offsetTop) {
          setActiveSection("destinations");
        } else {
          setActiveSection("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isLinkActive = (link: { label: string; href: string }) => {
    const cleanPath = (pathname || "").replace(/\/$/, "") || "/";

    if (link.href === "/about") {
      return cleanPath === "/about" || cleanPath.startsWith("/about/");
    }
    if (link.href === "/store") {
      return cleanPath === "/store" || cleanPath.startsWith("/store/");
    }
    if (cleanPath === "/" || cleanPath === "") {
      if (link.label === "Destinations") return activeSection === "destinations";
      if (link.label === "Expeditions") return activeSection === "expeditions";
      if (link.label === "Contact") return activeSection === "contact";
      if (link.label === "Home") return activeSection === "home";
    }
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl py-3 shadow-lg border-b border-white/10"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-16">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
          aria-label="Beyond Native Tours Home"
        >
          <div className="relative h-13 w-13 sm:h-16 sm:w-16">
            <Image
              src="/logo.png"
              alt="Beyond Native Tours Logo"
              fill
              priority
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(255,59,48,0.4)]"
            />
          </div>
          <div className="relative mt-1.5 h-8 w-24 sm:h-10 sm:w-32 md:h-11 md:w-36">
            <Image
              src="/brand-name.png"
              alt="Beyond Native Tours - Explore • Discover • Connect"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-8 lg:gap-10 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  active ? "text-white font-bold" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons (Search & CTA) */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/#destinations"
            aria-label="Search destinations"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white hover:text-white hover:bg-white/10"
          >
            <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </Link>

          <Link
            href="/#holiday"
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-black hover:border-white"
          >
            Book Trip
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/40 text-white md:hidden backdrop-blur-sm"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">Menu</span>
          <span className="grid gap-1.5">
            <span className={`block h-px w-4 bg-white transition-transform ${open ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`block h-px w-4 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-4 bg-white transition-transform ${open ? "-rotate-45 -translate-y-1" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-3 rounded-2xl border border-white/15 bg-black/95 p-6 backdrop-blur-2xl md:hidden shadow-2xl"
            aria-label="Mobile"
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                      active
                        ? "bg-white/10 text-ember font-bold"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(255,59,48,0.9)]" />
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/15">
                <Link
                  href="/#holiday"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-full bg-ember py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                >
                  Book Trip
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
