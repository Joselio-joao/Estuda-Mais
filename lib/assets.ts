import { getApiBaseUrl } from "@/constants/oauth";
export function resolveAssetUrl(url?: string | null) { if (!url || /^https?:\/\//.test(url) || url.startsWith("data:")) return url ?? undefined; return `${getApiBaseUrl()}${url}`; }
