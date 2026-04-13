import { NAV_BORDER_SENTINEL_ID } from "@/lib/site-header-sentinel";

/**
 * 父级需 `position: relative`（通常为面包屑所在行）。
 * 与首页 hero sentinel 同源逻辑：顶栏 sticky + rootMargin -56px。
 */
export function NavBorderSentinel() {
  return (
    <span
      id={NAV_BORDER_SENTINEL_ID}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
    />
  );
}
