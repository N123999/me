import { Plus_Jakarta_Sans } from "next/font/google";
import { HomeCards } from "@/components/home-cards";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <section className="flex min-h-dvh flex-1 flex-col items-center justify-center px-6">
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
    </main>
  );
}
