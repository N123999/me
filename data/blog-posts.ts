export type BlogCoverVariant = "violet" | "blue" | "slate";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  /** 用于底栏展示，类似启动器卡片的次要信息 */
  readingMinutes: number;
  cover: BlogCoverVariant;
};

/** 首页与 /blog 复用；后续可改为 MDX / CMS */
export const blogPosts: BlogPost[] = [
  {
    slug: "notes-on-desktop-launchers",
    title: "Notes on desktop launchers and habit loops",
    excerpt:
      "Why a launcher is less about search, and more about reducing friction between intent and action.",
    publishedAt: "2026-03-12T12:00:00.000Z",
    readingMinutes: 6,
    cover: "violet",
  },
  {
    slug: "designing-milestone-grids",
    title: "Designing milestone grids without the masonry trap",
    excerpt:
      "Fixed columns, intentional rhythm, and when to stop chasing Pinterest layouts on product sites.",
    publishedAt: "2026-03-28T09:30:00.000Z",
    readingMinutes: 4,
    cover: "blue",
  },
  {
    slug: "writing-in-public-2026",
    title: "Writing in public (again) in 2026",
    excerpt:
      "A lightweight blogging setup that stays out of the way — ship the page first, polish the pipeline later.",
    publishedAt: "2026-04-01T16:00:00.000Z",
    readingMinutes: 3,
    cover: "slate",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPostsSorted().slice(0, limit);
}

/** 全部文章，按发布日期从新到旧 */
export function getAllBlogPostsSorted(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}
