import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/15 bg-ink px-5 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-black">
            <Image
              src="/logo.jpg"
              alt="Beyond Native Tours"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/90">
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
