"use client";

import { Button } from "@/shared/ui/action";
import { cn } from "@/shared/utils/clsx";

interface BrandAlphabetNavProps {
  letters: string[];
  activeLetter: string | null;
  onLetterClick: (letter: string) => void;
}

const BrandAlphabetNav = ({
  letters,
  activeLetter,
  onLetterClick,
}: BrandAlphabetNavProps) => (
  <div className="sticky top-0 mr-[-1.6vw] flex flex-col gap-[3.2vw] text-[3.2vw] pt-[5.867vw] w-[6.4vw] leading-none overflow-y-auto max-h-[456.827px] scrollbar-none shrink-0">
    {letters.map((letter) => (
      <Button
        key={letter}
        onClick={() => onLetterClick(letter)}
        className={cn(
          "transition-colors shrink-0",
          activeLetter === letter
            ? "text-slate-950 font-semibold"
            : "text-slate-400 hover:text-slate-950",
        )}
      >
        {letter}
      </Button>
    ))}
  </div>
);

export default BrandAlphabetNav;