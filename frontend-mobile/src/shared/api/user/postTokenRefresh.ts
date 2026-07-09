import { USER_TOKEN_REFRESH } from "@/shared/api/endpoints";

export async function postTokenRefresh() {
  try {
    const res = await fetch(USER_TOKEN_REFRESH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const json = await res.json();

    return {
      status: res.status,
      data: json,
    };
  } catch {
    return {
      status: 500,
      error: {
        message: "Ошибка при обновлении токена",
      },
    };
  }
}
