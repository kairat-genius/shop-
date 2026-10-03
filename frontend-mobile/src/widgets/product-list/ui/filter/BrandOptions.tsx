"use client";

import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";

export interface FacetOption {
  id: string;
  title: string;
  label?: string;
  labelUrl?: string;
}

interface BrandOptionsProps {
  items: FacetOption[];
  selectedValues: (string | number)[];
  onToggle: (id: string) => void;
}

const BrandOptions = ({
  items,
  selectedValues,
  onToggle,
}: BrandOptionsProps) => {
  return (
    <div>
      {items.map((item) => {
        const isSelected = selectedValues.includes(item.id);
        return (
          <Button
            key={item.id}
            aria-pressed={isSelected}
            onClick={() => onToggle(item.id)}
            className={cn(
              "h-[8vw] flex items-center justify-start border-scale before:border-b before:border-slate-100 w-full",
            )}
          >
            <Icon
              icon={isSelected ? "square-check" : "square"}
              className="w-[3.733vw] h-[3.733vw]"
            />

            <div className="ml-[2.667vw] text-[3.2vw] leading-[normal]">
              {item.title}
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default BrandOptions;
