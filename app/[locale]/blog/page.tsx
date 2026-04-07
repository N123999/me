import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllBlogPostsSorted } from "@/lib/blog";
import { getSiteBaseUrl, localeHref } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("meta");
  const base = getSiteBaseUrl();
  const path = "/blog";

  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
    alternates: {
      canonical: new URL(localeHref(locale, path), base).toString(),
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          new URL(localeHref(loc, path), base).toString(),
        ]),
      ),
    },
  };
}

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function BlogIndexPage() {
  const posts = getAllBlogPostsSorted();
  const locale = await getLocale();
  const t = await getTranslations("blog");

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 md:px-12 md:py-24">
      <div className="max-w-3xl text-left">
        <p className="font-sans text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t("breadcrumbHome")}
          </Link>
          <span className="px-2 opacity-50">/</span>
          <span className="text-foreground">Blog</span>
        </p>

        <h1 className="mt-10 font-sans text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          {t("pageHeading")}
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          {t("pageIntro")}
        </p>

        <ul className="mt-12 list-none space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <p className="font-sans text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, locale)}
                  </time>
                  <span className="px-1.5 opacity-50">·</span>
                  {t("minRead", { minutes: post.readingMinutes })}
                </p>
                <h2 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="outline-none transition-colors hover:text-muted-foreground focus-visible:rounded-[4px] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
