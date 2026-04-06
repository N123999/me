"use client";

import { MeshGradient } from "@mesh-gradient/react";
import type { BlogCoverVariant } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Blog 顶区：Figma 系 mesh 的近亲，用 WebGL 绘制（@mesh-gradient/react）。
 * 配色与 seed 可按需在 PRESETS 里调，接近里程碑区蓝/紫弥散。
 */
const PRESETS: Record<
  BlogCoverVariant,
  { colors: [string, string, string, string]; seed: number }
> = {
  violet: {
    colors: ["#d8b4fe", "#a78bfa", "#7dd3fc", "#f9a8d4"],
    seed: 11,
  },
  blue: {
    colors: ["#e0f2fe", "#7dd3fc", "#38bdf8", "#bae6fd"],
    seed: 24,
  },
  slate: {
    colors: ["#f4f4f5", "#a1a1aa", "#93c5fd", "#d4d4d8"],
    seed: 37,
  },
};

export function MeshDiffuseCover({
  variant,
  className,
}: {
  variant: BlogCoverVariant;
  className?: string;
}) {
  const preset = PRESETS[variant];

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-black", className)}
      aria-hidden
    >
      <MeshGradient
        className="pointer-events-none absolute inset-0 h-full w-full"
        options={{
          colors: preset.colors,
          seed: preset.seed,
          isStatic: true,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}
