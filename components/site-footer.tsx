import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

/** lucide-react 1.x 无 Github 图标导出 */
function GitHubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c.85.004 1.705.115 2.496.337 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type FooterColumn = {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
};

const columns: FooterColumn[] = [
  {
    title: "Product",
    items: [
      { label: "Spirit Studio", href: "/product" },
      { label: "Launcher", href: "/launcher" },
    ],
  },
  {
    title: "Writing",
    items: [{ label: "Blog", href: "/blog" }],
  },
  {
    title: "Site",
    items: [{ label: "Home", href: "/" }],
  },
  {
    title: "Credits",
    items: [
      {
        label: "Mesh gradient",
        href: "https://github.com/mikhailmogilnikov/mesh-gradient",
        external: true,
      },
    ],
  },
];

const itemClassName =
  "inline-flex font-sans text-sm text-foreground/45 outline-none transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4";

const externalBarLinks: {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { href: "https://github.com/N123999/", label: "GitHub", Icon: GitHubMark },
];

const externalIconLinkClassName =
  "inline-flex rounded-md p-0.5 text-foreground/45 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

/**
 * 全站底栏：分区制。区名句首大写、`text-sm`、正文色；链默认半透明，Hover 回到正文色。
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0 bg-black pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-10 md:px-12">
        <nav
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
          aria-label="Footer"
        >
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <p className="mb-4 font-sans text-sm font-medium tracking-tight text-foreground">
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={`${col.title}-${item.label}`}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={itemClassName}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={itemClassName}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-16 pt-2">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="order-2 font-sans text-xs text-foreground/35 sm:order-1">
              © {year} Yu. Productivity, tools, design.
            </p>
            <ul
              className="order-1 flex list-none flex-wrap items-center gap-1 sm:order-2"
              aria-label="External links"
            >
              {externalBarLinks.map((item) => {
                const Icon = item.Icon;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={externalIconLinkClassName}
                    >
                      <Icon className="size-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
