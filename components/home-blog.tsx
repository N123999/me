import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MeshDiffuseCover } from "@/components/mesh-diffuse-cover";
import { getLatestBlogPosts } from "@/lib/blog";

function formatBlogDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

/**
 * 首页 Blog：三列栅格。顶区为 MeshDiffuseCover 弥散层，标题与摘要直接落在页面黑底上。
 */
export async function HomeBlog() {
  const posts = getLatestBlogPosts(3);
  const locale = await getLocale();
  const t = await getTranslations("blog");

  return (
    <section
      className="bg-black px-5 pb-28 pt-12 sm:px-10 sm:pt-16 md:pb-36 md:pt-20"
      aria-labelledby="home-blog-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="home-blog-heading"
          className="font-sans text-base font-medium tracking-tight text-muted-foreground md:text-[1.0625rem]"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 outline-none transition-colors hover:text-foreground focus-visible:rounded-[4px] focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Blog
            <ArrowRight
              className="size-[1.125rem] shrink-0 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 md:size-5"
              aria-hidden
            />
          </Link>
        </h2>

        <ul className="mt-10 grid list-none grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:items-start md:gap-5 lg:gap-6">
          {posts.map((post) => (
            <li key={post.slug} className="min-w-0">
              <Link
                href={`/blog/${post.slug}`}
                className="block min-w-0 outline-none transition-opacity hover:opacity-95 focus-visible:rounded-[4px] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <article className="flex flex-col">
                  <MeshDiffuseCover
                    variant={post.cover}
                    className="h-52 shrink-0 rounded-[4px] sm:h-56 md:h-60"
                  />

                  <div className="flex flex-col gap-2 pt-4 md:gap-2.5 md:pt-4">
                    <h3 className="line-clamp-2 font-sans text-base font-semibold leading-snug tracking-tight text-foreground sm:text-[1.0625rem] md:text-lg">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-6 md:line-clamp-4">
                      {post.excerpt}
                    </p>
                    <p className="mt-1 font-sans text-xs text-muted-foreground/80 sm:text-[0.8125rem]">
                      <time dateTime={post.publishedAt}>
                        {formatBlogDate(post.publishedAt, locale)}
                      </time>
                      <span aria-hidden> · </span>
                      <span>
                        {t("minRead", { minutes: post.readingMinutes })}
                      </span>
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
