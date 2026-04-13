import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { ThemeSync } from "@/components/theme-sync";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";
import { getSiteBaseUrl, localeHref } from "@/lib/site-url";
import { THEME_BOOTSTRAP_INLINE_SCRIPT } from "@/lib/theme";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** 仅 `[locale]` 已列出的语言；未知 locale 不回落到 Node SSR，利于 Cloudflare next-on-pages 识别为纯静态。 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  const base = getSiteBaseUrl();

  return {
    metadataBase: base,
    title: t("siteTitle"),
    description: t("siteDescription"),
    icons: {
      icon: [{ url: "/logo/N123999.png", type: "image/png" }],
      shortcut: "/logo/N123999.png",
      apple: "/logo/N123999.png",
    },
    alternates: {
      canonical: new URL(localeHref(locale, "/"), base).toString(),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          new URL(localeHref(loc, "/"), base).toString(),
        ]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale === "zh-CN" ? "zh-Hans" : "en"}
      data-theme="dark"
      data-locale={locale}
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* 必须同步在 head 最前执行；next/script beforeInteractive 过晚会闪主题。suppressHydrationWarning：扩展可能改 script，避免 hydration 噪音 */}
        <script
          id="theme-bootstrap"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_INLINE_SCRIPT }}
        />
        {locale === "zh-CN" ? (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        ) : null}
      </head>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <ThemeSync />
        <NextIntlClientProvider messages={messages}>
          <SiteHeader locale={locale} />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
