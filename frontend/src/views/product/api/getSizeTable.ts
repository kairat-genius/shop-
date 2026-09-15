import { apiFetch } from "@/shared/api/apiFetch";
import { SIZE_TABLE } from "@/shared/api/endpoints";
import type { SizeTableType } from "@/types/size-table.type";

export async function getSizeTable(spuId: number): Promise<SizeTableType> {
  const res = await apiFetch(SIZE_TABLE(spuId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
