import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestBlogPosts } from "@/lib/blog";
import { MeshDiffuseCover } from "@/components/mesh-diffuse-cover";

function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

/**
 * 首页 Blog：三列栅格。顶区为 MeshDiffuseCover 弥散层，标题与摘要直接落在页面黑底上。
 */
export function HomeBlog() {
  const posts = getLatestBlogPosts(3);

  return (
    <section
      className="bg-black px-5 pb-20 pt-10 sm:px-10 sm:pt-12 md:pb-28 md:pt-14"
      aria-labelledby="home-blog-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="home-blog-heading"
          className="font-sans text-sm font-medium tracking-tight text-muted-foreground"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 outline-none transition-colors hover:text-foreground focus-visible:rounded-[4px] focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Blog
            <ArrowRight
              className="size-4 shrink-0 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </h2>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="min-w-0">
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full min-w-0 outline-none transition-opacity hover:opacity-95 focus-visible:rounded-[4px] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <article className="flex h-full min-h-[19rem] flex-col">
                  <MeshDiffuseCover
                    variant={post.cover}
                    className="h-44 shrink-0 rounded-[4px] sm:h-48"
                  />

                  <div className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
                    <h3 className="font-sans text-[0.9375rem] font-semibold leading-snug tracking-tight text-foreground line-clamp-2 sm:text-base">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-auto pt-1 font-sans text-[0.6875rem] text-muted-foreground/80 sm:text-xs">
                      <time dateTime={post.publishedAt}>
                        {formatBlogDate(post.publishedAt)}
                      </time>
                      <span aria-hidden> · </span>
                      <span>{post.readingMinutes} min read</span>
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
