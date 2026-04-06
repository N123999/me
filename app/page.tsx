import { Plus_Jakarta_Sans } from "next/font/google";
import { HomeBlog } from "@/components/home-blog";
import { HomeCards } from "@/components/home-cards";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function Home() {
  return (
    <main className="flex flex-col">
      {/*
        首屏刻意留白给里程碑「露一截」：100svh − 顶栏估算 − 底部 peek，避免 Hero 独占比 min-h-dvh 把卡片整屏顶下去。
        3.5rem ≈ 顶栏内容区；12rem ≈ 露出的里程碑区域（可调）。
      */}
      <section className="flex min-h-[max(20rem,calc(100svh-env(safe-area-inset-top,0px)-3.5rem-12rem))] flex-col items-center justify-center px-6 py-14 sm:py-16 md:py-20">
        <div className="flex flex-col items-center gap-0 text-center">
          <h1
            className={`${plusJakarta.className} text-[clamp(4.5rem,18vmin,14rem)] font-semibold leading-none tracking-tight text-foreground`}
          >
            Yu
          </h1>
          <p className="mt-8 max-w-md font-sans text-sm leading-relaxed tracking-tight text-muted-foreground sm:text-base">
            Productivity, tools, design.
          </p>
        </div>
      </section>

      <HomeCards />
      <HomeBlog />
    </main>
  );
}
