"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER } from "@/data/whatsapp";

interface Product {
  id: string;
  name: string;
  category: "textiles" | "wellness" | "jewelry" | "lifestyle";
  categoryLabel: string;
  priceUSD: string;
  priceGHS: string;
  badge?: string;
  description: string;
  image: string;
  origin: string;
  details: string[];
}

const categories = [
  { id: "all", label: "All Curations" },
  { id: "textiles", label: "Handwoven Textiles" },
  { id: "wellness", label: "Native Wellness" },
  { id: "jewelry", label: "Artisan Jewelry" },
  { id: "lifestyle", label: "Travel & Lifestyle" },
];

const placeholderProducts: Product[] = [
  {
    id: "bonwire-kente-stole",
    name: "Authentic Bonwire Kente Stole",
    category: "textiles",
    categoryLabel: "Handwoven Textiles",
    priceUSD: "$65",
    priceGHS: "GH₵ 950",
    badge: "Master Weaver Edition",
    origin: "Kumasi, Ashanti Region",
    description:
      "Hand-loomed in the historical weaving village of Bonwire. Each vibrant geometric motif represents traditional Akan proverbs of royalty, heritage, and unity.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85",
    details: ["100% Cotton & Silk blend", "Hand-woven on double-heddle loom", "Includes certificate of authenticity"],
  },
  {
    id: "raw-shea-botanical-set",
    name: "Raw Savanna Shea & Botanicals Ritual Set",
    category: "wellness",
    categoryLabel: "Native Wellness",
    priceUSD: "$38",
    priceGHS: "GH₵ 550",
    badge: "Ethically Sourced",
    origin: "Tamale, Northern Ghana",
    description:
      "Unrefined Grade-A ivory shea butter handcrafted by women's cooperatives in Northern Ghana, paired with native cold-pressed baobab seed oil and scented African black soap.",
    image: "https://images.unsplash.com/photo-1608248597359-2169b4e54867?auto=format&fit=crop&w=1000&q=85",
    details: ["Unrefined pure shea butter (250g)", "Baobab nourishing oil (60ml)", "Traditional black soap bar"],
  },
  {
    id: "krobo-recycled-glass-beads",
    name: "Krobo Recycled Glass Statement Necklace",
    category: "jewelry",
    categoryLabel: "Artisan Jewelry",
    priceUSD: "$48",
    priceGHS: "GH₵ 700",
    badge: "One-of-a-Kind",
    origin: "Somanya, Eastern Region",
    description:
      "Sculpted using centuries-old Krobo kiln techniques. Discarded glassware is powdered, poured into cassava-leaf clay molds, and hand-painted with organic mineral pigments.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
    details: ["Eco-friendly recycled powdered glass", "Hand-painted symbolic bands", "Durable adjustable cord"],
  },
  {
    id: "adinkra-heritage-tote",
    name: "Hand-Stamped Adinkra Canvas Expedition Tote",
    category: "lifestyle",
    categoryLabel: "Travel & Lifestyle",
    priceUSD: "$42",
    priceGHS: "GH₵ 600",
    badge: "Best Seller",
    origin: "Ntonso Artisan Center",
    description:
      "Heavyweight 16oz cotton canvas stamped by master artisans in Ntonso using natural Badie tree dye with sacred Adinkra symbols of wisdom, endurance, and strength.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85",
    details: ["Heavyweight 100% organic canvas", "Natural calabash-stamped dyes", "Reinforced vegan leather straps"],
  },
  {
    id: "baobab-carved-keepsake",
    name: "Hand-Carved Sacred Baobab Sculpture",
    category: "lifestyle",
    categoryLabel: "Travel & Lifestyle",
    priceUSD: "$55",
    priceGHS: "GH₵ 800",
    badge: "Artisan Carved",
    origin: "Accra Arts Center",
    description:
      "Intricately sculpted from sustainably sourced native mahogany, celebrating the Baobab tree of life — the sacred heart of the Beyond Native emblem.",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=85",
    details: ["Solid sustainable native wood", "Hand-buffed with beeswax finish", "Height: ~22cm"],
  },
  {
    id: "single-origin-cocoa-spiced-tea",
    name: "Single-Origin Ghanaian Cocoa & Spiced Hibiscus",
    category: "wellness",
    categoryLabel: "Native Wellness",
    priceUSD: "$25",
    priceGHS: "GH₵ 360",
    badge: "Farm to Cup",
    origin: "Volta & Ashanti Regions",
    description:
      "A rich aromatic blend of ceremonial sun-dried Ghanaian cocoa nibs, sun-ripened organic hibiscus petals (Sobolo), wild ginger, and fragrant grains of paradise.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85",
    details: ["150g loose botanical blend", "Naturally caffeine-free antioxidant", "Includes brass reusable tea infuser"],
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState("");

  const filteredProducts =
    selectedCategory === "all"
      ? placeholderProducts
      : placeholderProducts.filter((p) => p.category === selectedCategory);

  const getWhatsAppLink = (product: Product, qty = 1, note = "") => {
    const text = `Hello Beyond Native Travel! 🌟\n\nI would like to order from your Store:\n• Item: ${product.name}\n• Quantity: ${qty}\n• Price: ${product.priceUSD} (${product.priceGHS})\n• Origin: ${product.origin}${
      note ? `\n• Custom Note: ${note}` : ""
    }\n\nPlease share delivery details and how to complete my payment. Thank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleOpenOrderModal = (product: Product) => {
    setActiveModalProduct(product);
    setQuantity(1);
    setCustomNote("");
  };

  return (
    <main className="min-h-screen bg-white text-[#292f16] selection:bg-[#3e5b34] selection:text-white">
      <Header />

      {/* ================= STORE HERO ================= */}
      <section className="relative pt-28 pb-10 sm:pt-44 sm:pb-24 overflow-hidden border-b border-[#3e5b34]/15 bg-[#f7f9f6]/40">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-[#3e5b34]/20 via-[#ffbe17]/15 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Store Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3e5b34]/25 bg-white px-3 py-1 sm:px-4 sm:py-1.5 shadow-sm mb-4 sm:mb-5">
              <span className="h-2 w-2 rounded-full bg-[#3e5b34] shadow-[0_0_8px_rgba(62,91,52,0.8)] animate-pulse" />
              <span className="font-anton text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#292f16]">
                Direct WhatsApp Orders • Native Curations
              </span>
            </div>

            <h1 className="font-anton text-3xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#292f16] max-w-4xl leading-[0.92]">
              The Native <span className="text-[#3e5b34]">Store</span>
            </h1>

            <p className="mt-3 sm:mt-4 font-anton text-[11px] sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#3e5b34] max-w-2xl">
              Authentic Artisanal Goods • Heritage Keepsakes • Living Culture
            </p>

            <p className="mt-3 sm:mt-4 max-w-xl text-[11px] sm:text-sm text-[#292f16]/75 leading-relaxed">
              Every item is handcrafted by native West African artisans, weavers, and heritage cooperatives. Select an item below to order directly via our WhatsApp concierge.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-anton uppercase tracking-[0.14em] sm:tracking-[0.16em] transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-[#3e5b34] text-white shadow-md scale-105"
                    : "border border-[#3e5b34]/20 bg-white text-[#292f16]/70 hover:border-[#3e5b34]/50 hover:text-[#292f16] hover:bg-[#f7f9f6]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="py-8 sm:py-24 px-3 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 lg:gap-10">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-[#3e5b34]/15 bg-white shadow-sm transition-all duration-300 hover:border-[#3e5b34]/50 hover:shadow-xl"
              >
                {/* Product Photo Container */}
                <div className="relative aspect-[4/5] sm:aspect-auto sm:h-80 w-full overflow-hidden bg-[#f7f9f6]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none gap-1">
                    <span className="font-anton text-[7px] sm:text-[10px] uppercase tracking-wider text-[#292f16] bg-white/90 backdrop-blur-md px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#3e5b34]/20 shadow-sm truncate max-w-[65%]">
                      {product.origin}
                    </span>
                    {product.badge && (
                      <span className="font-anton text-[7px] sm:text-[10px] uppercase tracking-wider text-[#292f16] bg-[#ffbe17] px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-md truncate">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Tag Overlay at Bottom of Image */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 flex items-baseline gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-2xl border border-[#3e5b34]/20 shadow-sm">
                    <span className="font-anton text-xs sm:text-lg text-[#292f16]">{product.priceUSD}</span>
                    <span className="text-[9px] sm:text-[11px] font-medium text-[#292f16]/60">/ {product.priceGHS}</span>
                  </div>
                </div>

                {/* Content & Actions */}
                <div className="p-2.5 sm:p-7 flex flex-col flex-1 justify-between gap-2.5 sm:gap-5">
                  <div>
                    <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#3e5b34] mb-0.5 sm:mb-1.5 block">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-anton text-xs sm:text-2xl uppercase tracking-tight text-[#292f16] mb-1 sm:mb-2 leading-tight line-clamp-2 sm:line-clamp-none">
                      {product.name}
                    </h3>
                    <p className="hidden sm:block text-xs sm:text-sm text-[#292f16]/70 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Quick Bullet Details */}
                    <ul className="hidden sm:block mt-4 space-y-1.5 border-t border-[#3e5b34]/15 pt-3 text-[11px] text-[#292f16]/65">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3e5b34]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Action Buttons */}
                  <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-1.5 sm:gap-2.5">
                    <button
                      onClick={() => handleOpenOrderModal(product)}
                      className="w-full sm:flex-1 rounded-full border border-[#3e5b34]/30 bg-white py-1.5 sm:py-2.5 px-2 sm:px-4 font-anton text-[9px] sm:text-xs uppercase tracking-[0.12em] text-[#292f16] transition-all hover:bg-[#f7f9f6] hover:border-[#3e5b34] text-center"
                    >
                      Details
                    </button>

                    <a
                      href={getWhatsAppLink(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-full bg-[#3e5b34] py-1.5 sm:py-2.5 px-2 sm:px-4 font-anton text-[9px] sm:text-xs uppercase tracking-[0.12em] text-white shadow-md transition-all hover:bg-[#292f16] hover:scale-[1.02] active:scale-95"
                    >
                      <span className="truncate">Order</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= BESPOKE INQUIRY BANNER ================= */}
      <section className="py-20 px-5 sm:px-10 lg:px-16 border-t border-[#3e5b34]/15 bg-[#f7f9f6]">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl border border-[#3e5b34]/20 bg-white p-8 sm:p-14 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#3e5b34]" />
                <span className="font-anton text-xs uppercase tracking-[0.22em] text-[#3e5b34]">
                  Custom Orders & Artisan Commissions
                </span>
              </div>
              <h2 className="font-anton text-2xl sm:text-4xl uppercase tracking-tight text-[#292f16] leading-tight">
                Seeking Custom Pieces or Bulk Inquiries?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#292f16]/75 leading-relaxed">
                Connect directly with our curator on WhatsApp to request custom Kente patterns, bespoke brass castings, artisan wholesale gifts, or specialized expedition provisions.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello Beyond Native Travel! I have a custom artisan / store inquiry and would love to discuss options."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#3e5b34] px-8 py-3.5 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-white shadow-md transition-transform hover:bg-[#292f16] hover:scale-105 active:scale-95"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ORDER / DETAILS MODAL ================= */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-[#3e5b34]/20 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden text-[#292f16]"
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#3e5b34]/20 bg-[#f7f9f6] grid place-items-center text-[#292f16]/70 hover:text-[#292f16] hover:bg-[#3e5b34]/10"
              >
                &times;
              </button>

              <div className="flex gap-4 items-center mb-5">
                <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden border border-[#3e5b34]/20 bg-[#f7f9f6]">
                  <Image
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3e5b34]">
                    {activeModalProduct.categoryLabel}
                  </span>
                  <h3 className="font-anton text-lg sm:text-xl uppercase text-[#292f16] leading-tight">
                    {activeModalProduct.name}
                  </h3>
                  <p className="font-anton text-base text-[#292f16] mt-0.5">
                    {activeModalProduct.priceUSD} <span className="text-xs text-[#292f16]/60 font-sans">({activeModalProduct.priceGHS})</span>
                  </p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-4">
                <label className="block text-xs font-anton uppercase tracking-wider text-[#292f16]/70 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 rounded-full border border-[#3e5b34]/20 bg-[#f7f9f6] font-bold text-[#292f16] hover:bg-[#3e5b34]/10"
                  >
                    -
                  </button>
                  <span className="font-anton text-base text-[#292f16] min-w-[2ch] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-9 w-9 rounded-full border border-[#3e5b34]/20 bg-[#f7f9f6] font-bold text-[#292f16] hover:bg-[#3e5b34]/10"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Custom Order Notes */}
              <div className="mb-6">
                <label className="block text-xs font-anton uppercase tracking-wider text-[#292f16]/70 mb-2">
                  Preferences / Specific Requests (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g., specific color, size, or gift wrapping"
                  className="w-full rounded-2xl border border-[#3e5b34]/20 bg-[#f7f9f6] px-4 py-2.5 text-xs text-[#292f16] placeholder-[#292f16]/40 focus:border-[#3e5b34] focus:outline-none"
                />
              </div>

              {/* Send to WhatsApp button */}
              <a
                href={getWhatsAppLink(activeModalProduct, quantity, customNote)}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#3e5b34] py-3.5 px-6 font-anton text-xs uppercase tracking-[0.16em] text-white shadow-md transition-all hover:bg-[#292f16]"
              >
                Send Order to WhatsApp DM
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
