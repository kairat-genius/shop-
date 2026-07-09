export function buildQueryString(
  params: Record<string, string | number | boolean | null | undefined | (string | number)[]>
): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    // Пропускаем null, undefined и пустые строки
    if (value == null || value === "") continue; // Заменили return на continue

    if (Array.isArray(value)) {
      // Если это массив, проходимся циклом for...of
      for (const item of value) {
        if (item != null && item !== "") {
          query.append(key, String(item));
        }
      }
    } else {
      // Если это примитив, добавляем как обычно
      query.append(key, String(value));
    }
  }

  return query.toString();
}