import Image from "next/image";
import { Rocket } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { XIANYU_LAUNCHER_HREF } from "@/lib/site-url";
import { cn } from "@/lib/utils";

type PreviewKind =
  | "image"
  | "launcher-symbol"
  | "soon-text"
  | "spirit-agent-logo"
  | "spirit-studio-logo";

type ProjectItem = {
  title: string;
  href?: string;
  external?: boolean;
  eyebrowKey: string;
  previewImageSrc?: string;
  previewKind?: PreviewKind;
  previewImageClassName?: string;
};

const projectItems: ProjectItem[] = [
  {
    title: "Spirit Studio",
    href: "/product",
    eyebrowKey: "spiritStudioMeta",
    previewKind: "spirit-studio-logo",
  },
  {
    title: "Spirit Agent",
    href: "/product",
    eyebrowKey: "spiritAgentMeta",
    previewKind: "spirit-agent-logo",
  },
  {
    title: "XianYu Launcher",
    href: XIANYU_LAUNCHER_HREF,
    external: true,
    eyebrowKey: "xianyuLauncherMeta",
    previewKind: "launcher-symbol",
  },
  {
    title: "Coming soon.",
    eyebrowKey: "comingSoonMeta",
    previewKind: "soon-text",
  },
];

function SpiritAgentGlassLogoPreview() {
  return (
    <div className="project-spirit-agent-preview relative flex aspect-[16/10] w-full max-w-[28rem] items-center justify-center overflow-hidden md:h-[17.5rem] md:w-[28rem] md:max-w-none">
      <div
        className="relative inline-block overflow-visible"
        style={{ width: 120, height: 133, zIndex: 1 }}
      >
        <svg
          viewBox="0 0 142 157"
          width="120"
          height="133"
          className="absolute inset-0 overflow-visible"
        >
          <defs>
            <linearGradient
              id="project-spirit-agent-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--spirit-agent-fill-strong)" />
              <stop offset="40%" stopColor="var(--spirit-agent-fill-mid)" />
              <stop offset="100%" stopColor="var(--spirit-agent-fill-tail)" />
            </linearGradient>

            <linearGradient
              id="project-spirit-agent-inner"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--spirit-agent-inner-strong)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="var(--spirit-agent-inner-tail)" />
            </linearGradient>

            <linearGradient
              id="project-spirit-agent-fresnel"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--spirit-agent-fresnel-a)" />
              <stop offset="25%" stopColor="var(--spirit-agent-fresnel-b)" />
              <stop offset="55%" stopColor="var(--spirit-agent-fresnel-c)" />
              <stop offset="100%" stopColor="var(--spirit-agent-fresnel-d)" />
            </linearGradient>

            <filter
              id="project-spirit-agent-blur-sm"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
            <filter
              id="project-spirit-agent-blur-md"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="4" />
            </filter>

            <mask id="project-spirit-agent-mask">
              <path
                d="M0 0L141.409 69.4512L70.7825 78.2408C61.5778 79.3863 53.5378 85.016 49.3132 93.2737L16.8979 156.635L0 0Z"
                fill="white"
              />
            </mask>

            <linearGradient
              id="project-spirit-agent-shimmer"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="28%" stopColor="rgba(255,255,255,0)" />
              <stop offset="42%" stopColor="var(--spirit-agent-shimmer-soft)" />
              <stop offset="50%" stopColor="var(--spirit-agent-shimmer-peak)" />
              <stop offset="58%" stopColor="var(--spirit-agent-shimmer-soft)" />
              <stop offset="72%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          <path
            d="M0 0L141.409 69.4512L70.7825 78.2408C61.5778 79.3863 53.5378 85.016 49.3132 93.2737L16.8979 156.635L0 0Z"
            fill="url(#project-spirit-agent-fill)"
          />
          <path
            d="M0 0L141.409 69.4512L70.7825 78.2408C61.5778 79.3863 53.5378 85.016 49.3132 93.2737L16.8979 156.635L0 0Z"
            fill="url(#project-spirit-agent-inner)"
          />
          <path
            d="M0 0L141.409 69.4512L70.7825 78.2408C61.5778 79.3863 53.5378 85.016 49.3132 93.2737L16.8979 156.635L0 0Z"
            fill="none"
            stroke="url(#project-spirit-agent-fresnel)"
            strokeWidth="3"
            opacity="0.18"
            filter="url(#project-spirit-agent-blur-md)"
          />
          <path
            d="M0 0L141.409 69.4512L70.7825 78.2408C61.5778 79.3863 53.5378 85.016 49.3132 93.2737L16.8979 156.635L0 0Z"
            fill="none"
            stroke="var(--spirit-agent-stroke-main)"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <path
            d="M0 0L141.409 69.4512L70.7825 78.2408C61.5778 79.3863 53.5378 85.016 49.3132 93.2737L16.8979 156.635L0 0Z"
            fill="none"
            stroke="var(--spirit-agent-stroke-soft)"
            strokeWidth="1.5"
            filter="url(#project-spirit-agent-blur-sm)"
            opacity="0.5"
          />

          <g mask="url(#project-spirit-agent-mask)" pointerEvents="none">
            <rect
              className="spirit-glass-shimmer"
              x="-400"
              y="-150"
              width="1000"
              height="500"
              fill="url(#project-spirit-agent-shimmer)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SpiritStudioWordmarkPreview() {
  return (
    <div className="relative flex aspect-[16/10] w-full max-w-[28rem] items-center justify-center overflow-hidden md:h-[17.5rem] md:w-[28rem] md:max-w-none">
      <div
        aria-hidden
        className="project-spirit-studio-wordmark absolute inset-0 m-auto h-[58%] w-[82%]"
        style={{
          maskImage: 'url("/project/spirit-studio-dark.svg")',
          WebkitMaskImage: 'url("/project/spirit-studio-dark.svg")',
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </div>
  );
}

function ProjectPreview({
  imageSrc,
  previewKind,
  imageClassName,
  soonPreviewLabel,
}: {
  imageSrc?: string;
  previewKind?: PreviewKind;
  imageClassName?: string;
  soonPreviewLabel: string;
}) {
  if (previewKind === "spirit-studio-logo") {
    return <SpiritStudioWordmarkPreview />;
  }

  if (previewKind === "spirit-agent-logo") {
    return <SpiritAgentGlassLogoPreview />;
  }

  if (previewKind === "launcher-symbol") {
    return (
      <div className="relative flex aspect-[16/10] w-full max-w-[28rem] items-center justify-center overflow-hidden md:h-[17.5rem] md:w-[28rem] md:max-w-none">
        <Rocket
          className="project-preview-symbol size-28 text-foreground sm:size-32 md:size-36"
          strokeWidth={1.1}
          aria-hidden
        />
      </div>
    );
  }

  if (previewKind === "soon-text") {
    return (
      <div className="relative flex aspect-[16/10] w-full max-w-[28rem] items-center justify-center overflow-hidden md:h-[17.5rem] md:w-[28rem] md:max-w-none">
        <p className="project-preview-symbol max-w-[8ch] text-center font-sans text-[clamp(2.4rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-muted-foreground">
          {soonPreviewLabel}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[16/10] w-full max-w-[28rem] overflow-hidden md:h-[17.5rem] md:w-[28rem] md:max-w-none ${imageSrc ? "" : "border border-[color:var(--frame-line)] bg-[color:var(--frame-panel)]"}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          unoptimized
          className={cn("object-contain", imageClassName)}
        />
      ) : (
        <>
          <div className="absolute inset-[8%] border border-[color:var(--frame-line)] opacity-60" />
          <div className="absolute left-[12%] top-[16%] h-px w-[42%] bg-[color:var(--frame-line)]" />
          <div className="absolute left-[12%] top-[24%] h-px w-[28%] bg-[color:var(--frame-line)] opacity-70" />
          <div className="absolute bottom-[14%] right-[10%] h-[34%] w-[30%] border border-[color:var(--frame-line)] opacity-60" />
        </>
      )}
    </div>
  );
}

export async function HomeProjects({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.projects" });

  return (
    <section className="-mt-px bg-background px-5 pb-0 pt-0 sm:px-10 md:px-12">
      <div className="mx-auto max-w-6xl border border-[color:var(--frame-line)] bg-background/92">
        <div className="border-b border-[color:var(--frame-line)] px-5 py-5 text-center sm:px-6 md:px-8">
          <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            Project
          </h2>
        </div>

        <div>
          {projectItems.map((item, index) => {
            const className = `grid gap-8 px-5 py-6 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1.1fr)] md:items-center md:px-8 md:py-8 ${index !== 0 ? "border-t border-[color:var(--frame-line)]" : ""}`;

            return (
              <div key={item.title} className={className}>
                <div className="flex min-w-0 flex-col items-start justify-center">
                  <p className="mt-3 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.92rem] leading-6 text-muted-foreground sm:text-[0.98rem]">
                    {t(item.eyebrowKey)}
                  </p>
                  <div className="mt-5">
                    {item.href ? (
                      item.external ? (
                        <Button
                          asChild
                          size="lg"
                          className="rounded-full px-4"
                        >
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t("projectCta")}
                          </a>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          size="lg"
                          className="rounded-full px-4"
                        >
                          <Link href={item.href}>{t("projectCta")}</Link>
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="outline"
                        size="lg"
                        disabled
                        className="rounded-full px-4 text-muted-foreground disabled:pointer-events-none disabled:opacity-100"
                      >
                        {t("projectCta")}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="w-full md:max-w-[28rem] md:justify-self-end">
                  <ProjectPreview
                    imageSrc={item.previewImageSrc}
                    previewKind={item.previewKind}
                    imageClassName={item.previewImageClassName}
                    soonPreviewLabel={t("soonPreview")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
