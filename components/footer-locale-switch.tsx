"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/i18n/routing";

const LOCALES: { code: AppLocale; label: string }[] = [
  { code: "en-US", label: "EN" },
  { code: "zh-CN", label: "中文" },
];

/**
 * 底栏语言切换：写入 next-intl 路由（localePrefix: always，兼容 OpenNext）。
 */
export function FooterLocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("footer");

  return (
    <div
      className="flex items-center gap-1 font-sans text-xs"
      role="group"
      aria-label={t("language")}
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
            onClick={() => router.replace(pathname, { locale: code })}
            className={cn(
              "rounded px-1.5 py-0.5 outline-none transition-colors",
              locale === code
                ? "font-medium text-foreground"
                : "text-foreground/45 hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
