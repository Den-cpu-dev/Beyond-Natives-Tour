"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  EMAIL_ADDRESS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  getContactInquiryWhatsAppUrl,
  type ContactInquiryDetails,
} from "@/data/whatsapp";
import { openTripBookingModal } from "@/components/BookTripModal";

const inquiryTypes = [
  "Custom West African Journey",
  "Accra City Tour",
  "Resorts Hopping Tour (3N/4D)",
  "Cape Coast Castle & Heritage Tour",
  "Northern Adventure Tour (Mole Safari)",
  "Ghanaian Cooking Class and Batik Making",
  "Multi-Country Expedition (Togo / Benin / Côte d'Ivoire)",
  "Native Habits Teas & Store Inquiry",
  "General Question / Partnership",
];

const groupSizes = [
  "Solo Explorer (1 person)",
  "Couple / Pair (2 people)",
  "Small Group (3–5 people)",
  "Medium Group (6–10 people)",
  "Private Tour Group (11–15+ people)",
];

const faqs = [
  {
    q: "How far in advance should I book my West African tour?",
    a: "We recommend booking at least 3 to 6 weeks in advance for day excursions, and 2 to 3 months in advance for multi-day itineraries (like the Resorts Hopping Tour or Northern Ghana Safari) to secure premier resort suites and flight/transport reservations.",
  },
  {
    q: "Can I customize an itinerary for my family, friends, or corporate group?",
    a: "Yes, absolutely! Bespoke private itineraries are our specialty. Whether you wish to focus on ancestral heritage, wellness retreats, textile arts, or culinary mastery, we will tailor the duration, accommodations, and pacing to your group's exact desires.",
  },
  {
    q: "What payment methods and currency do you accept?",
    a: "We accept local Ghanaian Cedis (GH₵), mobile money (MoMo), and international bank transfers / card payments in USD ($), GBP (£), and EUR (€). Structured milestone deposit plans are available for multi-day tours.",
  },
  {
    q: "Is airport pickup and local transportation included?",
    a: "All multi-day and full-day curated packages include private air-conditioned chauffeured vehicles, experienced licensed drivers, fuel, and dedicated airport meet-and-greets at Kotoka International Airport (ACC) in Accra.",
  },
  {
    q: "How can I order Native Habits Attitude Teas, Shea Butter, or Organic Honey?",
    a: "You can browse our online Store page and add products to your cart for consolidated WhatsApp DM checkout, or message us directly with your preferred quantities for local delivery in Accra or international dispatch.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactInquiryDetails>({
    fullName: "",
    emailOrPhone: "",
    inquiryType: inquiryTypes[0],
    travelDates: "",
    numberOfTravelers: groupSizes[1],
    message: "",
  });

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopy = (text: string, type: "number" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "number") {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2500);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.emailOrPhone.trim()) {
      alert("Please fill in your name and contact details.");
      return;
    }
    const url = getContactInquiryWhatsAppUrl(formData);
    window.open(url, "_blank");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.emailOrPhone.trim()) {
      alert("Please fill in your name and contact details.");
      return;
    }
    const subject = encodeURIComponent(`Beyond Native Tours Inquiry: ${formData.inquiryType} - ${formData.fullName}`);
    const body = encodeURIComponent(
      `Name: ${formData.fullName}\nContact: ${formData.emailOrPhone}\nInquiry Type: ${formData.inquiryType}\nTravel Dates: ${formData.travelDates || "Flexible"}\nTravelers: ${formData.numberOfTravelers}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#292f16] flex flex-col font-sans selection:bg-[#ffbe17]/40">
      <Header />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden border-b border-[#292f16]/10 bg-gradient-to-b from-[#f4f7f2] via-[#fbfbf9] to-[#fbfbf9] px-4 py-12 sm:px-8 sm:py-20 lg:px-14">
          <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#ffbe17]/15 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 -left-20 h-96 w-96 rounded-full bg-[#8d3e5b]/10 blur-3xl" />

          <div className="mx-auto max-w-[1400px]">
            {/* Top Brand Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8d3e5b]/30 bg-[#8d3e5b]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8d3e5b]">
                <span className="h-2 w-2 rounded-full bg-[#8d3e5b] animate-pulse" />
                For Bookings & Inquiries
              </span>

              <span className="inline-flex items-center rounded-full border border-[#292f16]/15 bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#3e5b34] backdrop-blur-sm">
                Explore • Discover • Connect
              </span>
            </div>

            {/* Headline & Mission Statement */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-anton text-[clamp(2.5rem,6.5vw,5.5rem)] uppercase leading-[0.95] tracking-tight text-[#292f16]">
                  LET&apos;S JOURNEY <span className="text-[#3d2c5f]">BEYOND</span> THE SURFACE.
                </h1>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#292f16]/85 max-w-2xl font-light">
                  We are a boutique cultural tourism company specialising in small-group, immersive journeys across West Africa. We journey with travellers who want to go beyond the surface – to experience Africa through the eyes of people who live it, and call it home.
                </p>
              </div>

              {/* Direct Booking Quick-Bar */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 bg-white rounded-3xl p-6 sm:p-7 border border-[#292f16]/10 shadow-[0_15px_40px_rgba(41,47,22,0.06)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-anton uppercase tracking-wider text-[#3e5b34]">
                    Direct Booking Hotline
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Available Now
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  <div>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-anton text-2xl sm:text-3xl text-[#292f16] hover:text-[#8d3e5b] transition-colors"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                    <p className="text-xs text-[#292f16]/60 mt-0.5">{EMAIL_ADDRESS}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-[#3e5b34] px-4 py-2.5 text-xs font-anton uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#292f16] hover:scale-105 active:scale-95"
                    >
                      <span>WhatsApp</span>
                      <span>&rarr;</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(WHATSAPP_DISPLAY, "number")}
                      className="rounded-full border border-[#292f16]/15 bg-gray-50 px-3 py-2.5 text-xs font-bold text-[#292f16] hover:bg-gray-100 transition-colors"
                      title="Copy phone number"
                    >
                      {copiedNumber ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3 DIRECT CONTACT CHANNELS ================= */}
        <section className="px-4 py-12 sm:px-8 sm:py-16 lg:px-14">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp Card */}
              <div className="relative group overflow-hidden rounded-3xl border border-[#292f16]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#023051]/50 hover:shadow-xl hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#023051] text-white shadow-md mb-5">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#3e5b34]">
                    Fastest Response (Instant DM)
                  </span>
                  <h3 className="font-anton text-2xl uppercase text-[#292f16]">
                    WhatsApp Booking
                  </h3>
                  <p className="text-sm text-[#292f16]/75 leading-relaxed">
                    Message us directly to ask about upcoming group dates, request private itineraries, or get immediate answers.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#292f16]/10 flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3e5b34] px-5 py-3 text-xs font-anton uppercase tracking-wider text-white shadow-sm transition hover:bg-[#292f16]"
                  >
                    <span>Open WhatsApp Chat</span>
                    <span>&rarr;</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(WHATSAPP_DISPLAY, "number")}
                    className="text-xs text-[#292f16]/60 hover:text-[#292f16] text-center py-1 transition-colors"
                  >
                    {copiedNumber ? "✓ Phone copied to clipboard" : `Click to copy: ${WHATSAPP_DISPLAY}`}
                  </button>
                </div>
              </div>

              {/* Email Card */}
              <div className="relative group overflow-hidden rounded-3xl border border-[#292f16]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#023051]/50 hover:shadow-xl hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#023051] text-white shadow-md mb-5">
                  <svg className="w-7 h-7 fill-none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8d3e5b]">
                    Detailed Proposals & Press
                  </span>
                  <h3 className="font-anton text-2xl uppercase text-[#292f16]">
                    Email Inquiries
                  </h3>
                  <p className="text-sm text-[#292f16]/75 leading-relaxed">
                    Ideal for customized group itineraries, diaspora heritage tours, brand collaborations, and press inquiries.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#292f16]/10 flex flex-col gap-2.5">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}?subject=Beyond%20Native%20Tours%20Booking%20Inquiry`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8d3e5b] px-5 py-3 text-xs font-anton uppercase tracking-wider text-white shadow-sm transition hover:bg-[#68273f]"
                  >
                    <span>Send an Email</span>
                    <span>&rarr;</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(EMAIL_ADDRESS, "email")}
                    className="text-xs text-[#292f16]/60 hover:text-[#292f16] text-center py-1 transition-colors"
                  >
                    {copiedEmail ? "✓ Email copied to clipboard" : `Click to copy: ${EMAIL_ADDRESS}`}
                  </button>
                </div>
              </div>

              {/* Community & Instagram Card */}
              <div className="relative group overflow-hidden rounded-3xl border border-[#292f16]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#023051]/50 hover:shadow-xl hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#023051] text-white shadow-md mb-5">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b58000]">
                    Live West African Moments
                  </span>
                  <h3 className="font-anton text-2xl uppercase text-[#292f16]">
                    Social Media
                  </h3>
                  <p className="text-sm text-[#292f16]/75 leading-relaxed">
                    Watch our latest beach escapes, culinary classes, waterfall hikes, and guest stories across Ghana and West Africa.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#292f16]/10 flex flex-col gap-2.5">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#292f16] px-5 py-3 text-xs font-anton uppercase tracking-wider text-[#ffbe17] shadow-sm transition hover:bg-black"
                  >
                    <span>Follow {INSTAGRAM_HANDLE}</span>
                    <span>&rarr;</span>
                  </a>
                  <p className="text-xs text-[#292f16]/60 text-center py-1">
                    Accra, Ghana • Mon–Sun 8AM–8PM GMT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INQUIRY FORM & VISUAL FLYER SHOWCASE ================= */}
        <section className="px-4 py-12 sm:px-8 sm:py-20 lg:px-14 bg-white border-y border-[#292f16]/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Interactive Inquiry Form */}
              <div className="lg:col-span-7 bg-[#fbfbf9] rounded-3xl border border-[#292f16]/12 p-6 sm:p-10 shadow-lg">
                <div className="space-y-2">
                  <span className="text-xs font-anton uppercase tracking-[0.2em] text-[#3e5b34]">
                    Plan Your Journey
                  </span>
                  <h2 className="font-anton text-3xl sm:text-4xl uppercase text-[#292f16]">
                    Send An Inquiry Direct to WhatsApp
                  </h2>
                  <p className="text-xs sm:text-sm text-[#292f16]/75 leading-relaxed">
                    Fill in your preferences below. Submitting will open WhatsApp with your formatted inquiry directly to our booking team.
                  </p>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="mt-8 space-y-5">
                  {/* Full Name & Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-anton uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kwame Mensah / Sarah Jenkins"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-[#292f16]/20 bg-white px-4 py-3 text-sm text-[#292f16] placeholder:text-[#292f16]/35 focus:border-[#3e5b34] focus:outline-none focus:ring-2 focus:ring-[#3e5b34]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-anton uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                        WhatsApp Number or Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +1 555 123 4567 or email"
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        className="w-full rounded-xl border border-[#292f16]/20 bg-white px-4 py-3 text-sm text-[#292f16] placeholder:text-[#292f16]/35 focus:border-[#3e5b34] focus:outline-none focus:ring-2 focus:ring-[#3e5b34]/20"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-[11px] font-anton uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Tour / Expedition of Interest
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-white px-4 py-3 text-sm text-[#292f16] focus:border-[#3e5b34] focus:outline-none focus:ring-2 focus:ring-[#3e5b34]/20"
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Group Size & Travel Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-anton uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                        Group Size
                      </label>
                      <select
                        value={formData.numberOfTravelers}
                        onChange={(e) => setFormData({ ...formData, numberOfTravelers: e.target.value })}
                        className="w-full rounded-xl border border-[#292f16]/20 bg-white px-4 py-3 text-sm text-[#292f16] focus:border-[#3e5b34] focus:outline-none focus:ring-2 focus:ring-[#3e5b34]/20"
                      >
                        {groupSizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-anton uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                        Preferred Travel Month / Dates
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. November 2026 / Dec Holidays"
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        className="w-full rounded-xl border border-[#292f16]/20 bg-white px-4 py-3 text-sm text-[#292f16] placeholder:text-[#292f16]/35 focus:border-[#3e5b34] focus:outline-none focus:ring-2 focus:ring-[#3e5b34]/20"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-anton uppercase tracking-wider text-[#292f16]/80 mb-1.5">
                      Tell Us About Your Dream Trip or Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your interests (e.g. beachfront relaxation, cultural heritage, cooking classes, private family safari, dietary requests)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-[#292f16]/20 bg-white px-4 py-3 text-sm text-[#292f16] placeholder:text-[#292f16]/35 focus:border-[#3e5b34] focus:outline-none focus:ring-2 focus:ring-[#3e5b34]/20"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#3e5b34] px-6 py-4 font-anton text-xs uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#292f16] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Send via WhatsApp ({WHATSAPP_DISPLAY})</span>
                      <span>&rarr;</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#292f16]/20 bg-white px-5 py-4 font-anton text-xs uppercase tracking-wider text-[#292f16] transition-all hover:bg-gray-100 cursor-pointer"
                    >
                      <span>Send via Email</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#292f16]/55 text-center pt-1">
                    No obligations. We typically respond within minutes to discuss custom dates, pricing, and availability.
                  </p>
                </form>
              </div>

              {/* Right Column: Visual Flyer Showcase */}
              <div className="lg:col-span-5 space-y-6">
                <div
                  onClick={() => setShowImageModal(true)}
                  className="group relative overflow-hidden rounded-3xl border border-[#292f16]/15 bg-black shadow-xl cursor-pointer"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/contact/contact-hero-flyer.jpg"
                      alt="Beyond Native Tours - Explore Discover Connect - Official Booking Flyer"
                      fill
                      sizes="(max-width: 1024px) 100vw, 450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  </div>

                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="rounded-full bg-black/75 px-3 py-1 text-[10px] font-anton uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
                      Official Brand Flyer
                    </span>
                    <span className="rounded-full bg-[#ffbe17] px-3 py-1 text-[10px] font-anton uppercase tracking-wider text-black">
                      Click to View Full Size
                    </span>
                  </div>

                  {/* Overlay Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2 pointer-events-none">
                    <div className="inline-block rounded-full bg-[#8d3e5b] px-3 py-0.5 text-[10px] font-anton uppercase tracking-widest text-white">
                      Explore • Discover • Connect
                    </div>
                    <h3 className="font-anton text-xl uppercase tracking-normal">
                      <span className="text-[#3d2c5f]">BEYOND</span> NATIVE TOURS
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-3 font-light leading-relaxed">
                      &ldquo;We are a boutique cultural tourism company specialising in small-group, immersive journeys across West Africa. We journey with travellers who want to go beyond the surface...&rdquo;
                    </p>
                  </div>
                </div>

                {/* 3 Core Values Pill Card */}
                <div className="rounded-3xl border border-[#292f16]/10 bg-[#f4f7f2] p-6 space-y-4">
                  <h4 className="font-anton text-sm uppercase tracking-wider text-[#3e5b34]">
                    Why Journey With Us?
                  </h4>

                  <ul className="space-y-3 text-xs text-[#292f16]/80">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#3e5b34] font-bold text-sm">✓</span>
                      <span><strong>Small Groups (6–15 Travellers):</strong> Never crowded tour buses. Intimate, unhurried, and deeply personal.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#8d3e5b] font-bold text-sm">✓</span>
                      <span><strong>Native Female-Led Cooperatives:</strong> We directly support local artisans, women shea processors, and village elders.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#b58000] font-bold text-sm">✓</span>
                      <span><strong>Seamless Comfort:</strong> Handpicked 3–5 star oceanfront resorts, air-conditioned private travel, and verified local chefs.</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openTripBookingModal()}
                      className="w-full inline-flex items-center justify-center rounded-xl bg-[#292f16] px-4 py-2.5 text-xs font-anton uppercase tracking-wider text-[#ffbe17] hover:bg-black transition-colors"
                    >
                      Open Interactive Trip Builder &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-14">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-anton uppercase tracking-[0.2em] text-[#3e5b34]">
                Everything You Need to Know
              </span>
              <h2 className="font-anton text-3xl sm:text-5xl uppercase text-[#292f16]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#292f16]/70 max-w-lg mx-auto">
                Have questions before booking? Here are the most common details about our journeys, payments, and custom bookings.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl border border-[#292f16]/12 bg-white transition-all shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                    >
                      <span className="font-anton text-base sm:text-lg uppercase text-[#292f16] pr-4">
                        {faq.q}
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f4f7f2] text-sm font-bold text-[#3e5b34]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-6 sm:px-6 text-xs sm:text-sm leading-relaxed text-[#292f16]/80 border-t border-[#292f16]/5 pt-4"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Need More Assistance Banner */}
            <div className="mt-12 rounded-3xl border border-[#ffbe17]/40 bg-gradient-to-r from-[#ffbe17]/15 via-white to-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="font-anton text-lg uppercase text-[#292f16]">
                  Have a specific question or request?
                </h4>
                <p className="text-xs sm:text-sm text-[#292f16]/75 mt-0.5">
                  Our founder and team are ready to assist you on WhatsApp anytime.
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#3e5b34] px-6 py-3 font-anton text-xs uppercase tracking-wider text-white shadow-md hover:bg-[#292f16] transition-all shrink-0"
              >
                <span>Chat Now</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= LIGHTBOX IMAGE MODAL ================= */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-h-[92vh] max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/15 px-5 py-3.5 bg-black/80">
                <span className="font-anton text-xs uppercase tracking-widest text-[#ffbe17]">
                  Beyond Native Tours • Official Brand Flyer
                </span>
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-anton uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors"
                >
                  Close &times;
                </button>
              </div>

              <div className="relative aspect-[3/4] w-full max-h-[82vh]">
                <Image
                  src="/images/contact/contact-hero-flyer.jpg"
                  alt="Beyond Native Tours Booking Flyer"
                  fill
                  sizes="600px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
