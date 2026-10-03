"use client";

import { useRef, useState } from "react";
import type { FacetGroup } from "../../utils/getFacetGroups";
import BrandOptions from "./BrandOptions";
import BrandAlphabetNav from "./BrandAlphabetNav";
import FilterOptions from "./FilterOptions";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

interface BrandFilterProps {
  featuredBrands?: FacetGroup;
  allBrands?: FacetGroup;
  selectedIds: (string | number)[];
  onToggle: (id: string) => void;
}

const BrandFilter = ({
  featuredBrands,
  allBrands,
  selectedIds,
  onToggle,
}: BrandFilterProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const brandLetterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);

    brandLetterRefs.current[letter]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const visibleGroups = isExpanded
    ? allBrands?.groups
    : allBrands?.groups.slice(0, 3);

  return (
    <div className="space-y-[3.2vw]" ref={rootRef}>
      {featuredBrands && featuredBrands.items.length > 0 && (
        <div className="space-y-[.533vw]">
          <div className="text-[3.2vw] leading-[normal]">
            {featuredBrands.name.trim()}
          </div>

          <FilterOptions
            items={featuredBrands.items}
            selectedValues={selectedIds}
            onToggle={onToggle}
          />
        </div>
      )}

      {allBrands && allBrands.groups.length > 0 && (
        <div className="space-y-[.533vw]">
          <div className="flex items-center">
            <div className="text-[3.2vw] leading-[normal]">
              {allBrands.name.trim()}
            </div>

            <Button
              type="button"
              aria-label={
                isExpanded ? "Скрыть все бренды" : "Показать все бренды"
              }
              onClick={() => setIsExpanded((value) => !value)}
              className="ml-auto flex items-center"
            >
              <Icon
                icon="chevron-down"
                className={`h-[3.2vw] w-[3.2vw] transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
          {isExpanded && (
            <div className="flex">
              <div className="space-y-[2.133vw] flex-1">
                {visibleGroups?.map((letterGroup) => (
                  <div
                    key={letterGroup.id || letterGroup.name}
                    ref={(el) => {
                      brandLetterRefs.current[letterGroup.name] = el;
                    }}
                  >
                    <div className="text-[3.467vw] leading-[normal]">
                      {letterGroup.name}
                    </div>

                    {letterGroup.items.length > 0 && (
                      <BrandOptions
                        items={letterGroup.items}
                        selectedValues={selectedIds}
                        onToggle={onToggle}
                      />
                    )}
                  </div>
                ))}
              </div>

              <BrandAlphabetNav
                letters={allBrands.groups.map((group) => group.name)}
                activeLetter={activeLetter}
                onLetterClick={scrollToLetter}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandFilter;
