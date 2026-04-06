import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-white/10 bg-black pt-[env(safe-area-inset-top)]">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-2.5 sm:px-10 sm:py-3 md:px-12"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          aria-label="Yu — Home"
          className={`${plusJakarta.className} rounded-md py-1 text-lg font-semibold tracking-tight text-foreground outline-none ring-offset-2 ring-offset-black transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/30 sm:text-xl`}
        >
          Yu
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/product"
            className="rounded-md py-1 font-sans text-sm font-medium text-muted-foreground outline-none ring-offset-2 ring-offset-black transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-white/30 sm:text-base"
          >
            Product
          </Link>
        </div>
      </nav>
    </header>
  );
}
