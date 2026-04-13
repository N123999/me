export type SiteTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "site-theme";

/** 与 localStorage 同名，客户端设置后下次请求会带上（ThemeSync / 底栏切换写回）。 */
export const THEME_COOKIE = "site-theme";

/**
 * 注入 layout `<head>` 最前，在首帧 paint 前执行，与 ThemeSync 同源（localStorage → cookie）。
 * 避免仅依赖客户端 useLayoutEffect 时在 JS 未执行阶段闪错误主题。
 */
export const THEME_BOOTSTRAP_INLINE_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var c=${JSON.stringify(THEME_COOKIE)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){var cs=document.cookie.split(";");for(var i=0;i<cs.length;i++){var p=cs[i].trim().split("=");if(p[0]===c&&(p[1]==="light"||p[1]==="dark")){t=p[1];break}}}if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export function themeCookieString(theme: SiteTheme): string {
  return `${THEME_COOKIE}=${theme};path=/;max-age=31536000;SameSite=Lax`;
}

/** 仅客户端：`document.cookie` 无 HttpOnly 时可读。 */
export function readThemeFromDocumentCookie(): SiteTheme | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=(light|dark)(?:;|$)`),
  );
  const v = m?.[1];
  return v === "light" || v === "dark" ? v : null;
}
