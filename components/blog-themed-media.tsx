"use client";

import { useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

import type { SiteTheme } from "@/lib/theme";

function subscribeTheme(onStoreChange: () => void) {
  const el = document.documentElement;
  const obs = new MutationObserver(() => onStoreChange());
  obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

function getThemeSnapshot(): SiteTheme {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" ? "light" : "dark";
}

/** 与 layout 默认及首帧内联脚本未命中时一致 */
function getServerThemeSnapshot(): SiteTheme {
  return "dark";
}

function useSiteTheme(): SiteTheme {
  return useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
}

type ImgProps = {
  srcDark: string;
  srcLight: string;
  alt: string;
  width?: number;
  className?: string;
  style?: CSSProperties;
};

/** 博客 MDX：随 `data-theme` 切换 CDN 图，避免深浅各下一遍。 */
export function BlogThemedImage({
  srcDark,
  srcLight,
  alt,
  width,
  className,
  style,
}: ImgProps) {
  const theme = useSiteTheme();
  const src = theme === "light" ? srcLight : srcDark;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      suppressHydrationWarning
    />
  );
}

type VideoProps = {
  srcDark: string;
  srcLight: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** 博客 MDX：随 `data-theme` 切换视频源；主题切换时 `key` 强制重挂载以换片。 */
export function BlogThemedVideo({
  srcDark,
  srcLight,
  className,
  style,
  children,
}: VideoProps) {
  const theme = useSiteTheme();
  const src = theme === "light" ? srcLight : srcDark;

  return (
    <video
      key={src}
      controls
      width="100%"
      className={className}
      style={{ borderRadius: "12px", ...style }}
      suppressHydrationWarning
    >
      <source src={src} type="video/mp4" />
      {children}
    </video>
  );
}
