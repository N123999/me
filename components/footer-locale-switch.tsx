"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type SiteLocaleCode = "en" | "zh";

const LOCALES: { code: SiteLocaleCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

const STORAGE_KEY = "site-locale";

function readStoredLocale(): SiteLocaleCode {
  if (typeof window === "undefined") return "en";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "zh" ? "zh" : "en";
}

/**
 * 底栏语言切换：先落 localStorage + document.lang，便于后续接 next-intl / 路由前缀。
 */
export function FooterLocaleSwitch() {
  const [locale, setLocale] = useState<SiteLocaleCode>("en");

  useEffect(() => {
    setLocale(readStoredLocale());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en";
  }, [locale]);

  const select = (code: SiteLocaleCode) => {
    setLocale(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* private mode 等 */
    }
  };

  return (
    <div
      className="flex items-center gap-1 font-sans text-xs"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 ? (
            <span className="text-foreground/25" aria-hidden>
              ·
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => select(code)}
            className={cn(
              "rounded px-1.5 py-0.5 outline-none transition-colors",
              locale === code
                ? "font-medium text-foreground"
                : "text-foreground/45 hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            )}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
