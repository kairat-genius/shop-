/**
 * Превращает ISO дату в относительное время
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Разница в секундах (может быть отрицательной для прошлого)
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  // Работаем с абсолютным значением для правильного подбора интервала
  const absDiffInSeconds = Math.abs(diffInSeconds);

  const intervals: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31_536_000 },
    { unit: "month", seconds: 2_592_000 },
    { unit: "week", seconds: 604_800 },
    { unit: "day", seconds: 86_400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ];

  const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "always" });

  for (const interval of intervals) {
    // Если разница больше или равна текущему интервалу
    if (absDiffInSeconds >= interval.seconds) {
      // Считаем количество полных интервалов
      const count = Math.floor(absDiffInSeconds / interval.seconds);
      // Возвращаем правильный знак: отрицательный для прошлого, положительный для будущего
      const sign = diffInSeconds < 0 ? -1 : 1;

      return rtf.format(count * sign, interval.unit);
    }
  }

  return "только что";
};
