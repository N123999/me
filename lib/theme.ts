export type SiteTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "site-theme";

/** 与 localStorage 同名，客户端设置后下次请求会带上（ThemeSync / 底栏切换写回）。 */
export const THEME_COOKIE = "site-theme";

export function themeCookieString(theme: SiteTheme): string {
  return `${THEME_COOKIE}=${theme};path=/;max-age=31536000;SameSite=Lax`;
}

/** 仅客户端：`document.cookie` 无 HttpOnly 时可读。 */
export function readThemeFromDocumentCookie(): SiteTheme | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=(light|dark)(?:;|$)`),
  );
  const v = m?.[1];
  return v === "light" || v === "dark" ? v : null;
}
