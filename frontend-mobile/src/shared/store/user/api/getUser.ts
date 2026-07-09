import { USER_DATA } from "@/shared/api/endpoints";

import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import type { UserType } from "./type";

export async function getUser(): Promise<UserType> {
  try {
    const res = await fetchWithAuth(USER_DATA, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
