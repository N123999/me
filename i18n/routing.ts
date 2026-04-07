import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "zh-CN"],
  defaultLocale: "en-US",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
