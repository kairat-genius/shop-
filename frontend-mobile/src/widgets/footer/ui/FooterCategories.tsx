// src/widgets/footer/ui/FooterCategories.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { categoriesDropdownData } from "../data/categoriesDropdown.data";
import { cn } from "@/shared/utils/clsx";

const FooterCategories = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <Button
        className="ml-auto"
        onClick={toggle}
        aria-label={isOpen ? "Скрыть категории" : "Показать категории"}
      >
        <Icon
          icon="chevron-down"
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          width={16}
          height={16}
        />
      </Button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="my-12"
          style={{
            backgroundColor: "rgba(0, 0, 0, .3)",
            height: ".5px",
          }}
        />
        <div className="flex justify-between gap-3">
          {categoriesDropdownData.map((item, index) => (
            <div key={index} className="max-w-62.5 space-y-6">
              <h3 className="font-bold text-2xl leading-7 whitespace-nowrap">
                {item.title}
              </h3>
              <div className="text-sm font-light leading-4 flex flex-col gap-3.5">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    target="_blank"
                    rel="opener"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterCategories;
