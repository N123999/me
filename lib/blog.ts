import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

import { routing, type AppLocale } from "@/i18n/routing";

export type BlogCoverVariant = "violet" | "blue" | "slate" | "holographic";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  cover: BlogCoverVariant;
};

/** 列表/首页：展示 meta 来自 `contentLocale` 下的 MDX（可与当前页语言不同） */
export type BlogPostListEntry = BlogPost & {
  contentLocale: AppLocale;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

const BLOG_LOCALES = routing.locales as readonly string[];

function isBlogLocale(locale: string): locale is (typeof routing.locales)[number] {
  return (BLOG_LOCALES as readonly string[]).includes(locale);
}

function localePostsDir(locale: string): string {
  return path.join(POSTS_DIR, locale);
}

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

/** 在 `content/posts/{locale}/` 下解析真实文件名（不含 .mdx） */
function resolvePostBasename(
  fromParam: string,
  locale: string,
): string | undefined {
  if (!isBlogLocale(locale)) return undefined;

  const dir = localePostsDir(locale);
  const decoded = fullyDecodeSlugParam(fromParam);
  const direct = path.join(dir, `${decoded}.mdx`);
  if (fs.existsSync(direct)) return decoded;

  if (!fs.existsSync(dir)) return undefined;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
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
  return v === "violet" || v === "blue" || v === "slate" || v === "holographic";
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

/** 某语言目录下所有 slug（文件名不含 .mdx） */
export function getPostSlugsForLocale(locale: string): string[] {
  if (!isBlogLocale(locale)) return [];
  const dir = localePostsDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/i, ""));
}

/** 所有语言出现过的 slug 并集（兼容旧调用） */
export function getPostSlugs(): string[] {
  const set = new Set<string>();
  for (const loc of BLOG_LOCALES) {
    for (const s of getPostSlugsForLocale(loc)) set.add(s);
  }
  return [...set];
}

/** 构建期：仅生成磁盘上存在的 `(locale, slug)`，避免 locale×slug 笛卡尔积缺文件 */
export function getBlogStaticParamEntries(): { locale: string; slug: string }[] {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of BLOG_LOCALES) {
    for (const slug of getPostSlugsForLocale(locale)) {
      out.push({ locale, slug });
    }
  }
  return out;
}

export function getPost(
  slug: string,
  locale: string,
): { meta: BlogPost; body: string } | undefined {
  const basename = resolvePostBasename(slug, locale);
  if (!basename) return undefined;
  const filePath = path.join(localePostsDir(locale), `${basename}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = buildMeta(basename, data as Record<string, unknown>, content);
  if (!meta) return undefined;
  return { meta, body: content.trim() };
}

export function getBlogPostBySlug(
  slug: string,
  locale: string,
): BlogPost | undefined {
  return getPost(slug, locale)?.meta;
}

/**
 * 解析「该 slug 在哪一语言有稿」：优先 preferred，其次 defaultLocale，再其余。
 * 均无则 undefined。
 */
export function resolveBlogPostLocale(
  slug: string,
  preferred: string,
): string | undefined {
  if (!isBlogLocale(preferred)) return undefined;

  const order: string[] = [preferred];
  if (routing.defaultLocale !== preferred) {
    order.push(routing.defaultLocale);
  }
  for (const loc of BLOG_LOCALES) {
    if (!order.includes(loc)) order.push(loc);
  }

  const seen = new Set<string>();
  for (const loc of order) {
    if (seen.has(loc)) continue;
    seen.add(loc);
    if (getPost(slug, loc)) return loc;
  }
  return undefined;
}

export function getAllBlogPostsSorted(locale: string): BlogPost[] {
  return getPostSlugsForLocale(locale)
    .map((slug) => getPost(slug, locale)?.meta)
    .filter((m): m is BlogPost => m != null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getLatestBlogPosts(
  limit = 3,
  locale: string,
): BlogPost[] {
  return getAllBlogPostsSorted(locale).slice(0, limit);
}

function toListEntry(
  slug: string,
  listLocale: string,
): BlogPostListEntry | undefined {
  const contentLocale = resolveBlogPostLocale(slug, listLocale);
  if (!contentLocale || !isBlogLocale(contentLocale)) return undefined;
  const payload = getPost(slug, contentLocale);
  if (!payload) return undefined;
  return { ...payload.meta, contentLocale };
}

/**
 * 列表页 / 首页 Blog：slug 取各语言并集；每条用 `resolveBlogPostLocale` 选正文来源语，
 * 这样英文列表也能出现仅有 zh-CN 稿的文章（链到对应 locale 详情）。
 */
export function getAllBlogPostsSortedWithFallback(
  listLocale: string,
): BlogPostListEntry[] {
  if (!isBlogLocale(listLocale)) return [];

  return getPostSlugs()
    .map((slug) => toListEntry(slug, listLocale))
    .filter((e): e is BlogPostListEntry => e != null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getLatestBlogPostsWithFallback(
  limit: number,
  listLocale: string,
): BlogPostListEntry[] {
  return getAllBlogPostsSortedWithFallback(listLocale).slice(0, limit);
}
