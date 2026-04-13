import { notFound } from "next/navigation";
import { MeshLabClient } from "@/components/tools/mesh-lab-client";

/**
 * 仅开发环境：生产构建为 404，避免线上暴露调参页。
 */
export default function MeshLabPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <MeshLabClient />;
}
