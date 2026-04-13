"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";

/** 与首页大标题顶边对齐，用于判定「Yu」顶端是否已滚过顶栏下沿 */
const HERO_TITLE_TOP_SENTINEL_ID = "hero-title-top-sentinel";

function isHomePathname(pathname: string): boolean {
  return new RegExp(`^/(${routing.locales.join("|")})/?$`).test(pathname);
}

/**
 * 首页：大标题「Yu」顶端尚在顶栏下方可视区内时无底栏线；略一上滚过顶栏即淡入；其它路由始终显示。
 * 深/浅色行为一致，底边颜色随 `--border` 变化。
 */
export function SiteHeaderChrome({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SiteHeaderChromeInner key={pathname} className={className}>
      {children}
    </SiteHeaderChromeInner>
  );
}

function SiteHeaderChromeInner({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const home = isHomePathname(pathname);
  const [heroScrolledOut, setHeroScrolledOut] = useState(false);

  const showBottomBorder = !home || heroScrolledOut;

  useEffect(() => {
    if (!home) return;

    const el = document.getElementById(HERO_TITLE_TOP_SENTINEL_ID);
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setHeroScrolledOut(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        // Edge 仅支持 px / %，不可用 rem（会抛 SyntaxError）
        rootMargin: "-56px 0px 0px 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [home]);

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 shrink-0 border-b bg-background pt-[env(safe-area-inset-top)] transition-[border-color] duration-300 ease-out",
        showBottomBorder ? "border-border" : "border-transparent",
        className,
      )}
    >
      {children}
    </header>
  );
}
