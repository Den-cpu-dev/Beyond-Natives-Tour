import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Beyond Native Tours",
  description: "Slow journeys and unforgettable adventures with Beyond Native Tours.",
  icons: {
    icon: [
      { url: "/logo.jpg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

import BookTripModal from "@/components/BookTripModal";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          {children}
          <BookTripModal />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
