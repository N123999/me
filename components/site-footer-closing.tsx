"use client";

import { usePathname } from "next/navigation";
import { HomeHeroStage } from "@/components/home-hero-stage";
import { routing } from "@/i18n/routing";

function isHomePathname(pathname: string): boolean {
  return new RegExp(`^/(${routing.locales.join("|")})/?$`).test(pathname);
}

export function SiteFooterClosing({ label }: { label: string }) {
  const pathname = usePathname();

  if (!isHomePathname(pathname)) {
    return null;
  }

  return (
    <div className="relative overflow-hidden border-x border-b border-[color:var(--frame-line)] px-5 py-12 text-center sm:px-6 sm:py-14 md:px-8 md:py-16">
      <div className="absolute -inset-x-24 -inset-y-20">
        <HomeHeroStage />
      </div>
      <div className="relative z-10 mx-auto inline-flex items-center justify-center">
        <div aria-hidden className="footer-bye-readable-veil" />
        <p className="home-hero-title relative font-sans text-[clamp(2.15rem,4.5vw,4rem)] font-semibold leading-[0.98] tracking-tight text-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}
