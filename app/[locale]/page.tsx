import { Plus_Jakarta_Sans } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeBlog } from "@/components/home-blog";
import { HomeCards } from "@/components/home-cards";
import { HERO_TITLE_TOP_SENTINEL_ID } from "@/lib/site-header-sentinel";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="flex flex-col">
      {/*
        首屏刻意留白给里程碑「露一截」：100svh − 顶栏估算 − 底部 peek，避免 Hero 独占比 min-h-dvh 把卡片整屏顶下去。
        3.5rem ≈ 顶栏内容区；18rem ≈ 首屏露出的里程碑区域（可调，越大 Hero 越矮、卡片越多）。
      */}
      <section
        id="home-hero"
        className="flex min-h-[max(20rem,calc(100svh-env(safe-area-inset-top,0px)-3.5rem-18rem))] flex-col items-center justify-center px-6 py-14 sm:py-16 md:py-20"
      >
        <div className="flex flex-col items-center gap-0 text-center">
          <div className="relative">
            {/* 顶栏边框触发：与大标题「Yu」顶边对齐，略一上滚即与整块 Hero 脱钩 */}
            <span
              id={HERO_TITLE_TOP_SENTINEL_ID}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
            />
            <h1
              className={`${plusJakarta.className} text-[clamp(4.5rem,18vmin,14rem)] font-semibold leading-none tracking-tight text-foreground`}
            >
              Yu
            </h1>
          </div>
          <p className="mt-8 max-w-md font-sans text-sm leading-relaxed tracking-tight text-muted-foreground sm:text-base">
            Productivity, tools, design.
          </p>
        </div>
      </section>

      <HomeCards locale={locale} />
      <HomeBlog locale={locale} />

      <section
        className="flex flex-col items-center justify-center px-6 py-16 sm:py-20 md:py-28"
        aria-label={t("closingSectionAria")}
      >
        <p
          className={`${plusJakarta.className} text-center text-[clamp(4.5rem,18vmin,14rem)] font-semibold leading-none tracking-tight text-foreground`}
        >
          Bye
        </p>
      </section>
    </main>
  );
}
