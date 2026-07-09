import { CDN } from "@/shared/settings";

export const getImageUrl = (url?: string) => {
  if (!url) return "";

  return url.startsWith("http") ? url : CDN + url;
};