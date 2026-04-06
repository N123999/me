import Image from "next/image";
import Link from "next/link";

/** 设计稿「4」= 4px 圆角（不是 Tailwind 的 `rounded-4xl` 尺寸）。 */
const cardRadius = "rounded-[4px]";

const cardBase = `overflow-hidden ${cardRadius} transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black`;

/** 同一行两格等高 */
const rowCellMin = "h-full min-h-[260px] md:min-h-[360px]";

/**
 * 瀑布感：两行竖缝错位。
 * 6 列栅格 — 行1：[2 列窄][4 列宽]；行2：[4 列宽][2 列窄]（底行宽左窄右）。
 * 内容：行1 Spirit | Launcher；行2 IDK | Coming soon。
 */
export function HomeCards() {
  return (
    <section
      className="border-t border-white/10 bg-black px-5 py-16 sm:px-10 md:py-24"
      aria-label="Milestones"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:items-stretch md:gap-8">
          {/* 行1 左：窄 */}
          <Link
            href="/product"
            className={`${cardBase} block ${rowCellMin} md:col-span-2`}
          >
            <article className="flex h-full w-full items-center justify-center bg-[#F2F2F2] p-8">
              <img
                src="/logo/white.svg"
                alt="Spirit Studio"
                className="h-auto w-full max-w-[min(100%,18rem)] object-contain"
                decoding="async"
              />
            </article>
          </Link>

          {/* 行1 右：宽 */}
          <Link
            href="/launcher"
            aria-label="XianYu Launcher"
            className={`${cardBase} block ${rowCellMin} md:col-span-4`}
          >
            <div className="relative h-full w-full min-h-[200px]">
              <Image
                src="/logo/ReadmeHero_en.png"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 65vw, 820px"
                className="object-cover object-center"
              />
            </div>
          </Link>

          {/* 行2 左：宽 · IDK（底图 + 叠字，样式同 Coming soon） */}
          <div className={`${cardBase} relative ${rowCellMin} md:col-span-4`}>
            <Image
              src="/logo/IDK.png"
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <p
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-sans text-xl font-normal tracking-tight text-white md:text-2xl [text-shadow:0_0_20px_rgba(0,0,0,0.45),0_0_48px_rgba(0,0,0,0.32),0_0_88px_rgba(0,0,0,0.18)]"
            >
              IDK?
            </p>
          </div>

          {/* 行2 右：窄 · 弥散底图 + 叠字 */}
          <div
            className={`${cardBase} relative ${rowCellMin} md:col-span-2`}
          >
            <Image
              src="/logo/ComingSoon.png"
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <p
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-sans text-xl font-normal tracking-tight text-white md:text-2xl [text-shadow:0_0_20px_rgba(0,0,0,0.45),0_0_48px_rgba(0,0,0,0.32),0_0_88px_rgba(0,0,0,0.18)]"
            >
              Coming Sooooooon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
