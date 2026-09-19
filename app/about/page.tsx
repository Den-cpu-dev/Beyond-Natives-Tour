"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const specs = [
  {
    label: "Venture Type",
    value: "Cultural Tourism / Travel Company",
    icon: (
      <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Official Portal",
    value: "beyondnativetravels.com",
    href: "https://beyondnativetravels.com",
    icon: (
      <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    label: "Group Size",
    value: "Small groups (typically 6–15 travellers)",
    icon: (
      <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: "Geographic Focus",
    value: "Ghana, Benin, Togo, and broader West Africa",
    icon: (
      <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Target Market",
    value: "African diaspora, cultural travellers, heritage seekers, solo adventurers",
    icon: (
      <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "Payment & Booking",
    value: "Flexible international payment options & structured deposit plans",
    icon: (
      <svg className="w-5 h-5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const pillars = [
  {
    title: "Authentic Storytelling",
    description: "Every itinerary is built around lived experience, unlocking native oral histories, community legends, and human connection.",
    number: "01",
  },
  {
    title: "Community Benefit",
    description: "Direct empowerment through trusted local guides, artisan visits, native culinary hosts, and community stays wherever possible.",
    number: "02",
  },
  {
    title: "Small Group Intimacy",
    description: "Never mass tourism. Intimate groups of 6–15 travellers ensuring real, respectful connection over commercial convenience.",
    number: "03",
  },
  {
    title: "Heritage Preservation",
    description: "Travel as a vital instrument for cultural appreciation, ancestral documentation, and honoring African ancestral knowledge.",
    number: "04",
  },
];

const offerings = [
  {
    title: "Ghana Heritage Journeys",
    subtitle: "Living Cultural Heartlands",
    description:
      "Curated trips through Ghana's cultural heartlands — Cape Coast Castle, Kumasi, the Upper East Region, Volta Region, and beyond. Includes visits to artisan communities, traditional festivals, and authentic cuisine experiences.",
    image: "/images/tours/cape-coast.jpg",
    tags: ["Cape Coast", "Kumasi", "Volta Region", "Festivals"],
  },
  {
    title: "West Africa Road Trips",
    subtitle: "Cross-Border Overland Odyssey",
    description:
      "Multi-country overland journeys spanning Ghana, Togo, and Benin. Designed for the adventurous traveller seeking to experience the diversity of Francophone and Anglophone West Africa in a single connected journey.",
    image: "/images/tours/northen-1.jpg",
    tags: ["Ghana", "Togo", "Benin", "Multi-Country"],
  },
  {
    title: "Diaspora Homecoming Trips",
    subtitle: "Ancestral Reconnection & Roots",
    description:
      "Curated heritage journeys crafted for the African diaspora returning home to reconnect with roots, trace lineage, take part in sacred naming ceremonies, and celebrate cultural belonging with native communities.",
    image: "/images/tours/batik-cooking.jpg",
    tags: ["Diaspora", "Homecoming", "Naming Ceremonies", "Heritage"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink text-white selection:bg-ember selection:text-white">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-purple-700/30 via-ember/20 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            {/* Portfolio Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)] animate-pulse" />
              <span className="font-anton text-[11px] uppercase tracking-[0.22em] text-white/90">
                Native Brands Portfolio • Venture 2
              </span>
            </div>

            <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white drop-shadow-lg max-w-4xl leading-[0.92]">
              Beyond Native <span className="text-white/80">Travel</span>
            </h1>

            <p className="mt-4 font-anton text-sm sm:text-lg md:text-xl uppercase tracking-[0.25em] text-ember max-w-2xl">
              Cultural Tourism • Small-Group West Africa Journeys
            </p>

            <a
              href="https://beyondnativetravels.com"
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-xs sm:text-sm font-semibold tracking-widest text-white/60 hover:text-white transition-colors underline decoration-white/30 underline-offset-4"
            >
              beyondnativetravels.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= BRAND OVERVIEW ================= */}
      <section className="py-20 sm:py-28 px-5 sm:px-10 lg:px-16 relative">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Overview Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                <span className="font-anton text-xs sm:text-sm uppercase tracking-[0.22em] text-white/80">
                  Brand Overview
                </span>
              </div>

              <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight">
                Going Beyond <br />
                <span className="text-white/70">The Surface</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 font-light border-l-2 border-ember/60 pl-6 my-2">
                &ldquo;Beyond Native Travel is a boutique cultural tourism company specialising in small-group, immersive journeys across West Africa. It is designed for travellers who want to go beyond the surface — to experience Africa through the eyes of people who live it, love it, and call it home.&rdquo;
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-white/70">
                We bridge travelers directly with living traditions, sacred heritage sites, artisan workshops, and indigenous communities across Ghana, Togo, and Benin. Every journey is unhurried, intimate, and deeply respectful.
              </p>
            </motion.div>

            {/* Right: Specifications Table / Quick Facts Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="rounded-3xl border border-white/15 bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-anton text-sm sm:text-base uppercase tracking-[0.2em] text-white">
                    Venture Overview
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-ember border border-ember/30 rounded-full px-2.5 py-0.5">
                    Official Spec
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specs.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        {item.icon}
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                          {item.label}
                        </span>
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-anton text-sm sm:text-base text-white hover:text-ember transition-colors break-words block"
                        >
                          {item.value} &rarr;
                        </a>
                      ) : (
                        <p className="font-medium text-xs sm:text-sm text-white/95 leading-snug">
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= MISSION & VALUES ================= */}
      <section className="py-20 sm:py-28 px-5 sm:px-10 lg:px-16 bg-black/30 border-y border-white/10 relative">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[2px] w-6 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
              <span className="font-anton text-xs sm:text-sm uppercase tracking-[0.22em] text-white/80">
                Mission & Values
              </span>
              <span className="h-[2px] w-6 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
            </div>

            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Connecting People To Living Culture
            </h2>

            <p className="mt-5 text-base sm:text-xl font-light leading-relaxed text-white/85">
              &ldquo;To offer immersive, meaningful, and beautifully curated travel experiences that connect people to the living culture, history, and humanity of West Africa.&rdquo;
            </p>
          </div>

          {/* 4 Guiding Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-ember/60 hover:bg-white/10 hover:-translate-y-1"
              >
                <span className="font-anton text-4xl text-ember/60 tracking-wider mb-4 block group-hover:text-ember transition-colors">
                  {pillar.number}
                </span>
                <h3 className="font-anton text-lg sm:text-xl uppercase tracking-wide text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SIGNATURE OFFERINGS ================= */}
      <section className="py-20 sm:py-28 px-5 sm:px-10 lg:px-16 relative">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[2px] w-6 bg-ember shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                <span className="font-anton text-xs sm:text-sm uppercase tracking-[0.22em] text-white/80">
                  Portfolio Experiences
                </span>
              </div>
              <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-tight text-white">
                Signature Offerings
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/60 max-w-md">
              Hand-crafted journeys designed with native hosts, deep historical context, and genuine cultural appreciation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering, idx) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl transition-all duration-300 hover:border-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-anton text-xs uppercase tracking-widest text-ember bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {offering.subtitle}
                  </span>
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-tight text-white mb-2.5">
                      {offering.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/75">
                      {offering.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    {offering.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-semibold bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= LEADERSHIP & VISION ================= */}
      <section className="py-20 px-5 sm:px-10 lg:px-16 border-t border-white/10 bg-gradient-to-b from-transparent via-black/40 to-ink">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-black/40 to-white/5 p-8 sm:p-14 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="h-2 w-2 rounded-full bg-ember" />
                  <span className="font-anton text-xs uppercase tracking-[0.22em] text-white/80">
                    Founder & Creative Direction
                  </span>
                </div>
                <h3 className="font-anton text-2xl sm:text-4xl uppercase tracking-tight text-white">
                  Ayishetu Alhassan
                </h3>
                <p className="font-anton text-sm uppercase tracking-[0.2em] text-ember mt-1">
                  Queen Extraordinaire
                </p>
                <p className="mt-4 text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                  Leading Native Brands Portfolio with a vision to preserve African heritage, share authentic living culture with the global diaspora, and build sustainable, high-impact cultural expeditions.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#destinations"
                  className="rounded-full bg-white px-7 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.18em] text-black transition-all hover:bg-ember hover:text-white hover:shadow-[0_0_25px_rgba(255,59,48,0.5)] text-center"
                >
                  Explore Tours
                </Link>
                <a
                  href="#footer"
                  className="rounded-full border border-white/30 bg-black/40 px-7 py-3 font-anton text-xs sm:text-sm uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10 text-center"
                >
                  Contact Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
