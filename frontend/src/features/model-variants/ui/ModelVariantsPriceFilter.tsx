"use client";

import { useEffect, useState } from "react";

interface ModelVariantsPriceFilterProps {
  min: number;
  max: number;
  priceMin: number | null;
  priceMax: number | null;
  onChange: (min: number, max: number) => void;
  step?: number;
}

const formatNumber = (value: number) =>
  value === 0 ? "" : value.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, " ");

const parseInput = (value: string) => {
  const cleanedValue = value.replaceAll(/\s/g, "");

  if (cleanedValue === "") {
    return null;
  }

  const parsedValue = Number.parseInt(cleanedValue, 10);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const ModelVariantsPriceFilter = ({
  min,
  max,
  priceMin,
  priceMax,
  onChange,
  step = 1,
}: ModelVariantsPriceFilterProps) => {
  const [inputMin, setInputMin] = useState(
    priceMin === null || priceMin === min ? "" : formatNumber(priceMin),
  );
  const [inputMax, setInputMax] = useState(
    priceMax === null || priceMax === max ? "" : formatNumber(priceMax),
  );

  useEffect(() => {
    setInputMin(
      priceMin === null || priceMin === min ? "" : formatNumber(priceMin),
    );
    setInputMax(
      priceMax === null || priceMax === max ? "" : formatNumber(priceMax),
    );
  }, [min, max, priceMin, priceMax]);

  const commitInput = (type: "min" | "max") => {
    const parsedValue = parseInput(type === "min" ? inputMin : inputMax);
    const currentMin = priceMin ?? min;
    const currentMax = priceMax ?? max;
    const value =
      parsedValue === null ? (type === "min" ? min : max) : parsedValue;
    const boundedValue = Math.max(min, Math.min(value, max));

    let nextMin = currentMin;
    let nextMax = currentMax;

    if (type === "min") {
      nextMin = Math.min(boundedValue, currentMax - step);
      nextMin = Math.max(min, nextMin);
    } else {
      nextMax = Math.max(boundedValue, currentMin + step);
      nextMax = Math.min(max, nextMax);
    }

    setInputMin(nextMin === min ? "" : formatNumber(nextMin));
    setInputMax(nextMax === max ? "" : formatNumber(nextMax));
    onChange(nextMin, nextMax);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={inputMin}
        onChange={(event) => setInputMin(event.target.value)}
        onBlur={() => commitInput("min")}
        onKeyDown={(event) => event.key === "Enter" && commitInput("min")}
        placeholder="Низкая,₽"
        className="h-10 max-w-38.75 w-full px-3 text-[16px] font-bold font-roboto_condensed border border-[#C7C7D7] rounded-sm focus:outline-none focus:border-slate-500"
      />
      <span className="text-gray-400">–</span>
      <input
        type="text"
        value={inputMax}
        onChange={(event) => setInputMax(event.target.value)}
        onBlur={() => commitInput("max")}
        onKeyDown={(event) => event.key === "Enter" && commitInput("max")}
        placeholder="Высокая,₽"
        className="h-10 max-w-38.75 w-full px-3 text-[16px] font-bold font-roboto_condensed border border-[#C7C7D7] rounded-sm focus:outline-none focus:border-slate-500"
      />
    </div>
  );
};

export default ModelVariantsPriceFilter;
