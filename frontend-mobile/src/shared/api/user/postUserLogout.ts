import { USER_LOGOUT } from "@/shared/api/endpoints";

export async function postUserLogout() {
  try {
    const res = await fetch(USER_LOGOUT, {
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
      data: { message: "Logout failed" },
    };
  }
}
