import { cn } from "@/shared/utils/clsx";
import type { ReactNode } from "react";

interface FormFieldProps {
  error?: string | (string | undefined)[];
  children: ReactNode;
  className?: string;
}

const FormField = ({ error, children, className }: FormFieldProps) => {
  let errorMessages: string[] = [];

  if (Array.isArray(error)) {
    errorMessages = error.filter(Boolean) as string[];
  } else if (error) {
    errorMessages = [error];
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {children}

      {errorMessages.length > 0 && (
        <div className="text-xs text-red-500">
          {errorMessages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormField;
