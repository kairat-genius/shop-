/**
 * Извлекает ID из сформированного ЧПУ (slug).
 * Всегда берет последнюю часть после последнего дефиса.
 * 
 * Примеры:
 * "new-balance-nb-530-tekstil-89001694" -> "89001694"
 * "krossovki-nike-500000091" -> "500000091"
 * "89001694" -> "89001694" (если названия не было)
 */
export const extractIdFromSlug = (slug: string): string | null => {
  // 1. Проверка на пустоту
  if (!slug || typeof slug !== "string") return null;
  
  // 2. Разбиваем строку по дефисам
  const parts = slug.split("-");
  
  // 3. Достаем последний элемент (это наш ID)
  const id = parts.pop();
  
  // 4. (Опционально) Если вы уверены, что ID состоит только из цифр,
  // можно добавить проверку, чтобы отсеять мусорные URL:
  // if (id && !/^\d+$/.test(id)) return null; 
  
  return id || null;
};