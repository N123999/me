"use client";

import type { SVGProps } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SchemePreview = "light" | "dark";

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
 * 底栏外观稿：浅 / 深分段（图标，仅本地选中态，不接主题系统）。
 */
export function FooterThemeSwitch() {
  const [scheme, setScheme] = useState<SchemePreview>("dark");

  const items = [
    { id: "light" as const, Icon: IconSun, label: "浅色" },
    { id: "dark" as const, Icon: IconMoon, label: "深色" },
  ];

  return (
    <div
      className="inline-flex rounded-[4px] border border-white/10 bg-white/[0.04] p-px shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
      role="group"
      aria-label="浅色 / 深色（界面预览，未接入主题）"
    >
      {items.map(({ id, Icon, label }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          onClick={() => setScheme(id)}
          className={cn(
            "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] transition-[color,background-color,box-shadow] duration-200",
            scheme === id
              ? "bg-white/12 text-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
              : "text-foreground/40 hover:text-foreground/70",
            "outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          )}
        >
          <Icon className="size-3" />
        </button>
      ))}
    </div>
  );
}
