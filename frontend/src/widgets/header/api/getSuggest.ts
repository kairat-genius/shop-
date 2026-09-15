import { apiFetch } from "@/shared/api/apiFetch";
import { SUGGEST } from "@/shared/api/endpoints";

export async function getSuggest(
  query: string,
): Promise<{ suggestions: string[] }> {
  const res = await apiFetch(`${SUGGEST}?keyword=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
