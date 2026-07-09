// @/shared/api/apiFetch.ts
import { useBoundStore } from "@/shared/store";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiFetch(url: string, options: FetchOptions = {}) {
  // Базовые заголовки по умолчанию
  const defaultHeaders = {
    ...options.headers,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers: defaultHeaders,
    });

    // Если запрос завершился неудачно (4xx или 5xx)
    if (!res.ok) {
      // Перехватываем критические ошибки на клиенте
      if (res.status === 429 || res.status >= 500) {
        // Zustand позволяет обновлять стор вне React-компонентов через getState()
        useBoundStore.getState().setApiErrorStatus(res.status);
      }

      throw new Error(`HTTP Error: ${res.status}`);
    }

    // Возвращаем распарсенный JSON
    return res;
  } catch (error) {
    // Если это сетевая ошибка (например, пропал интернет или сервер лежит),
    // fetch падает в блок catch. Записываем это как ошибку 500.
    if (error instanceof TypeError) {
      useBoundStore.getState().setApiErrorStatus(500);
    }
    throw error;
  }
}
