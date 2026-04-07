import { setRequestLocale } from "next-intl/server";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ProductPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <p className="font-sans text-lg text-foreground md:text-xl">
          Not finished yet
        </p>
        <p className="font-sans text-base text-muted-foreground md:text-lg">
          WIP... soooooon.
        </p>
      </div>
    </main>
  );
}
