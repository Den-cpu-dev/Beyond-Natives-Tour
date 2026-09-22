"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openTripBookingModal } from "@/components/BookTripModal";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/#top", id: "home" },
  { label: "Destinations", href: "/#destinations", id: "destinations" },
  { label: "Tours", href: "/tours", id: "tours" },
  { label: "Store", href: "/store", id: "store" },
  { label: "About", href: "/about", id: "about" },
  { label: "Contact", href: "/contact", id: "contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("home");
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    let ticking = false;

    const updateActiveFromRouteOrScroll = () => {
      setScrolled(window.scrollY > 40);

      const path = (pathname || (typeof window !== "undefined" ? window.location.pathname : "")).replace(/\/$/, "") || "/";
      const hash = typeof window !== "undefined" ? window.location.hash : "";

      // 1. If on /about, /store, /tours, or /contact, route always takes priority
      if (path === "/about" || path.startsWith("/about/")) {
        setActiveTab("about");
        return;
      }
      if (path === "/store" || path.startsWith("/store/")) {
        setActiveTab("store");
        return;
      }
      if (path === "/tours" || path.startsWith("/tours/")) {
        setActiveTab("tours");
        return;
      }
      if (path === "/contact" || path.startsWith("/contact/")) {
        setActiveTab("contact");
        return;
      }

      // 2. On homepage
      if (path === "/" || path === "") {
        if (hash === "#destinations") {
          setActiveTab("destinations");
          return;
        }
        if (hash === "#holiday") {
          setActiveTab("expeditions");
          return;
        }
        if (hash === "#footer") {
          setActiveTab("contact");
          return;
        }
        if (hash === "#top") {
          setActiveTab("home");
          return;
        }

        const footerEl = document.getElementById("footer");
        const holidayEl = document.getElementById("holiday");
        const destinationsEl = document.getElementById("destinations");

        const vh = window.innerHeight;
        if (footerEl && footerEl.getBoundingClientRect().top <= vh * 0.85) {
          setActiveTab("contact");
        } else if (holidayEl && holidayEl.getBoundingClientRect().top <= vh * 0.5 && holidayEl.getBoundingClientRect().bottom >= vh * 0.2) {
          setActiveTab("expeditions");
        } else if (destinationsEl && destinationsEl.getBoundingClientRect().top <= vh * 0.5 && destinationsEl.getBoundingClientRect().bottom >= vh * 0.2) {
          setActiveTab("destinations");
        } else {
          setActiveTab("home");
        }
      }
    };

    const handleScrollThrottled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveFromRouteOrScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveFromRouteOrScroll();

    window.addEventListener("scroll", handleScrollThrottled, { passive: true });
    window.addEventListener("hashchange", updateActiveFromRouteOrScroll);
    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
      window.removeEventListener("hashchange", updateActiveFromRouteOrScroll);
    };
  }, [pathname]);

  const isLinkActive = (link: { label: string; href: string; id: string }) => {
    const path = (pathname || "").replace(/\/$/, "") || "/";
    if (path === "/about" || path.startsWith("/about/")) {
      return link.id === "about";
    }
    if (path === "/store" || path.startsWith("/store/")) {
      return link.id === "store";
    }
    if (path === "/tours" || path.startsWith("/tours/")) {
      return link.id === "tours";
    }
    return activeTab === link.id;
  };

  const isLightHeader = (pathname !== "/" && pathname !== "") || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isLightHeader
          ? "bg-white/95 backdrop-blur-xl py-3 shadow-md border-b border-[#292f16]/10 text-[#292f16]"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6 text-white"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-16">
        
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setActiveTab("home")}
          className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
          aria-label="Beyond Native Tours Home"
        >
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0">
            <Image
              src="/logo.png"
              alt="Beyond Native Tours Logo"
              fill
              priority
              sizes="(max-width: 640px) 48px, 64px"
              className={`object-contain filter ${isLightHeader ? "drop-shadow-[0_2px_8px_rgba(41,47,22,0.25)]" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"}`}
            />
          </div>
          <div className="relative mt-1 h-7 w-24 sm:mt-1.5 sm:h-10 sm:w-32 md:h-11 md:w-36 shrink-0">
            <Image
              src={isLightHeader ? "/brand-name.png" : "/brand-name-light.png"}
              alt="Beyond Native Tours - Explore • Discover • Connect"
              fill
              priority
              sizes="(max-width: 640px) 96px, 144px"
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
                onClick={() => setActiveTab(link.id)}
                className={`relative py-1 transition-colors duration-200 ${
                  isLightHeader
                    ? active
                      ? "text-[#292f16] font-bold"
                      : "text-[#292f16]/70 hover:text-[#292f16]"
                    : active
                      ? "text-white font-bold"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-[#3e5b34] shadow-[0_0_8px_rgba(62,91,52,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons (Socials, Search & CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://www.instagram.com/beyondnative_tours"
            target="_blank"
            rel="noreferrer"
            aria-label="Beyond Native Tours Instagram"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${
              isLightHeader
                ? "border-[#292f16]/20 bg-[#292f16]/5 text-[#292f16]/80 hover:border-[#3e5b34] hover:text-[#3e5b34] hover:bg-[#3e5b34]/10"
                : "border-white/20 bg-black/30 text-white/80 backdrop-blur-sm hover:border-white hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a
            href="#"
            aria-label="Beyond Native Tours Facebook"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${
              isLightHeader
                ? "border-[#292f16]/20 bg-[#292f16]/5 text-[#292f16]/80 hover:border-[#3e5b34] hover:text-[#3e5b34] hover:bg-[#3e5b34]/10"
                : "border-white/20 bg-black/30 text-white/80 backdrop-blur-sm hover:border-white hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <Link
            href="/#destinations"
            aria-label="Search destinations"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
              isLightHeader
                ? "border-[#292f16]/20 bg-[#292f16]/5 text-[#292f16]/80 hover:border-[#3e5b34] hover:text-[#3e5b34] hover:bg-[#3e5b34]/10"
                : "border-white/20 bg-black/30 text-white/80 backdrop-blur-sm hover:border-white hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => openCart()}
            className={`relative flex h-9 items-center gap-1.5 rounded-full border px-3 transition-all duration-200 hover:scale-105 cursor-pointer ${
              isLightHeader
                ? totalCount > 0
                  ? "border-[#3e5b34] bg-[#3e5b34]/10 text-[#3e5b34] font-bold shadow-sm"
                  : "border-[#292f16]/20 bg-[#292f16]/5 text-[#292f16]/80 hover:border-[#3e5b34] hover:text-[#3e5b34]"
                : totalCount > 0
                  ? "border-[#ffbe17] bg-[#ffbe17]/20 text-[#ffbe17] backdrop-blur-sm font-bold shadow-sm"
                  : "border-white/20 bg-black/30 text-white/80 backdrop-blur-sm hover:border-white hover:text-white hover:bg-white/10"
            }`}
            aria-label={`View Cart (${totalCount} items)`}
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="font-anton text-[10px] uppercase tracking-wider">
              Cart
            </span>
            {totalCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3e5b34] px-1 text-[9px] font-bold text-white shadow-sm">
                {totalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => openTripBookingModal()}
            className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-all duration-200 active:scale-95 cursor-pointer ${
              isLightHeader
                ? "bg-[#3e5b34] text-white shadow-md hover:bg-[#292f16]"
                : "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black hover:border-white"
            }`}
          >
            Book Trip
          </button>
        </div>

        {/* Mobile Header Actions: Cart + Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => openCart()}
            className={`relative grid h-9 w-9 place-items-center rounded-full border backdrop-blur-sm transition-all cursor-pointer ${
              isLightHeader
                ? totalCount > 0
                  ? "border-[#3e5b34] bg-[#3e5b34]/15 text-[#3e5b34] shadow-sm"
                  : "border-[#292f16]/25 bg-white/80 text-[#292f16]"
                : totalCount > 0
                  ? "border-[#ffbe17] bg-[#ffbe17]/25 text-[#ffbe17] shadow-sm"
                  : "border-white/25 bg-black/40 text-white"
            }`}
            aria-label={`Open Cart (${totalCount} items)`}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3e5b34] px-1 text-[9px] font-bold text-white shadow-sm">
                {totalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`grid h-9 w-9 place-items-center rounded-full border backdrop-blur-sm ${
              isLightHeader
                ? "border-[#292f16]/25 bg-white/80 text-[#292f16]"
                : "border-white/25 bg-black/40 text-white"
            }`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">Menu</span>
            <span className="grid gap-1.5">
              <span className={`block h-px w-4 ${isLightHeader ? "bg-[#292f16]" : "bg-white"} transition-transform ${open ? "rotate-45 translate-y-1" : ""}`} />
              <span className={`block h-px w-4 ${isLightHeader ? "bg-[#292f16]" : "bg-white"} transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-4 ${isLightHeader ? "bg-[#292f16]" : "bg-white"} transition-transform ${open ? "-rotate-45 -translate-y-1" : ""}`} />
            </span>
          </button>
        </div>
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
            className="mx-4 mt-3 rounded-2xl border border-[#292f16]/15 bg-white/95 p-6 backdrop-blur-2xl md:hidden shadow-2xl text-[#292f16]"
            aria-label="Mobile"
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.id);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                      active
                        ? "bg-[#3e5b34]/15 text-[#3e5b34] font-bold"
                        : "text-[#292f16]/80 hover:bg-[#292f16]/5 hover:text-[#292f16]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3e5b34] shadow-[0_0_8px_rgba(62,91,52,0.9)]" />
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#292f16]/15 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openCart();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-[#3e5b34]/30 bg-[#f7f9f6] py-2.5 text-xs font-anton uppercase tracking-wider text-[#3e5b34] hover:bg-[#3e5b34]/10 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>View Cart & Bag</span>
                  {totalCount > 0 && (
                    <span className="rounded-full bg-[#3e5b34] px-2 py-0.5 text-[10px] text-white font-bold">
                      {totalCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openTripBookingModal();
                  }}
                  className="w-full block text-center rounded-full bg-[#3e5b34] py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(62,91,52,0.3)] hover:bg-[#292f16] active:scale-95 transition-all cursor-pointer"
                >
                  Book Trip
                </button>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <a
                    href="https://www.instagram.com/beyondnative_tours"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Beyond Native Tours Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292f16]/15 bg-[#292f16]/5 text-[#292f16]/80 transition-all hover:bg-[#3e5b34] hover:text-white"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Beyond Native Tours Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292f16]/15 bg-[#292f16]/5 text-[#292f16]/80 transition-all hover:bg-[#3e5b34] hover:text-white"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
