import { setRequestLocale } from "next-intl/server";

type PageProps = { params: Promise<{ locale: string }> };

export default async function LauncherPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <p className="text-center font-sans text-lg text-muted-foreground md:text-xl">
        XianYu Launcher — coming soon.
      </p>
    </main>
  );
}
