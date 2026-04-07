import { Plus_Jakarta_Sans } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export async function SiteHeader() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-background pt-[env(safe-area-inset-top)]">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-2.5 sm:px-10 sm:py-3 md:px-12"
        aria-label={t("mainAria")}
      >
        <Link
          href="/"
          aria-label={t("homeAria")}
          className={`${plusJakarta.className} rounded-md py-1 text-lg font-semibold tracking-tight text-foreground outline-none ring-offset-2 ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-xl`}
        >
          Yu
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/blog"
            className="rounded-md py-1 font-sans text-xs font-medium text-foreground outline-none ring-offset-2 ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-sm"
          >
            Blog
          </Link>
          <Link
            href="/product"
            className="rounded-md py-1 font-sans text-xs font-medium text-foreground outline-none ring-offset-2 ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-sm"
          >
            {t("product")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
