"use client";

import { MeshGradient } from "@mesh-gradient/react";
import { useMemo } from "react";
import type { BlogCoverVariant } from "@/lib/blog";
import {
  MESH_COVER_PRESETS,
  normalizeMeshFrequency,
} from "@/lib/mesh-cover-presets";
import { cn } from "@/lib/utils";

/**
 * Blog 顶区 mesh：配色见 `lib/mesh-cover-presets.ts`，可在开发环境 `/tools/mesh-lab` 微调。
 * 使用库默认 appearance（smooth 淡入）；`transition: false` 仅用于 Mesh Lab 调参页。
 */
export function MeshDiffuseCover({
  variant,
  className,
}: {
  variant: BlogCoverVariant;
  className?: string;
}) {
  const preset = MESH_COVER_PRESETS[variant];

  const meshOptions = useMemo(
    () => ({
      colors: preset.colors,
      seed: preset.seed,
      frequency: normalizeMeshFrequency(preset.frequency),
      isStatic: true,
    }),
    [preset],
  );

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-background", className)}
      aria-hidden
    >
      <MeshGradient
        className="pointer-events-none absolute inset-0 h-full w-full"
        options={meshOptions}
      />
    </div>
  );
}
