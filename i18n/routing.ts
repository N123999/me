import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "zh-CN"],
  defaultLocale: "en-US",
  /**
   * OpenNext（@opennextjs/cloudflare）在 Wrangler 里对 next-intl「默认语无前缀」组合处理不完整：
   * `as-needed` 会把 /en-US 307 到 /，再依赖把 / 内部 rewrite 成 /en-US；该 rewrite 在适配器里常常传不到 Node handler，
   * 根目录又无 app/page.tsx → /. 直接 404。`always` 让所有语言 URL 都带前缀，避开这条坏路径。
   */
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
