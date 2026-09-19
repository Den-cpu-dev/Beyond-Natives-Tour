"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// =========================================================================
// WHATSAPP CONFIGURATION:
// Replace this placeholder with your exact WhatsApp business phone number
// (Include country code, without '+' or spaces, e.g. "233241234567" for Ghana)
// =========================================================================
const WHATSAPP_NUMBER = "233000000000";

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
    <main className="min-h-screen bg-ink text-white selection:bg-ember selection:text-white">
      <Header />

      {/* ================= STORE HERO ================= */}
      <section className="relative pt-28 pb-10 sm:pt-44 sm:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-ember/30 via-purple-700/20 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Store Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md mb-4 sm:mb-5">
              <span className="h-2 w-2 rounded-full bg-[#25D366] shadow-[0_0_8px_rgba(37,211,102,0.8)] animate-pulse" />
              <span className="font-anton text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white/90">
                Direct WhatsApp Orders • Native Curations
              </span>
            </div>

            <h1 className="font-anton text-3xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white drop-shadow-lg max-w-4xl leading-[0.92]">
              The Native <span className="text-white/80">Store</span>
            </h1>

            <p className="mt-3 sm:mt-4 font-anton text-[11px] sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em] text-ember max-w-2xl">
              Authentic Artisanal Goods • Heritage Keepsakes • Living Culture
            </p>

            <p className="mt-3 sm:mt-4 max-w-xl text-[11px] sm:text-sm text-white/70 leading-relaxed">
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
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                    : "border border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/10"
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
                className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-xl sm:shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
              >
                {/* Product Photo Container */}
                <div className="relative aspect-[4/5] sm:aspect-auto sm:h-80 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none gap-1">
                    <span className="font-anton text-[7px] sm:text-[10px] uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/20 truncate max-w-[65%]">
                      {product.origin}
                    </span>
                    {product.badge && (
                      <span className="font-anton text-[7px] sm:text-[10px] uppercase tracking-wider text-black bg-ember px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full font-bold shadow-md truncate">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Tag Overlay at Bottom of Image */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 flex items-baseline gap-1 sm:gap-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-2xl border border-white/15">
                    <span className="font-anton text-xs sm:text-lg text-white">{product.priceUSD}</span>
                    <span className="text-[9px] sm:text-[11px] font-semibold text-white/60">/ {product.priceGHS}</span>
                  </div>
                </div>

                {/* Content & Actions */}
                <div className="p-2.5 sm:p-7 flex flex-col flex-1 justify-between gap-2.5 sm:gap-5">
                  <div>
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-ember mb-0.5 sm:mb-1.5 block">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-anton text-xs sm:text-2xl uppercase tracking-tight text-white mb-1 sm:mb-2 leading-tight line-clamp-2 sm:line-clamp-none">
                      {product.name}
                    </h3>
                    <p className="hidden sm:block text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Quick Bullet Details */}
                    <ul className="hidden sm:block mt-4 space-y-1.5 border-t border-white/10 pt-3 text-[11px] text-white/60">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-ember" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp Order Action Buttons */}
                  <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-1.5 sm:gap-2.5">
                    <button
                      onClick={() => handleOpenOrderModal(product)}
                      className="w-full sm:flex-1 rounded-full border border-white/25 bg-white/5 py-1.5 sm:py-2.5 px-2 sm:px-4 font-anton text-[9px] sm:text-xs uppercase tracking-[0.12em] text-white transition-all hover:bg-white/15 hover:border-white/50 text-center"
                    >
                      Details
                    </button>

                    <a
                      href={getWhatsAppLink(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-full bg-[#25D366] py-1.5 sm:py-2.5 px-2 sm:px-4 font-anton text-[9px] sm:text-xs uppercase tracking-[0.12em] text-black font-bold shadow-[0_0_15px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95"
                    >
                      {/* WhatsApp Icon */}
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
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
      <section className="py-20 px-5 sm:px-10 lg:px-16 border-t border-white/10 bg-gradient-to-b from-black/40 via-black/70 to-ink">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-black/50 to-white/5 p-8 sm:p-14 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                <span className="font-anton text-xs uppercase tracking-[0.22em] text-white/80">
                  Custom Orders & Artisan Commissions
                </span>
              </div>
              <h2 className="font-anton text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
                Seeking Custom Pieces or Bulk Inquiries?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
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
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-3.5 font-anton text-xs sm:text-sm uppercase tracking-[0.16em] text-black font-bold shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-white/20 bg-ink p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-white/20 bg-white/5 grid place-items-center text-white/70 hover:text-white hover:bg-white/10"
              >
                &times;
              </button>

              <div className="flex gap-4 items-center mb-5">
                <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden border border-white/20">
                  <Image
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ember">
                    {activeModalProduct.categoryLabel}
                  </span>
                  <h3 className="font-anton text-lg sm:text-xl uppercase text-white leading-tight">
                    {activeModalProduct.name}
                  </h3>
                  <p className="font-anton text-base text-white mt-0.5">
                    {activeModalProduct.priceUSD} <span className="text-xs text-white/60 font-sans">({activeModalProduct.priceGHS})</span>
                  </p>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-4">
                <label className="block text-xs font-anton uppercase tracking-wider text-white/70 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 rounded-full border border-white/20 bg-white/5 font-bold text-white hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="font-anton text-base text-white min-w-[2ch] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-9 w-9 rounded-full border border-white/20 bg-white/5 font-bold text-white hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Custom Order Notes */}
              <div className="mb-6">
                <label className="block text-xs font-anton uppercase tracking-wider text-white/70 mb-2">
                  Preferences / Specific Requests (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g., specific color, size, or gift wrapping"
                  className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-ember focus:outline-none"
                />
              </div>

              {/* Send to WhatsApp button */}
              <a
                href={getWhatsAppLink(activeModalProduct, quantity, customNote)}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 px-6 font-anton text-xs uppercase tracking-[0.16em] text-black font-bold shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all hover:bg-[#20bd5a]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
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
