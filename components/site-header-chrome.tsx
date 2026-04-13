"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import {
  HERO_TITLE_TOP_SENTINEL_ID,
  NAV_BORDER_SENTINEL_ID,
} from "@/lib/site-header-sentinel";

type BorderMode = "home" | "navSentinel" | "hidden" | "always";

function isHomePathname(pathname: string): boolean {
  return new RegExp(`^/(${routing.locales.join("|")})/?$`).test(pathname);
}

/** 占位页：无面包屑载体，Nav 底边线保持隐藏 */
function isPlaceholderPathname(pathname: string): boolean {
  return new RegExp(`^/(${routing.locales.join("|")})/(product|launcher)/?$`).test(
    pathname,
  );
}

/** Blog 列表/详情、Mesh Lab：与首页相同 sentinel 判定 */
function isNavSentinelPathname(pathname: string): boolean {
  return (
    new RegExp(`^/(${routing.locales.join("|")})/blog(/|$)`).test(pathname) ||
    new RegExp(`^/(${routing.locales.join("|")})/tools/mesh-lab/?$`).test(pathname)
  );
}

function getBorderMode(pathname: string): BorderMode {
  if (isHomePathname(pathname)) return "home";
  if (isPlaceholderPathname(pathname)) return "hidden";
  if (isNavSentinelPathname(pathname)) return "navSentinel";
  return "always";
}

/**
 * 首页：大标题「Yu」顶端尚在顶栏下方可视区内时无底边线；略一上滚过顶栏即淡入。
 * Blog / Mesh Lab：面包屑首行顶边同上。
 * 占位页：始终无底边线。其余路由默认始终显示底边线。
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
  const mode = getBorderMode(pathname);
  const [sentinelScrolledOut, setSentinelScrolledOut] = useState(false);

  const showBottomBorder =
    mode === "hidden"
      ? false
      : mode === "always"
        ? true
        : sentinelScrolledOut;

  useEffect(() => {
    if (mode === "hidden" || mode === "always") return;

    const sentinelId =
      mode === "home" ? HERO_TITLE_TOP_SENTINEL_ID : NAV_BORDER_SENTINEL_ID;
    const el = document.getElementById(sentinelId);
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setSentinelScrolledOut(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-56px 0px 0px 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [mode, pathname]);

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
