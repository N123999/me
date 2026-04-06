import Link from "next/link";

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
          <p className="font-sans text-xs text-foreground/35">
            © {year} Yu. Productivity, tools, design.
          </p>
        </div>
      </div>
    </footer>
  );
}
