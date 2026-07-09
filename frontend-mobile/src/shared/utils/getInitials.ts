/**
 * Генерирует инициалы из имени и фамилии.
 * Например: "Иван", "Иванов" -> "ИИ"
 * Если передано только имя "John" -> "J"
 */
export const getInitials = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const first = firstName?.trim().charAt(0) || "";
  const last = lastName?.trim().charAt(0) || "";

  const initials = (first + last).toUpperCase();

  // Возвращаем инициалы, либо дефолтный юзерпик "?", если данных нет совсем
  return initials || "?";
};
