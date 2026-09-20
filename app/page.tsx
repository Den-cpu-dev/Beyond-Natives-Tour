"use client";

import { useState } from "react";
import CookieConsent from "@/components/CookieConsent";
import ExpandingHeroCarousel from "@/components/ExpandingHeroCarousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HolidayCTA from "@/components/HolidayCTA";
import RecommendationsGrid from "@/components/RecommendationsGrid";
import SmoothScroll from "@/components/SmoothScroll";
import VideoModal from "@/components/VideoModal";
import { heroDestinations, rankedDestinations } from "@/data/destinations";

export default function Home() {
  const [video, setVideo] = useState<{ src: string; title: string } | null>(null);

  return (
    <SmoothScroll>
      <main className="overflow-x-clip bg-white">
        <Header />
        <ExpandingHeroCarousel destinations={heroDestinations} />
        <RecommendationsGrid destinations={rankedDestinations} />
        <HolidayCTA onPlay={(src, title) => setVideo({ src, title })} />
        <Footer />
      </main>
      <VideoModal video={video} onClose={() => setVideo(null)} />
      <CookieConsent />
    </SmoothScroll>
  );
}
