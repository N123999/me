import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "zh-CN"],
  defaultLocale: "en-US",
  /** OpenNext on Workers：必选前缀可避免 `/` → 默认语的 rewrite 与适配器路由不一致（预览里曾 404/307 循环）。 */
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
