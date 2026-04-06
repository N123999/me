import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPostsSorted } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog · Yu",
  description: "Writing on productivity, tools, and design.",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default function BlogIndexPage() {
  const posts = getAllBlogPostsSorted();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 md:px-12 md:py-24">
      <div className="max-w-3xl text-left">
        <p className="font-sans text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="px-2 opacity-50">/</span>
          <span className="text-foreground">Blog</span>
        </p>

        <h1 className="mt-10 font-sans text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          Blog
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          Notes and longer-form thoughts.
        </p>

        <ul className="mt-12 list-none space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <p className="font-sans text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="px-1.5 opacity-50">·</span>
                  {post.readingMinutes} min read
                </p>
                <h2 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="outline-none transition-colors hover:text-muted-foreground focus-visible:rounded-[4px] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
