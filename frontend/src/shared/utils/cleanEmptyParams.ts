export function cleanEmptyParams<T extends object>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params as Record<string, unknown>).filter(([, value]) => {
      if (value === undefined || value === null) {
        return false;
      }

      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.some((item) => {
          if (item === undefined || item === null) return false;
          if (typeof item === "string") return item.trim().length > 0;
          return true;
        });
      }

      return true;
    }),
  ) as Partial<T>;
}
