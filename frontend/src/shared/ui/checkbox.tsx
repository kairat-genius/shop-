"use client";

import { type ReactNode } from "react";
import { cn } from "@/shared/utils/clsx";
import Icon from "../icon";

interface CheckboxProps {
  checked?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Checkbox = ({ onClick, children, checked }: CheckboxProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-1.5 cursor-pointer"
    >
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border-2 transition-all duration-200",
          checked
            ? "bg-slate-900 border-slate-600"
            : "bg-white border-slate-400 group-hover:border-slate-600",
        )}
      >
        <Icon
          icon="check"
          width={12}
          height={12}
          strokeWidth={3}
          className={cn(
            "transition-opacity duration-200 text-white",
            checked ? "opacity-100" : "opacity-0",
          )}
        />
      </span>

      <span className="text-[14px] leading-4">{children}</span>
    </button>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
