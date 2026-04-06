import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogCoverVariant = "violet" | "blue" | "slate";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  cover: BlogCoverVariant;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function isCover(v: unknown): v is BlogCoverVariant {
  return v === "violet" || v === "blue" || v === "slate";
}

function buildMeta(
  slug: string,
  data: Record<string, unknown>,
  body: string,
): BlogPost | null {
  const title = data.title;
  const excerpt = data.excerpt;
  const publishedAt = data.publishedAt;
  const cover = data.cover;

  if (typeof title !== "string" || !title) return null;
  if (typeof excerpt !== "string" || !excerpt) return null;
  if (typeof publishedAt !== "string" || !publishedAt) return null;
  if (!isCover(cover)) return null;

  const rt = readingTime(body);
  const readingMinutes =
    typeof data.readingMinutes === "number" && data.readingMinutes > 0
      ? Math.round(data.readingMinutes)
      : Math.max(1, Math.ceil(rt.minutes));

  return {
    slug,
    title,
    excerpt,
    publishedAt,
    readingMinutes,
    cover,
  };
}

/** 所有已发布的 slug（来自 `content/posts/*.mdx` 文件名，不含扩展名） */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/i, ""));
}

export function getPost(
  slug: string,
): { meta: BlogPost; body: string } | undefined {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = buildMeta(slug, data as Record<string, unknown>, content);
  if (!meta) return undefined;
  return { meta, body: content.trim() };
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getPost(slug)?.meta;
}

export function getAllBlogPostsSorted(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPost(slug)?.meta)
    .filter((m): m is BlogPost => m != null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPostsSorted().slice(0, limit);
}
