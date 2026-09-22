"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, type TourCartItem, type StoreCartItem } from "@/context/CartContext";
import {
  WHATSAPP_DISPLAY,
  getConsolidatedToursWhatsAppUrl,
  getConsolidatedStoreWhatsAppUrl,
  type ConsolidatedToursBookingDetails,
  type ConsolidatedStoreOrderDetails,
} from "@/data/whatsapp";

export default function CartDrawer() {
  const {
    tourItems,
    storeItems,
    isCartOpen,
    activeTab,
    closeCart,
    setActiveTab,
    removeTour,
    clearTours,
    updateStoreQuantity,
    removeStoreItem,
    clearStore,
    lastAddedToast,
    dismissToast,
    openCart,
  } = useCart();

  // Guest & Contact Form State
  const [guestName, setGuestName] = useState("");
  const [guestContact, setGuestContact] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  const storeTotalCount = storeItems.reduce((acc, i) => acc + i.quantity, 0);

  // Compute Store estimated totals
  const parsePrice = (priceStr: string): number => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const totalStoreUSD = storeItems.reduce(
    (sum, item) => sum + parsePrice(item.priceUSD) * item.quantity,
    0
  );
  const totalStoreGHS = storeItems.reduce(
    (sum, item) => sum + parsePrice(item.priceGHS) * item.quantity,
    0
  );

  const handleCheckoutTours = (e: React.FormEvent) => {
    e.preventDefault();
    if (tourItems.length === 0) return;
    if (!guestName.trim()) {
      setErrorMsg("Please enter your name so we know how to address you.");
      return;
    }
    if (!guestContact.trim()) {
      setErrorMsg("Please enter your WhatsApp phone or email address.");
      return;
    }

    setErrorMsg("");
    const details: ConsolidatedToursBookingDetails = {
      fullName: guestName,
      emailOrPhone: guestContact,
      tours: tourItems.map((t) => ({
        tourName: t.tourTitle,
        country: t.country,
        duration: t.duration,
        journeyTier: t.journeyTier,
        tripStyle: t.tripStyle,
        travelDate: t.travelDate,
        groupSize: t.groupSize,
        dietaryOrPreferences: t.dietaryOrPreferences,
        notes: t.notes,
      })),
      generalNotes,
    };

    const url = getConsolidatedToursWhatsAppUrl(details);
    window.open(url, "_blank", "noopener,noreferrer");
    setDispatchSuccess("Tours inquiry dispatched to WhatsApp DM!");
  };

  const handleCheckoutStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (storeItems.length === 0) return;
    if (!guestName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!guestContact.trim()) {
      setErrorMsg("Please enter your WhatsApp contact.");
      return;
    }
    if (!deliveryLocation.trim()) {
      setErrorMsg("Please specify your delivery address / town.");
      return;
    }

    setErrorMsg("");
    const details: ConsolidatedStoreOrderDetails = {
      customerName: guestName,
      customerContact: guestContact,
      deliveryLocation,
      items: storeItems.map((item) => ({
        productName: item.name,
        quantity: item.quantity,
        priceUSD: item.priceUSD,
        priceGHS: item.priceGHS,
        notes: item.customNote,
      })),
      totalUSD: totalStoreUSD > 0 ? `$${totalStoreUSD.toFixed(0)}` : undefined,
      totalGHS: totalStoreGHS > 0 ? `GH₵ ${totalStoreGHS.toLocaleString()}` : undefined,
      generalNotes,
    };

    const url = getConsolidatedStoreWhatsAppUrl(details);
    window.open(url, "_blank", "noopener,noreferrer");
    setDispatchSuccess("Store order dispatched to WhatsApp DM!");
  };

  return (
    <>
      {/* ================= FLOATING ADD-TO-CART TOAST ================= */}
      <AnimatePresence>
        {lastAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 rounded-2xl border border-[#3e5b34]/30 bg-white p-4 shadow-2xl text-[#292f16] max-w-sm"
          >
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#3e5b34]/10 text-[#3e5b34] grid place-items-center font-bold text-lg">
              ✓
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-anton uppercase tracking-wider text-[#3e5b34]">
                Added to {lastAddedToast.type === "tour" ? "Expedition Cart" : "Store Bag"}
              </p>
              <p className="text-xs font-semibold truncate text-[#292f16]">
                {lastAddedToast.title}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  dismissToast();
                  openCart(lastAddedToast.type === "tour" ? "tours" : "store");
                }}
                className="rounded-full bg-[#3e5b34] px-3 py-1.5 text-[10px] font-anton uppercase tracking-wider text-white hover:bg-[#292f16] transition-colors"
              >
                View
              </button>
              <button
                type="button"
                onClick={dismissToast}
                className="text-[#292f16]/40 hover:text-[#292f16] p-1 text-sm"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SLIDE-OVER DRAWER ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl text-[#292f16]"
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-[#292f16]/10 px-6 py-4 bg-[#f7f9f6]">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-[#3e5b34]/15 grid place-items-center text-[#3e5b34]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-anton text-lg uppercase tracking-wider text-[#292f16]">
                      Booking Cart & Bag
                    </h2>
                    <p className="text-[10px] uppercase tracking-widest text-[#3e5b34] font-semibold">
                      WhatsApp: {WHATSAPP_DISPLAY}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="h-8 w-8 rounded-full border border-[#292f16]/15 bg-white grid place-items-center text-[#292f16]/70 hover:text-[#292f16] hover:bg-[#292f16]/10 transition-colors"
                  aria-label="Close cart"
                >
                  &times;
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-2 border-b border-[#292f16]/10 text-xs font-anton uppercase tracking-wider bg-white">
                <button
                  type="button"
                  onClick={() => setActiveTab("tours")}
                  className={`relative py-3.5 text-center transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "tours"
                      ? "text-[#3e5b34] bg-white font-bold"
                      : "text-[#292f16]/60 hover:text-[#292f16] bg-[#f7f9f6]/60"
                  }`}
                >
                  <span>Expeditions</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      activeTab === "tours"
                        ? "bg-[#3e5b34] text-white"
                        : "bg-[#292f16]/15 text-[#292f16]"
                    }`}
                  >
                    {tourItems.length}
                  </span>
                  {activeTab === "tours" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3e5b34]"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("store")}
                  className={`relative py-3.5 text-center transition-colors flex items-center justify-center gap-2 ${
                    activeTab === "store"
                      ? "text-[#3e5b34] bg-white font-bold"
                      : "text-[#292f16]/60 hover:text-[#292f16] bg-[#f7f9f6]/60"
                  }`}
                >
                  <span>Store Curations</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      activeTab === "store"
                        ? "bg-[#3e5b34] text-white"
                        : "bg-[#292f16]/15 text-[#292f16]"
                    }`}
                  >
                    {storeTotalCount}
                  </span>
                  {activeTab === "store" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3e5b34]"
                    />
                  )}
                </button>
              </div>

              {/* Scrollable Items & Checkout Form Area */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Status Message */}
                {dispatchSuccess && (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs">
                    <p className="font-bold flex items-center gap-1.5">
                      <span>✓</span> {dispatchSuccess}
                    </p>
                    <p className="mt-1 text-emerald-700">
                      Your preferences were sent into the host&apos;s WhatsApp DM. She will reply shortly!
                    </p>
                  </div>
                )}

                {errorMsg && (
                  <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-red-700 text-xs">
                    <span className="font-semibold text-red-800">Notice: </span>{errorMsg}
                  </div>
                )}

                {/* ================= TAB 1: TOURS ================= */}
                {activeTab === "tours" && (
                  <>
                    {tourItems.length === 0 ? (
                      <div className="py-14 text-center">
                        <div className="mx-auto h-16 w-16 rounded-full bg-[#f7f9f6] grid place-items-center mb-3 text-[#292f16]/40">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <h3 className="font-anton text-lg uppercase tracking-wider text-[#292f16]">
                          Your Expedition Cart is Empty
                        </h3>
                        <p className="text-xs text-[#292f16]/60 mt-1 max-w-xs mx-auto">
                          Select from 30+ curated West Africa journeys, including city tours, resort escapes, and cross-border circuits.
                        </p>
                        <Link
                          href="/tours"
                          onClick={closeCart}
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#3e5b34] px-6 py-2.5 font-anton text-xs uppercase tracking-wider text-white hover:bg-[#292f16] transition-colors"
                        >
                          Browse All Tours
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-anton uppercase tracking-wider text-[#3e5b34]">
                            Selected Expeditions ({tourItems.length})
                          </span>
                          <button
                            type="button"
                            onClick={clearTours}
                            className="text-[11px] text-[#292f16]/50 hover:text-red-600 transition-colors"
                          >
                            Clear all
                          </button>
                        </div>

                        {/* List of Tour Items */}
                        <div className="space-y-3">
                          {tourItems.map((item, idx) => (
                            <div
                              key={item.id}
                              className="group relative flex gap-3.5 rounded-2xl border border-[#292f16]/10 bg-[#f7f9f6]/70 p-3.5 transition-all hover:border-[#3e5b34]/40 hover:bg-white hover:shadow-md"
                            >
                              {item.image && (
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#292f16]/10 bg-gray-100">
                                  <Image
                                    src={item.image}
                                    alt={item.tourTitle}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <div>
                                    <span className="inline-block rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-anton uppercase text-white tracking-wider">
                                      {item.country}
                                    </span>
                                    <h4 className="font-anton text-sm uppercase tracking-normal text-[#292f16] leading-snug mt-1 truncate">
                                      {idx + 1}. {item.tourTitle}
                                    </h4>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeTour(item.id)}
                                    className="text-[#292f16]/40 hover:text-red-600 p-1 text-base transition-colors"
                                    title="Remove this tour"
                                    aria-label="Remove"
                                  >
                                    &times;
                                  </button>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                                  {item.duration && (
                                    <span className="rounded-md bg-white px-2 py-0.5 border border-[#292f16]/10 font-medium text-[#292f16]/80">
                                      {item.duration}
                                    </span>
                                  )}
                                  {item.journeyTier && (
                                    <span className="rounded-md bg-[#3e5b34]/10 px-2 py-0.5 font-medium text-[#3e5b34]">
                                      {item.journeyTier}
                                    </span>
                                  )}
                                  {item.travelDate && (
                                    <span className="rounded-md bg-white px-2 py-0.5 border border-[#292f16]/10 font-medium text-[#292f16]/80">
                                      {item.travelDate}
                                    </span>
                                  )}
                                  <span className="rounded-md bg-white px-2 py-0.5 border border-[#292f16]/10 font-medium text-[#292f16]/80">
                                    {item.groupSize}
                                  </span>
                                </div>

                                {item.dietaryOrPreferences && (
                                  <p className="mt-1.5 text-[11px] text-[#292f16]/70 italic truncate">
                                    Preferences: {item.dietaryOrPreferences}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 text-center">
                          <Link
                            href="/tours"
                            onClick={closeCart}
                            className="text-xs font-semibold text-[#3e5b34] hover:underline"
                          >
                            + Add another expedition to this trip
                          </Link>
                        </div>

                        {/* Customer Form & WhatsApp Consolidated Checkout */}
                        <form
                          onSubmit={handleCheckoutTours}
                          className="rounded-2xl border border-[#3e5b34]/25 bg-gradient-to-b from-white to-[#f7f9f6] p-4 sm:p-5 space-y-3.5 mt-6 shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#3e5b34]" />
                            <h4 className="font-anton text-xs uppercase tracking-wider text-[#292f16]">
                              Guest Information (Direct WhatsApp Booking)
                            </h4>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              Your Full Name *
                            </label>
                            <input
                              type="text"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="e.g. Jane Doe"
                              required
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              WhatsApp Phone / Contact *
                            </label>
                            <input
                              type="text"
                              value={guestContact}
                              onChange={(e) => setGuestContact(e.target.value)}
                              placeholder="+233 ... or international number"
                              required
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              Combined Notes / Special Requests
                            </label>
                            <textarea
                              rows={2}
                              value={generalNotes}
                              onChange={(e) => setGeneralNotes(e.target.value)}
                              placeholder="Dietary requirements, group coordination, hotel preferences..."
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] py-3.5 px-4 font-anton text-xs uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                            </svg>
                            <span>Book All {tourItems.length} Tours on WhatsApp</span>
                          </button>
                        </form>
                      </div>
                    )}
                  </>
                )}

                {/* ================= TAB 2: STORE ================= */}
                {activeTab === "store" && (
                  <>
                    {storeItems.length === 0 ? (
                      <div className="py-14 text-center">
                        <div className="mx-auto h-16 w-16 rounded-full bg-[#f7f9f6] grid place-items-center mb-3 text-[#292f16]/40">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <h3 className="font-anton text-lg uppercase tracking-wider text-[#292f16]">
                          Your Artisan Bag is Empty
                        </h3>
                        <p className="text-xs text-[#292f16]/60 mt-1 max-w-xs mx-auto">
                          Add handwoven Kente stoles, Krobo glass jewelry, raw savanna shea butter, and heritage pieces.
                        </p>
                        <Link
                          href="/store"
                          onClick={closeCart}
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#3e5b34] px-6 py-2.5 font-anton text-xs uppercase tracking-wider text-white hover:bg-[#292f16] transition-colors"
                        >
                          Explore Artisan Store
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-anton uppercase tracking-wider text-[#3e5b34]">
                            Curations in Bag ({storeTotalCount} items)
                          </span>
                          <button
                            type="button"
                            onClick={clearStore}
                            className="text-[11px] text-[#292f16]/50 hover:text-red-600 transition-colors"
                          >
                            Clear bag
                          </button>
                        </div>

                        {/* List of Products */}
                        <div className="space-y-3">
                          {storeItems.map((item) => (
                            <div
                              key={item.id}
                              className="group relative flex gap-3.5 rounded-2xl border border-[#292f16]/10 bg-[#f7f9f6]/70 p-3.5 transition-all hover:border-[#3e5b34]/40 hover:bg-white hover:shadow-md"
                            >
                              {item.image && (
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#292f16]/10 bg-white p-1">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-1"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <div>
                                    <h4 className="font-anton text-sm uppercase tracking-normal text-[#292f16] leading-snug truncate">
                                      {item.name}
                                    </h4>
                                    <p className="text-xs font-bold text-[#3e5b34] mt-0.5">
                                      {item.priceGHS} • <span className="font-normal text-[#292f16]/70">{item.priceUSD}</span>
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeStoreItem(item.id)}
                                    className="text-[#292f16]/40 hover:text-red-600 p-1 text-base transition-colors"
                                    title="Remove item"
                                    aria-label="Remove"
                                  >
                                    &times;
                                  </button>
                                </div>

                                {/* Quantity Stepper */}
                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex items-center gap-2 rounded-full border border-[#292f16]/15 bg-white px-2 py-0.5">
                                    <button
                                      type="button"
                                      onClick={() => updateStoreQuantity(item.productId, item.quantity - 1)}
                                      className="h-5 w-5 rounded-full text-xs font-bold text-[#292f16]/70 hover:bg-gray-100 grid place-items-center"
                                      aria-label="Decrease quantity"
                                    >
                                      –
                                    </button>
                                    <span className="font-anton text-xs w-4 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateStoreQuantity(item.productId, item.quantity + 1)}
                                      className="h-5 w-5 rounded-full text-xs font-bold text-[#292f16]/70 hover:bg-gray-100 grid place-items-center"
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {item.customNote && (
                                    <span className="text-[10px] text-[#292f16]/60 italic truncate max-w-[150px]">
                                      Note: {item.customNote}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Estimated Totals Banner */}
                        <div className="rounded-2xl bg-white border border-[#292f16]/15 p-3.5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#292f16]/70 uppercase tracking-wider">
                            Estimated Bag Total:
                          </span>
                          <span className="font-anton text-base text-[#3e5b34]">
                            ${totalStoreUSD.toFixed(0)}{" "}
                            <span className="text-xs text-[#292f16]/70">
                              (GH₵ {totalStoreGHS.toLocaleString()})
                            </span>
                          </span>
                        </div>

                        <div className="pt-1 text-center">
                          <Link
                            href="/store"
                            onClick={closeCart}
                            className="text-xs font-semibold text-[#3e5b34] hover:underline"
                          >
                            + Browse more store curations
                          </Link>
                        </div>

                        {/* Customer Form & WhatsApp Consolidated Checkout */}
                        <form
                          onSubmit={handleCheckoutStore}
                          className="rounded-2xl border border-[#3e5b34]/25 bg-gradient-to-b from-white to-[#f7f9f6] p-4 sm:p-5 space-y-3.5 mt-6 shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#3e5b34]" />
                            <h4 className="font-anton text-xs uppercase tracking-wider text-[#292f16]">
                              Delivery & Ordering Details
                            </h4>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="e.g. Jane Doe"
                              required
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              WhatsApp Contact *
                            </label>
                            <input
                              type="text"
                              value={guestContact}
                              onChange={(e) => setGuestContact(e.target.value)}
                              placeholder="+233 ... or international number"
                              required
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              Delivery Location / Region / Country *
                            </label>
                            <input
                              type="text"
                              value={deliveryLocation}
                              onChange={(e) => setDeliveryLocation(e.target.value)}
                              placeholder="e.g. Airport Residential, Accra / Kumasi / USA / UK"
                              required
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2.5 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-[#292f16]/70 mb-1">
                              Custom Sizing / Color / Delivery Notes
                            </label>
                            <textarea
                              rows={2}
                              value={generalNotes}
                              onChange={(e) => setGeneralNotes(e.target.value)}
                              placeholder="Preferred patterns, packaging as a gift, delivery timeframe..."
                              className="w-full rounded-xl border border-[#292f16]/20 bg-white px-3.5 py-2 text-xs text-[#292f16] focus:border-[#3e5b34] focus:outline-none resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] py-3.5 px-4 font-anton text-xs uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                            </svg>
                            <span>Order All {storeTotalCount} Items on WhatsApp</span>
                          </button>
                        </form>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
