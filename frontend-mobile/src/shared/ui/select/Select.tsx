"use client";
import Icon from "@/shared/icon";
import { useRef, useState } from "react";
import type { SelectProps } from "./select.type";
import { cn } from "@/shared/utils/clsx";
import { Button } from "@/shared/ui/action";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

const Select = ({
  items,
  value,
  onChange,
  className,
  placeholder,
  disabled,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const selectedLabel =
    items.find((item) => item.slug === value)?.title || placeholder;

  return (
    <div className={cn("relative w-60", className)} ref={containerRef}>
      {/* --- Trigger --- */}
      <Button
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "border rounded-sm px-3 h-9 gap-4 w-full justify-between",
          disabled && "cursor-not-allowed",
        )}
      >
        <span
          className={cn("pointer-events-none text-sm", isOpen && "opacity-50")}
          title={selectedLabel}
        >
          {selectedLabel}
        </span>
        <Icon
          icon="chevron-down"
          width={16}
          height={16}
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </Button>
      {/* --- Dropdown --- */}
      <div
        className={cn(
          "z-60 w-full overflow-hidden bg-white transition-all duration-150 rounded-sm",
          "absolute top-9.5 left-0",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1",
        )}
        style={{
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
        aria-hidden={!isOpen}
      >
        <ul className="overflow-y-auto w-full">
          {items.length > 0 ? (
            items.map((item) => {
              const isSelected = item.slug === value;
              return (
                <li
                  key={item.slug}
                  onClick={() => {
                    onChange(item.slug);
                    setIsOpen(false);
                  }}
                  title={item.title}
                  className={cn(
                    "px-3 h-12 text-sm hover:bg-slate-100 flex items-center cursor-pointer",
                    isSelected && "font-semibold bg-slate-100",
                  )}
                >
                  {item.title}
                </li>
              );
            })
          ) : (
            <li className="py-2 text-center text-sm">Nothing found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Select;
