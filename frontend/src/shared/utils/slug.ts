/**
 * Создает ЧПУ (slug) из названия и ID.
 * Пример: "Banner Toothbrushes (Unisex)" + "8900169487348076" -> "banner-toothbrushes-unisex-8900169487348076"
 */
export const generateProductSlug = (title: string, id: number | string): string => {
  const formattedTitle = title
    .toLowerCase()
    .replaceAll(/[^a-z0-9а-яё]/gi, "-") // Заменяем пробелы и спецсимволы на дефис
    .replaceAll(/-+/g, "-")             // Убираем дублирующиеся дефисы
    .replaceAll(/^-|-$/g, "");          // Убираем дефисы в начале и конце

  return `${formattedTitle}-${id}`;
};

/**
 * Извлекает ID из сформированного ЧПУ (slug).
 * Берет последнее значение после дефиса.
 * Пример: "banner-toothbrushes-unisex-8900169487348076" -> "8900169487348076"
 */
export const extractIdFromSlug = (slug: string): string | null => {
  if (!slug) return null;
  
  // Разбиваем строку по дефису и забираем последний элемент (это и есть наш ID)
  const parts = slug.split("-");
  const id = parts.pop();
  
  return id || null;
};