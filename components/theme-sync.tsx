"use client";

import { useLayoutEffect } from "react";
import { THEME_STORAGE_KEY, themeCookieString } from "@/lib/theme";

/**
 * 仅当 localStorage 里已有偏好时同步到 &html; 并补写 Cookie，避免覆盖「仅由 Cookie SSR」得到的主题。
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem(THEME_STORAGE_KEY);
      if (raw !== "light" && raw !== "dark") return;
      document.documentElement.setAttribute("data-theme", raw);
      document.cookie = themeCookieString(raw);
    } catch {
      /* private mode 等 */
    }
  }, []);

  return null;
}
