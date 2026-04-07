"use client";

import { useLayoutEffect } from "react";
import {
  THEME_STORAGE_KEY,
  readThemeFromDocumentCookie,
  themeCookieString,
  type SiteTheme,
} from "@/lib/theme";

/**
 * 首帧前对齐主题：`localStorage` 优先，否则读 `document.cookie`（服务端不再用 `cookies()`，便于 Edge/SSG）。
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    try {
      let theme: SiteTheme | null = null;
      const fromLs = localStorage.getItem(THEME_STORAGE_KEY);
      if (fromLs === "light" || fromLs === "dark") theme = fromLs;
      else theme = readThemeFromDocumentCookie();
      if (!theme) return;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      document.cookie = themeCookieString(theme);
    } catch {
      /* private mode 等 */
    }
  }, []);

  return null;
}
