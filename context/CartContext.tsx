"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface TourCartItem {
  id: string;
  tourTitle: string;
  country: string;
  duration?: string;
  pricing?: string;
  image?: string;
  travelDate?: string;
  groupSize: string;
  journeyTier?: string;
  tripStyle?: string;
  dietaryOrPreferences?: string;
  notes?: string;
}

export interface StoreCartItem {
  id: string;
  productId: string;
  name: string;
  categoryLabel?: string;
  priceUSD: string;
  priceGHS: string;
  image?: string;
  quantity: number;
  customNote?: string;
}

interface CartContextType {
  tourItems: TourCartItem[];
  storeItems: StoreCartItem[];
  isCartOpen: boolean;
  activeTab: "tours" | "store";
  totalCount: number;
  lastAddedToast: { title: string; type: "tour" | "store" } | null;
  openCart: (tab?: "tours" | "store") => void;
  closeCart: () => void;
  setActiveTab: (tab: "tours" | "store") => void;
  addTour: (item: Omit<TourCartItem, "id">) => void;
  removeTour: (id: string) => void;
  clearTours: () => void;
  addStoreItem: (item: Omit<StoreCartItem, "id">) => void;
  updateStoreQuantity: (productId: string, quantity: number) => void;
  removeStoreItem: (id: string) => void;
  clearStore: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY_TOURS = "bnt_cart_tours_v1";
const STORAGE_KEY_STORE = "bnt_cart_store_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [tourItems, setTourItems] = useState<TourCartItem[]>([]);
  const [storeItems, setStoreItems] = useState<StoreCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"tours" | "store">("tours");
  const [lastAddedToast, setLastAddedToast] = useState<{ title: string; type: "tour" | "store" } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const savedTours = localStorage.getItem(STORAGE_KEY_TOURS);
      if (savedTours) setTourItems(JSON.parse(savedTours));

      const savedStore = localStorage.getItem(STORAGE_KEY_STORE);
      if (savedStore) setStoreItems(JSON.parse(savedStore));
    } catch {
      // Ignore localStorage read errors
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_TOURS, JSON.stringify(tourItems));
    } catch {
      // Ignore write errors
    }
  }, [tourItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_STORE, JSON.stringify(storeItems));
    } catch {
      // Ignore write errors
    }
  }, [storeItems, isHydrated]);

  // Toast auto-dismiss after 4 seconds
  useEffect(() => {
    if (!lastAddedToast) return;
    const timer = setTimeout(() => {
      setLastAddedToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [lastAddedToast]);

  const openCart = (tab?: "tours" | "store") => {
    if (tab) {
      setActiveTab(tab);
    } else {
      // Auto-pick tab based on content
      if (tourItems.length > 0 && storeItems.length === 0) {
        setActiveTab("tours");
      } else if (storeItems.length > 0 && tourItems.length === 0) {
        setActiveTab("store");
      }
    }
    setIsCartOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);

  const addTour = (item: Omit<TourCartItem, "id">) => {
    const newItem: TourCartItem = {
      ...item,
      id: `${item.tourTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`,
    };
    setTourItems((prev) => [...prev, newItem]);
    setLastAddedToast({ title: item.tourTitle, type: "tour" });
  };

  const removeTour = (id: string) => {
    setTourItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearTours = () => {
    setTourItems([]);
  };

  const addStoreItem = (item: Omit<StoreCartItem, "id">) => {
    setStoreItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.productId === item.productId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + item.quantity,
          customNote: item.customNote || updated[existingIdx].customNote,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...item,
          id: `${item.productId}-${Date.now()}`,
        },
      ];
    });
    setLastAddedToast({ title: item.name, type: "store" });
  };

  const updateStoreQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeStoreItem(productId);
      return;
    }
    setStoreItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeStoreItem = (idOrProductId: string) => {
    setStoreItems((prev) =>
      prev.filter((i) => i.id !== idOrProductId && i.productId !== idOrProductId)
    );
  };

  const clearStore = () => {
    setStoreItems([]);
  };

  const dismissToast = () => setLastAddedToast(null);

  const totalStoreCount = storeItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCount = tourItems.length + totalStoreCount;

  return (
    <CartContext.Provider
      value={{
        tourItems,
        storeItems,
        isCartOpen,
        activeTab,
        totalCount,
        lastAddedToast,
        openCart,
        closeCart,
        setActiveTab,
        addTour,
        removeTour,
        clearTours,
        addStoreItem,
        updateStoreQuantity,
        removeStoreItem,
        clearStore,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
