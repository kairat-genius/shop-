"use client";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const AboutProductModal = dynamic(() => import("../modal/AboutProductModal"), {
  ssr: false,
});

const features = [
  { label: "Высота голенища", value: "Низкий топ" },
  { label: "Тип застежки", value: "Шнуровка" },
  { label: "Основной цвет", value: "Розовый" },
  { label: "Расцветка", value: "Розовый" },
  { label: "Дополнительный цвет", value: "Черный" },
  { label: "Основной артикул", value: "IM3368-606" },
];

const AboutProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-10">
        <h2 className="text-[24px] leading-7 font-bold font-roboto_condensed">
          О ТОВАРЕ
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-[14px] leading-4.5">
          {features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center gap-6">
              <span className="w-42.5 font-light">{feature.label}</span>
              <span>{feature.value}</span>
            </li>
          ))}
        </ul>
        <Button
          className="mt-3 underline text-slate-500 text-[14px] leading-[1.2]"
          onClick={() => setIsModalOpen(true)}
        >
          Показать больше
        </Button>
      </div>
      <Link
        href="/brand/nike?pinSpuIds=8900150153356263"
        target="_blank"
        style={{ backgroundColor: "hsla(0, 0%, 97%, .6)" }}
        className="flex items-center h-14 gap-2 mt-3 p-2 rounded-sm"
      >
        <img
          className="pA"
          src="https://cdn-img.thepoizon.ru/pro-img/brand-logo/cut-img/20250221/ad39ee3e88e14ff39cd09c5093887d8c.jpg?x-oss-process=image/resize,s_96/format,webp"
          alt="brand-logo"
          height={40}
          width={40}
        />

        <div className="flex items-center">
          <div className="text-[16px] leading-[18.75px] font-medium truncate">
            Nike
          </div>
          <div className="bg-slate-300 w-[0.5px] h-2.5 mx-3.5" />
          <div className="text-[14px] font-light leading-4.5">
            484&nbsp;тыс. товаров
          </div>
        </div>
      </Link>
      <div
        className="mt-3 p-2 text-[12px] leading-[100%] flex gap-3 rounded-sm"
        style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
      >
        <div className="font-light">Модель</div>
        <Link
          href="/trends/hyperdunk-2017?pinSpuIds=8900150153356263"
          className="flex"
        >
          Hyperdunk 2017
          <Icon
            icon="chevron-right"
            width={12}
            height={12}
            className="shrink-0 text-slate-500"
          />
        </Link>
      </div>
      {isModalOpen && (
        <AboutProductModal
          onClose={() => setIsModalOpen(false)}
          features={features}
        />
      )}
    </>
  );
};

export default AboutProduct;
