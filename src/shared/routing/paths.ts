/**
 * Roteamento Base-Path Agnóstico (VOID Blueprint V2)
 * Garante funcionamento idêntico em domínio raiz (Cloudflare Pages / domínio próprio)
 * e em sub-caminhos (GitHub Pages).
 */
export function withBase(path: string): string {
  if (!path) return '/';
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(path)) {
    return path;
  }

  const base = import.meta.env?.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedBase && normalizedPath.startsWith(`${normalizedBase}/`)) {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}` || '/';
}
