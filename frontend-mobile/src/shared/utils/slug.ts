import slugify from "slugify";

export const generateProductSlug = (title: string, id: number | string): string => {
  if (!title) return String(id);

  // Транслитерирует текст и убирает спецсимволы
  const slug = slugify(title, {
    lower: true,      // в нижний регистр
    strict: true,     // удаляет спецсимволы
    trim: true,       // убирает пробелы по краям
  });

  return slug ? `${slug}-${id}` : String(id);
};