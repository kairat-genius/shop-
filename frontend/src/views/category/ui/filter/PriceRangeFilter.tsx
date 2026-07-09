// features/filter/ui/PriceRangeFilter.tsx
"use client";

import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number] | null;
  onChange: (value: [number, number]) => void;
  step?: number;
}

const formatNumber = (num: number) => {
  if (num === 0) return ""; 
  return num.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const parseInput = (str: string) => {
  const cleaned = str.replaceAll(/\s/g, "");
  if (cleaned === "") return ""; 
  const num = Number.parseInt(cleaned, 10);
  return Number.isNaN(num) ? null : num;
};

const PriceRangeFilter = ({
  min,
  max,
  value,
  onChange,
  step = 100,
}: PriceRangeFilterProps) => {
  // 1. Храним "предыдущее" внешнее значение, чтобы поймать его изменение (например, сброс фильтров)
  const [prevValue, setPrevValue] = useState<[number, number] | null>(value);
  
  // 2. Инициализируем локальные стейты
  const initialRange = value ?? [min, max];
  const [localRange, setLocalRange] = useState<[number, number]>(initialRange);
  const [inputMin, setInputMin] = useState(initialRange[0] === min ? "" : formatNumber(initialRange[0]));
  const [inputMax, setInputMax] = useState(initialRange[1] === max ? "" : formatNumber(initialRange[1]));

  // 3. Синхронизация стейта при изменении пропсов БЕЗ useEffect (рекомендация React Dev)
  if (value !== prevValue) {
    setPrevValue(value);
    const updatedRange = value ?? [min, max];
    setLocalRange(updatedRange);
    setInputMin(updatedRange[0] === min ? "" : formatNumber(updatedRange[0]));
    setInputMax(updatedRange[1] === max ? "" : formatNumber(updatedRange[1]));
  }

  const handleSliderChange = (newValue: number[]) => {
    const rangeTuple: [number, number] = [newValue[0], newValue[1]];
    setLocalRange(rangeTuple);
    setInputMin(rangeTuple[0] === min ? "" : formatNumber(rangeTuple[0]));
    setInputMax(rangeTuple[1] === max ? "" : formatNumber(rangeTuple[1]));
  };

  const handleSliderCommit = (newValue: number[]) => {
    onChange?.([newValue[0], newValue[1]]);
  };

  const commitInput = (type: "min" | "max") => {
    const rawStr = type === "min" ? inputMin : inputMax;
    const parsed = parseInput(rawStr);

    if (parsed === null) {
      setInputMin(localRange[0] === min ? "" : formatNumber(localRange[0]));
      setInputMax(localRange[1] === max ? "" : formatNumber(localRange[1]));
      return;
    }

    let val: number;
    if (parsed === "") {
      val = type === "min" ? min : max;
    } else {
      val = parsed;
    }

    val = Math.max(min, Math.min(val, max));

    let newMin = localRange[0];
    let newMax = localRange[1];

    if (type === "min") {
      newMin = Math.min(val, localRange[1] - step);
      newMin = Math.max(min, newMin);
    } else {
      newMax = Math.max(val, localRange[0] + step);
      newMax = Math.min(max, newMax);
    }

    const finalRange: [number, number] = [newMin, newMax];
    setLocalRange(finalRange);
    
    setInputMin(newMin === min ? "" : formatNumber(newMin));
    setInputMax(newMax === max ? "" : formatNumber(newMax));
    
    onChange?.(finalRange);
  };

  return (
    <div className="space-y-4">
      <div className="relative pt-4 pb-2 mx-1.75">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={localRange}
          min={min}
          max={max}
          step={step}
          minStepsBetweenThumbs={1}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-px">
            <Slider.Range className="absolute bg-slate-900 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb 
            className="block w-3.25 h-3.25 bg-white border-2 border-slate-900 rounded-full shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400" 
            aria-label="Minimum price"
          />
          <Slider.Thumb 
            className="block w-3.25 h-3.25 bg-white border-2 border-slate-900 rounded-full shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400" 
            aria-label="Maximum price"
          />
        </Slider.Root>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={inputMin}
            onChange={(e) => setInputMin(e.target.value)}
            onBlur={() => commitInput("min")}
            onKeyDown={(e) => e.key === "Enter" && commitInput("min")}
            placeholder={`${min.toLocaleString("ru-RU")} ₽`}
            className="h-10 w-full px-3 text-base font-bold font-roboto_condensed border border-slate-950 rounded-sm focus:outline-none focus:border-slate-500"
          />
        </div>
        <span className="text-gray-400">–</span>
        <div className="flex-1">
          <input
            type="text"
            value={inputMax}
            onChange={(e) => setInputMax(e.target.value)}
            onBlur={() => commitInput("max")}
            onKeyDown={(e) => e.key === "Enter" && commitInput("max")}
            placeholder={`${max.toLocaleString("ru-RU")} ₽`}
            className="h-10 w-full px-3 text-base font-bold font-roboto_condensed border border-slate-950 rounded-sm focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;