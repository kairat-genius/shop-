import { CDN } from "@/shared/settings";

export const getImageUrl = (url?: string, size = 540) => {
  if (!url) return "";

  const imageUrl = url.startsWith("http") ? url : CDN + url;

  return imageUrl
    .replace("/origin-img/", "/cut-img/")
    + `?x-oss-process=image/resize,s_${size}/format,webp`;
};