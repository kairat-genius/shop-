import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

interface HandleErrorsParams<T extends FieldValues> {
  response: {
    success?: boolean;
    error?: {
      code?: string;
      message?: string;
    };
  };

  setError: UseFormSetError<T>;

  showToast: (message: string, type: "success" | "invalid" | "error") => void;
}

type ParsedServerErrors = Record<string, string>;

const parseServerErrorMessage = (message: string): ParsedServerErrors => {
  try {
    const normalized = message
      .replaceAll("'", '"')
      .replaceAll(/ErrorDetail\(string="([^"]+)", code="[^"]+"\)/g, '"$1"');

    return JSON.parse(normalized);
  } catch {
    return {};
  }
};

export const processServerErrors = <T extends FieldValues>({
  response,
  setError,
  showToast,
}: HandleErrorsParams<T>): boolean => {
  const errorMessage = response.error?.message;

  if (!errorMessage) {
    showToast("Something went wrong", "error");
    return false;
  }

  const parsedErrors = parseServerErrorMessage(errorMessage);

  const entries = Object.entries(parsedErrors);

  if (entries.length === 0) {
    showToast(errorMessage, "invalid");
    return false;
  }

  for (const [field, value] of entries) {
    const message = Array.isArray(value) ? value[0] : value;

    if (field === "non_field_errors") {
      showToast(message, "invalid");

      continue;
    }

    setError(field as Path<T>, {
      type: "manual",
      message,
    });

    showToast(message, "invalid");
  }

  return true;
};
