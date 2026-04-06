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

/**
 * `[slug]` 在部分环境下仍会带编码片段（如 `%20`、`+`），与磁盘文件名对齐后再读文件。
 */
function fullyDecodeSlugParam(raw: string): string {
  let s = raw.trim().replace(/\+/g, " ");
  let prev = "";
  for (let i = 0; i < 6 && s !== prev; i++) {
    prev = s;
    try {
      const next = decodeURIComponent(s);
      if (next === s) break;
      s = next;
    } catch {
      break;
    }
  }
  return s;
}

/** 将 URL 里的 slug 解析为 `content/posts` 下真实文件名（不含 .mdx） */
function resolvePostBasename(fromParam: string): string | undefined {
  const decoded = fullyDecodeSlugParam(fromParam);
  const direct = path.join(POSTS_DIR, `${decoded}.mdx`);
  if (fs.existsSync(direct)) return decoded;

  if (!fs.existsSync(POSTS_DIR)) return undefined;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const lower = decoded.toLowerCase();
  for (const file of files) {
    const base = file.replace(/\.mdx$/i, "");
    if (base === decoded || base.toLowerCase() === lower) return base;
    try {
      if (fullyDecodeSlugParam(base) === decoded) return base;
    } catch {
      /* ignore */
    }
  }
  return undefined;
}

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
  const basename = resolvePostBasename(slug);
  if (!basename) return undefined;
  const filePath = path.join(POSTS_DIR, `${basename}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = buildMeta(basename, data as Record<string, unknown>, content);
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
