import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeBlog } from "@/components/home-blog";
import { HomeHero } from "@/components/home-hero";
import { HomeProjects } from "@/components/home-projects";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale, namespace: "home" });

  return (
    <main className="flex flex-col">
      <HomeHero locale={locale} />
      <HomeProjects locale={locale} />
      <HomeBlog locale={locale} />
    </main>
  );
}
