"use client";

import { useMemo, useState } from "react";
import Checkbox from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

export interface FilterCheckboxItem {
  id: string;
  title: string;
  checked?: boolean;
}

interface FilterCheckboxListProps {
  items: FilterCheckboxItem[];
  value: string[];
  onChange?: (value: string[]) => void;
}

const MAX_VISIBLE = 7;

const FilterCheckboxList = ({ items, onChange, value }: FilterCheckboxListProps) => {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = useMemo(
    () => (expanded ? items : items.slice(0, MAX_VISIBLE)),
    [expanded, items],
  );

  const handleToggle = (id: string) => {
    const newValue = value.includes(id)
      ? value.filter((item) => item !== id)
      : [...value, id];

    onChange?.(newValue);
  };

  return (
    <div className="ml-0.5">
      <div className="flex flex-col gap-2">
        {visibleItems.map((item) => (
          <Checkbox
            key={item.id}
            checked={value.includes(item.id)}
            onClick={() => handleToggle(item.id)}
          >
            {item.title}
          </Checkbox>
        ))}
      </div>

      {!expanded && items.length > MAX_VISIBLE && (
        <Button
          className="mt-3 w-full justify-start gap-1.5 text-sm text-slate-500"
          onClick={() => setExpanded(true)}
        >
          <Icon icon="plus" width={16} height={16} />
          Показать больше
        </Button>
      )}
    </div>
  );
};

export default FilterCheckboxList;
