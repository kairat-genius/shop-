// @/shared/utils/session.ts
export function getSessionKey(): string {
  if (globalThis.window === undefined) return "";
  let key = localStorage.getItem("session_key");
  if (!key) {
    key = crypto.randomUUID(); // Генерируем уникальный ID сессии
    localStorage.setItem("session_key", key);
  }
  return key;
}