import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPostBySlug, getPost, getPostSlugs } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: `${post.title} · Yu`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = getPost(slug);
  if (!payload) notFound();
  const { meta: post, body } = payload;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-10 md:px-12 md:py-24">
      <div className="max-w-3xl text-left">
        <p className="font-sans text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
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
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(post.publishedAt))}
            </time>
            <span className="px-1.5 opacity-50">·</span>
            {post.readingMinutes} min read
          </p>
          <div
            className="prose prose-invert mt-10 max-w-none text-left font-sans prose-headings:text-left prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-left prose-p:text-muted-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-strong:text-foreground prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:text-foreground prose-pre:bg-white/5 prose-li:text-left"
          >
            <MDXRemote source={body} />
          </div>
        </article>
      </div>
    </main>
  );
}
