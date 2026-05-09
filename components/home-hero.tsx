import { getTranslations } from "next-intl/server";
import { HomeHeroStage } from "@/components/home-hero-stage";
import { Link } from "@/i18n/navigation";
import { HERO_TITLE_TOP_SENTINEL_ID } from "@/lib/site-header-sentinel";

type HomeHeroProps = {
  locale: string;
};

type HeroIndexItem = {
  label: string;
  value: string;
  href?: string;
};

export async function HomeHero({ locale }: HomeHeroProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  const indexItems: HeroIndexItem[] = [
    {
      label: t("focusLabel"),
      value: t("focusValue"),
      href: "/product",
    },
    {
      label: t("writingLabel"),
      value: t("writingValue"),
      href: "/blog",
    },
    {
      label: t("scopeLabel"),
      value: t("scopeValue"),
    },
  ];

  return (
    <section
      className="px-5 pb-0 pt-5 sm:px-10 sm:pt-7 md:px-12 md:pt-9"
      aria-labelledby="home-hero-heading"
    >
      <div className="mx-auto max-w-[68rem] pt-0">
        <div className="relative w-full border border-[color:var(--frame-line)] bg-background/92">
          <span
            id={HERO_TITLE_TOP_SENTINEL_ID}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
          />

          <div className="relative overflow-hidden border-b border-[color:var(--frame-line)] px-5 py-14 sm:px-6 sm:py-18 md:px-8 md:py-24">
            <HomeHeroStage />
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <div aria-hidden className="home-hero-readable-veil" />
              <h1
                id="home-hero-heading"
                className="home-hero-title max-w-[10ch] text-[clamp(2.15rem,4.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-foreground"
              >
                {t("heroTitle")}
              </h1>
              <p className="home-hero-description mt-5 max-w-2xl text-sm leading-7 sm:text-[0.97rem]">
                {t("heroDescription")}
              </p>

              <div className="home-hero-actions mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.82rem] tracking-[0.04em] text-foreground">
                <Link
                  href="/product"
                  className="home-hero-action transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("heroPrimaryAction")}
                </Link>
                <Link
                  href="/blog"
                  className="home-hero-action transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("heroSecondaryAction")}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3">
            {indexItems.map((item, index) => {
              const className = `px-5 py-5 ${index !== 0 ? "border-t border-[color:var(--frame-line)] sm:border-l sm:border-t-0" : ""}`;
              const content = (
                <>
                  <p className="text-[0.76rem] tracking-[0.06em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-3 max-w-[18ch] text-sm leading-6 text-foreground sm:text-[0.95rem]">
                    {item.value}
                  </p>
                </>
              );

              if (!item.href) {
                return (
                  <div key={item.label} className={className}>
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${className} transition-colors hover:bg-[color:var(--frame-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset`}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
