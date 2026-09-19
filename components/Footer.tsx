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
          <span className="font-anton text-[11px] sm:text-sm uppercase tracking-[0.2em] text-white/90">
            Beyond Native <span className="font-light text-white/60">Tours</span>
          </span>
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
