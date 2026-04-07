import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBlogPostBySlug, getPost, getPostSlugs } from "@/lib/blog";
import { getSiteBaseUrl, localeHref } from "@/lib/site-url";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  const tPost = await getTranslations({ locale, namespace: "post" });
  const base = getSiteBaseUrl();
  const path = `/blog/${slug}`;

  if (!post) {
    return { title: tPost("metadataFallbackTitle") };
  }

  return {
    title: `${post.title} · Yu`,
    description: post.excerpt,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = getPost(slug);
  if (!payload) notFound();
  const { meta: post, body } = payload;
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
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
        </p>
        <article className="mt-10 text-left">
          <h1 className="font-sans text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 font-sans text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {new Intl.DateTimeFormat(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(post.publishedAt))}
            </time>
            <span className="px-1.5 opacity-50">·</span>
            {t("minRead", { minutes: post.readingMinutes })}
          </p>
          <div className="prose-site">
            <MDXRemote source={body} />
          </div>
        </article>
      </div>
    </main>
  );
}
