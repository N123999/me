/** 用于 metadata、hreflang；本地开发无环境变量时回退 localhost。 */
export function getSiteBaseUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  return new URL(raw.endsWith("/") ? raw : `${raw}/`);
}

export function localeHref(locale: string, pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === "en-US") {
    return path === "" ? "/" : path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
