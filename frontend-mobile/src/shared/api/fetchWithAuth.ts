import { postTokenRefresh } from "@/shared/api/user/postTokenRefresh";
import { postUserLogout } from "@/shared/api/user/postUserLogout";

type FetchOptions = RequestInit & {
  retry?: boolean;
};

export async function fetchWithAuth(
  input: RequestInfo,
  options: FetchOptions = {},
): Promise<Response> {
  const { retry = true, ...fetchOptions } = options;

  const doFetch = () =>
    fetch(input, {
      ...fetchOptions,
      credentials: "include",
    });

  let res = await doFetch();

  if (res.status === 401 && retry) {
    const data = await res
      .clone()
      .json()
      .catch(() => null);

    const code = data?.error?.code;

    // 1. нет токенов
    if (code === "not_authenticated") {
      return res;
    }

    const detail = data?.detail;

    // 2. если сессия недействительна (выкинули с другого устройства)
    if (detail === "Session expired or logged in from another device.") {
      const { status } = await postUserLogout();
      if (status === 200) {
        res = await doFetch();
      }
    } else {
      // иначе пробуем refresh токена
      const { status } = await postTokenRefresh();

      if (status === 200) {
        res = await doFetch();
      }
    }
  }

  return res;
}
