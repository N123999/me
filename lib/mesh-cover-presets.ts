import type { BlogCoverVariant } from "@/lib/blog";

export type MeshCoverPreset = {
  colors: [string, string, string, string];
  seed: number;
  frequency: { x: number; y: number; delta: number };
};

/** 与 TS 源码字面量一致，避免 parseFloat / 步进累加产生与复制片段不一致的二进制尾数 */
export function normalizeMeshFrequency(f: MeshCoverPreset["frequency"]): MeshCoverPreset["frequency"] {
  const r = (n: number) => Number(n.toFixed(8));
  return { x: r(f.x), y: r(f.y), delta: r(f.delta) };
}

export function normalizeHexColor(hex: string): string {
  const c = hex.startsWith("#") ? hex : `#${hex}`;
  return c.slice(0, 7).toLowerCase();
}

/** Blog 封面三套预设；与 Mesh 实验室共用，改完在此文件或实验室里复制回即可 */
export const MESH_COVER_PRESETS: Record<BlogCoverVariant, MeshCoverPreset> = {
  violet: {
    colors: ["#8a519a","#7948ea","#6b03b0","#330896"],
    seed: 21,
    frequency: { x: 0.0002, y: 0.00026, delta: 0.00012 },
  },
  blue: {
    colors: ["#3287f5","#0145e4","#73a2ce","#0049f5"],
    seed: 10,
    frequency: { x: 0.0002, y: 0.00026, delta: 0.000141 },
  },
  slate: {
    colors: ["#e2e8f0", "#64748b", "#1e293b", "#020617"],
    seed: 305,
    frequency: { x: 0.00016, y: 0.00022, delta: 0.0001 },
  },
};

export function formatPresetForMeshDiffuseCover(
  variant: BlogCoverVariant,
  p: MeshCoverPreset,
): string {
  const c = JSON.stringify(p.colors.map((h) => normalizeHexColor(h)));
  const f = normalizeMeshFrequency(p.frequency);
  return `  ${variant}: {
    colors: ${c},
    seed: ${p.seed},
    frequency: { x: ${f.x}, y: ${f.y}, delta: ${f.delta} },
  },`;
}
