/** 用于 metadata、hreflang；本地开发无环境变量时回退 localhost。 */
export function getSiteBaseUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  return new URL(raw.endsWith("/") ? raw : `${raw}/`);
}

/** 与 `next-intl` 的 `localePrefix: "always"` 一致：所有语言均带 `/{locale}` 前缀。 */
export function localeHref(locale: string, pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const tail = path === "/" ? "" : path;
  return `/${locale}${tail}`;
}
