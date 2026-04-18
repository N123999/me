"use client";

import { MeshGradient } from "@mesh-gradient/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { BlogCoverVariant } from "@/lib/blog";
import {
  formatPresetForMeshDiffuseCover,
  MESH_COVER_PRESETS,
  normalizeHexColor,
  normalizeMeshFrequency,
  type MeshCoverPreset,
} from "@/lib/mesh-cover-presets";
import { NavBorderSentinel } from "@/components/nav-border-sentinel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VARIANTS = Object.keys(MESH_COVER_PRESETS) as BlogCoverVariant[];

const FREQ_LABEL_KEY = { x: "freqX", y: "freqY", delta: "freqDelta" } as const;

function clonePreset(p: MeshCoverPreset): MeshCoverPreset {
  return {
    colors: p.colors.map((h) => normalizeHexColor(h)) as MeshCoverPreset["colors"],
    seed: p.seed,
    frequency: normalizeMeshFrequency(p.frequency),
  };
}

/** 避免浮点累加漂移 */
function addByStep(value: number, direction: 1 | -1, step: number): number {
  const next = value + direction * step;
  const decimals = (() => {
    const s = step.toString();
    if (!s.includes(".")) return 0;
    return Math.min(s.split(".")[1]!.length + 2, 12);
  })();
  return Number(next.toFixed(decimals));
}

function LabNumberInput({
  value,
  onChange,
  step,
  min,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  step: number;
  min?: number;
  className?: string;
}) {
  const t = useTranslations("meshLab");
  const clamp = (n: number) => (min !== undefined ? Math.max(min, n) : n);

  const inc = () => onChange(clamp(addByStep(value, 1, step)));
  const dec = () => onChange(clamp(addByStep(value, -1, step)));

  return (
    <div
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-background text-sm shadow-xs transition-colors transition-shadow",
        "has-[:focus-visible]:border-foreground/35 has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring/35",
        className,
      )}
    >
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (Number.isNaN(v)) return;
          onChange(clamp(v));
        }}
        className={cn(
          "min-w-0 flex-1 rounded-l-md border-0 bg-transparent px-2 py-1.5 font-mono text-sm outline-none",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
      />
      <div
        className="flex shrink-0 flex-col divide-y divide-border overflow-hidden rounded-r-md border-l border-border bg-muted/30"
        role="group"
        aria-label={t("numberStepperGroup")}
      >
        <button
          type="button"
          onClick={inc}
          className="flex flex-1 items-center justify-center px-1.5 text-muted-foreground outline-none transition-colors hover:bg-muted/80 hover:text-foreground active:bg-muted"
          aria-label={t("increment")}
        >
          <ChevronUp className="size-3.5" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={dec}
          className="flex flex-1 items-center justify-center px-1.5 text-muted-foreground outline-none transition-colors hover:bg-muted/80 hover:text-foreground active:bg-muted"
          aria-label={t("decrement")}
        >
          <ChevronDown className="size-3.5" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}

export function MeshLabClient() {
  const t = useTranslations("meshLab");
  const [variant, setVariant] = useState<BlogCoverVariant>("violet");
  const [preset, setPreset] = useState<MeshCoverPreset>(() =>
    clonePreset(MESH_COVER_PRESETS.violet),
  );
  const [copied, setCopied] = useState(false);

  const loadNamedPreset = useCallback((v: BlogCoverVariant) => {
    setVariant(v);
    setPreset(clonePreset(MESH_COVER_PRESETS[v]));
  }, []);

  const updateColor = (i: number, hex: string) => {
    const next = hex.startsWith("#") ? hex : `#${hex}`;
    setPreset((p) => {
      const colors = [...p.colors] as MeshCoverPreset["colors"];
      colors[i] = normalizeHexColor(next.slice(0, 7));
      return { ...p, colors };
    });
  };

  const copySnippet = useCallback(async () => {
    const text = formatPresetForMeshDiffuseCover(variant, preset);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [variant, preset]);

  const snippet = useMemo(
    () => formatPresetForMeshDiffuseCover(variant, preset),
    [variant, preset],
  );

  /** 仅 Lab：关闭更新过渡与 smooth 首帧，避免调参与复制片段不一致；其它页面保留库默认淡入 */
  const meshOptions = useMemo(
    () => ({
      colors: preset.colors,
      seed: preset.seed,
      frequency: normalizeMeshFrequency(preset.frequency),
      isStatic: true,
      appearance: "default" as const,
      transition: false,
    }),
    [preset],
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 font-sans sm:px-8">
      <header className="mb-8 border-b border-border pb-6">
        <p className="relative text-xs tracking-tight text-muted-foreground tabular-nums">
          <NavBorderSentinel />
          {t("pathLabel")}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("copyIntroBefore")}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            lib/mesh-cover-presets.ts
          </code>
          {t("copyIntroAfter")}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
        <section className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t("previewCaption")}
          </p>
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-[4px] border border-border bg-background",
              "h-52 sm:h-56 md:h-60",
            )}
          >
            <MeshGradient
              className="pointer-events-none absolute inset-0 h-full w-full"
              options={meshOptions}
            />
          </div>
          <pre className="mesh-lab-snippet-scroll w-full min-w-0 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 font-mono text-[11px] leading-relaxed text-foreground/90">
            {snippet}
          </pre>
        </section>

        <aside className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {t("quickLoad")}
            </p>
            <div className="flex flex-wrap gap-2">
              {VARIANTS.map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant={variant === v ? "default" : "outline"}
                  size="sm"
                  onClick={() => loadNamedPreset(v)}
                  className="h-8 min-w-[4.25rem] px-3 text-xs font-medium tracking-tight tabular-nums"
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              {t("colorsHeading")}
            </p>
            {preset.colors.map((c, i) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <span className="w-8 shrink-0 text-muted-foreground tabular-nums">
                  {i + 1}
                </span>
                <input
                  type="color"
                  value={c.length === 7 ? c : "#000000"}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className={cn(
                    "h-9 w-12 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border bg-transparent p-0 outline-none",
                    "transition-colors transition-shadow",
                    "focus-visible:ring-1 focus-visible:ring-ring/35 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    "[appearance:none] [&::-webkit-color-swatch-wrapper]:border-0 [&::-webkit-color-swatch-wrapper]:p-0",
                    "[&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-0",
                    "[&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border-0",
                  )}
                />
                <input
                  type="text"
                  value={c}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="min-w-0 flex-1 rounded-md border border-input bg-background px-2 py-1.5 font-mono text-xs shadow-xs outline-none transition-colors transition-shadow focus-visible:border-foreground/35 focus-visible:ring-1 focus-visible:ring-ring/35"
                  spellCheck={false}
                />
              </label>
            ))}
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              {t("seed")}
            </span>
            <LabNumberInput
              step={1}
              min={0}
              value={preset.seed}
              onChange={(seed) => setPreset((p) => ({ ...p, seed }))}
            />
          </label>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              {t("frequency")}
            </p>
            {(["x", "y", "delta"] as const).map((key) => (
              <label key={key} className="block space-y-1">
                <span className="text-[11px] font-medium text-muted-foreground">
                  {t(FREQ_LABEL_KEY[key])}
                </span>
                <LabNumberInput
                  step={0.000001}
                  value={preset.frequency[key]}
                  onChange={(v) =>
                    setPreset((p) => ({
                      ...p,
                      frequency: normalizeMeshFrequency({
                        ...p.frequency,
                        [key]: v,
                      }),
                    }))
                  }
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="button"
              variant="default"
              className="h-10 min-h-10 w-full rounded-lg px-5 text-sm font-medium"
              onClick={() => void copySnippet()}
            >
              {copied ? t("copied") : t("copySnippet")}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              {t("pasteHintBefore")}
              <code className="font-mono text-foreground/80">MESH_COVER_PRESETS</code>
              {t("pasteHintAfter")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
