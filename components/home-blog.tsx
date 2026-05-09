import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLatestBlogPostsWithFallback } from "@/lib/blog";

function formatBlogDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export async function HomeBlog({ locale }: { locale: string }) {
  const posts = getLatestBlogPostsWithFallback(3, locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section
      className="-mt-px bg-background px-5 pb-0 pt-0 sm:px-10 md:px-12"
      aria-labelledby="home-blog-heading"
    >
      <div className="mx-auto max-w-6xl border border-[color:var(--frame-line)] bg-background/92">
        <div className="border-b border-[color:var(--frame-line)] px-5 py-5 sm:px-6 md:px-8">
          <h2
            id="home-blog-heading"
            className="font-sans text-base font-medium tracking-tight text-foreground md:text-[1.0625rem]"
          >
            <Link
              href="/blog"
              className="group relative inline-flex items-center outline-none transition-colors hover:text-foreground focus-visible:rounded-[4px] focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Blog
              <ArrowRight
                className="absolute left-full top-1/2 ml-1.5 size-[1.125rem] -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:size-5"
                aria-hidden
              />
            </Link>
          </h2>
        </div>

        <ul className="grid list-none md:grid-cols-3">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="min-w-0 border-t border-[color:var(--frame-line)] first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                locale={
                  post.contentLocale !== locale
                    ? post.contentLocale
                    : undefined
                }
                className="block h-full min-w-0 outline-none transition-colors hover:bg-[color:var(--frame-panel)] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
              >
                <article className="flex h-full min-h-56 flex-col px-5 py-6 sm:px-6 md:min-h-64 md:px-8 md:py-8">
                  <div className="flex min-w-0 flex-col gap-2 text-xs text-muted-foreground sm:text-[0.8125rem]">
                    <p className="font-sans text-[0.76rem] tracking-[0.06em]">
                      Writing
                    </p>
                  </div>

                  <div className="mt-8 flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-2 font-sans text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 font-sans text-sm leading-6 text-muted-foreground sm:text-[0.98rem]">
                      {post.excerpt}
                    </p>
                    <p className="mt-5 font-sans text-xs text-muted-foreground sm:text-[0.8125rem]">
                      <time dateTime={post.publishedAt}>
                        {formatBlogDate(post.publishedAt, locale)}
                      </time>
                      <span aria-hidden> · </span>
                      <span>
                        {t("minRead", { minutes: post.readingMinutes })}
                      </span>
                    </p>
                    <p className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-sm font-medium text-foreground">
                      {t("readCta")}
                      <ArrowRight className="size-4" aria-hidden />
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
