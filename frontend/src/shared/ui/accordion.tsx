"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  chevronClassName?: string;
}

const Accordion = ({
  title,
  children,
  defaultOpen = true,
  className,
  chevronClassName,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn("mb-4 w-full justify-between text-start whitespace-normal", className)}
      >
        {title}

        <Icon
          icon="chevron-down"
          width={12}
          height={12}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
            chevronClassName,
          )}
        />
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
