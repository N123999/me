import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
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
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 md:py-24">
      <p className="font-sans text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span className="px-2 opacity-50">/</span>
        <Link href="/blog" className="transition-colors hover:text-foreground">
          Blog
        </Link>
      </p>
      <article className="mt-10">
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
        <p className="mt-10 font-sans text-base leading-relaxed text-muted-foreground">
          Full post body will live here (MDX or CMS). For now this route exists
          so cards on the homepage link to a real destination.
        </p>
      </article>
    </main>
  );
}
