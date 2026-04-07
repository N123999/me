import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /** 上层目录另有 lockfile 时，避免误判 monorepo 根（影响 build / OpenNext 追踪）。 */
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
