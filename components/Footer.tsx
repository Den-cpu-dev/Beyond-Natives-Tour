import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[#292f16]/15 bg-[#ffbe17] px-5 py-9 sm:px-10 lg:px-16 transition-colors">
      <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand Logo & Name (Centered with each other) */}
        <Link
          href="/"
          className="group flex flex-col items-center text-center transition-transform hover:scale-105"
          aria-label="Beyond Native Tours Home"
        >
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0">
            <Image
              src="/logo.png"
              alt="Beyond Native Tours Logo"
              fill
              sizes="(max-width: 640px) 48px, 64px"
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(41,47,22,0.25)]"
            />
          </div>
          <div className="relative mt-1 h-7 w-24 sm:mt-1.5 sm:h-10 sm:w-32 md:h-11 md:w-36 shrink-0">
            <Image
              src="/brand-name.png"
              alt="Beyond Native Tours - Explore • Discover • Connect"
              fill
              sizes="(max-width: 640px) 96px, 144px"
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#292f16]/80">
          <Link href="/#top" className="hover:text-[#292f16] transition-colors">Home</Link>
          <Link href="/#destinations" className="hover:text-[#292f16] transition-colors">Destinations</Link>
          <Link href="/tours" className="hover:text-[#292f16] transition-colors">Tours</Link>
          <Link href="/store" className="hover:text-[#292f16] transition-colors">Store</Link>
          <Link href="/about" className="hover:text-[#292f16] transition-colors">About</Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#292f16]/70">
            &copy; {new Date().getFullYear()} Beyond Native Tours. All rights reserved.
          </p>
          <span className="hidden sm:inline text-[#292f16]/30">•</span>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#292f16]/80 transition-colors hover:text-[#3e5b34]"
          >
            @beyondnativetours
          </a>
        </div>
      </div>
    </footer>
  );
}
