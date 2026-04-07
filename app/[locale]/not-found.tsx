import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleNotFound() {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "nav",
  });

  return (
    <main className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-5 py-24 sm:px-10 md:px-12">
      <p className="font-sans text-sm text-muted-foreground">404</p>
      <Link
        href="/"
        className="mt-6 font-sans text-sm text-foreground underline underline-offset-4"
      >
        {t("homeAria")}
      </Link>
    </main>
  );
}
