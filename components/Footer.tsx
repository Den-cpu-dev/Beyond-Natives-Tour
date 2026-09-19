import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/15 bg-ink px-5 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16">
            <Image
              src="/logo.png"
              alt="Beyond Native Tours"
              fill
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(255,59,48,0.3)]"
            />
          </div>
          <div className="relative mt-1 h-9 w-28 sm:h-11 sm:w-36">
            <Image
              src="/brand-name.png"
              alt="Beyond Native Tours - Explore • Discover • Connect"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          &copy; {new Date().getFullYear()} Beyond Native Tours. All rights reserved.
        </p>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-ember"
        >
          @beyondnativetours
        </a>
      </div>
    </footer>
  );
}
