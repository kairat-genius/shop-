"use client";
import { useState } from "react";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { Button } from "@/shared/ui/action";

const CategoryDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <section className="container px-5 mt-[21.440px]">
      <h2 className="text-[32px] leading-9.5 font-bold font-roboto_condensed">
        Баскетбол
      </h2>

      <div className="mt-[21.440px] mb-4 flex flex-col">
        {/* Обрезаемый текст */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-full" : "max-h-8"
          )}
        >
          <p className="text-xs leading-4 font-light tracking-[.5px]">
            Ознакомьтесь с широким выбором дизайнерской обуви и кроссовок, включая
            популярную обувь люксовых брендов, таких как Air Jordan, adidas, Nike,
            GUCCI, PRADA, Balenciaga, Alexander McQueen и многих других — все
            подлинные, по лучшей цене и в наличии, благодаря POIZON. Покупайте
            сейчас, чтобы найти свою модную, дизайнерскую и люксовую обувь!
          </p>
        </div>

        {/* Кнопка всегда под текстом */}
        <Button
          onClick={toggle}
          className="self-end flex items-center gap-0.5 text-xs leading-4 text-slate-500 tracking-[.4px] mt-1"
        >
          {isExpanded ? "Меньше" : "Больше"}
          <Icon
            icon="chevron-down"
            width={12}
            height={12}
            className={cn(
              "transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        </Button>
      </div>
    </section>
  );
};

export default CategoryDescription;