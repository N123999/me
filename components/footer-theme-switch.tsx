"use client";

import type { SVGProps } from "react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  THEME_STORAGE_KEY,
  themeCookieString,
  type SiteTheme,
} from "@/lib/theme";

function readThemeFromDom(): SiteTheme {
  const fromDom = document.documentElement.getAttribute("data-theme");
  if (fromDom === "light" || fromDom === "dark") return fromDom;
  return "dark";
}

function applyTheme(theme: SiteTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.cookie = themeCookieString(theme);
  } catch {
    /* private mode 等 */
  }
}

function IconSun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function IconMoon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      />
    </svg>
  );
}

/**
 * 与 `<head>` 内联脚本里对 `data-theme` 的写入一致：首帧必须与 SSR 一致（避免 hydration mismatch），
 * 再在 effect 里与 `document.documentElement` 对齐。
 */
export function FooterThemeSwitch() {
  const t = useTranslations("theme");
  const [hydrated, setHydrated] = useState(false);
  const [scheme, setScheme] = useState<SiteTheme>("dark");

  useEffect(() => {
    setScheme(readThemeFromDom());
    setHydrated(true);
  }, []);

  const items = [
    { id: "light" as const, Icon: IconSun, label: t("light") },
    { id: "dark" as const, Icon: IconMoon, label: t("dark") },
  ];

  const select = (next: SiteTheme) => {
    setScheme(next);
    applyTheme(next);
  };

  if (!hydrated) {
    return (
      <div
        className="inline-flex h-6 w-[3.25rem] shrink-0 rounded-[4px] border border-border bg-muted/35 p-px"
        role="status"
        aria-busy="true"
        aria-label={t("groupAria")}
      />
    );
  }

  return (
    <div
      className="inline-flex rounded-[4px] border border-border bg-muted/35 p-px"
      role="group"
      aria-label={t("groupAria")}
    >
      {items.map(({ id, Icon, label }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          aria-pressed={scheme === id}
          onClick={() => select(id)}
          className={cn(
            "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] transition-[color,background-color] duration-200",
            scheme === id
              ? "bg-accent text-accent-foreground shadow-[0_1px_0_0_oklch(0_0_0/8%)]"
              : "text-muted-foreground hover:text-foreground",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <Icon className="size-3" />
        </button>
      ))}
    </div>
  );
}
