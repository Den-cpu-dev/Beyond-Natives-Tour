import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/15 bg-ink px-5 py-8 sm:px-10 lg:px-16">
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
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(255,59,48,0.3)]"
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

        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
          <Link href="/#top" className="hover:text-white transition-colors">Home</Link>
          <Link href="/#destinations" className="hover:text-white transition-colors">Destinations</Link>
          <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
          <Link href="/store" className="hover:text-white transition-colors text-white/90">Store</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
            &copy; {new Date().getFullYear()} Beyond Native Tours. All rights reserved.
          </p>
          <span className="hidden sm:inline text-white/20">•</span>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-ember"
          >
            @beyondnativetours
          </a>
        </div>
      </div>
    </footer>
  );
}
