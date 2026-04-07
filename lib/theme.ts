export type SiteTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "site-theme";

/** 与 localStorage 同名，供 SSR 读 `cookies()` 输出一致的 `data-theme`。 */
export const THEME_COOKIE = "site-theme";

export function parseThemeCookie(value: string | undefined): SiteTheme {
  return value === "light" || value === "dark" ? value : "dark";
}

export function themeCookieString(theme: SiteTheme): string {
  return `${THEME_COOKIE}=${theme};path=/;max-age=31536000;SameSite=Lax`;
}
