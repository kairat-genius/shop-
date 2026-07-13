"use client";
import Icon from "@/shared/icon";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const AboutProductModal = dynamic(() => import("../modal/AboutProductModal"), {
  ssr: false,
});

const featureGroups = [
  {
    title: "Цветовая гамма",
    items: [
      { label: "Основной цвет", value: "Розовый" },
      { label: "Расцветка", value: "Розовый" },
    ],
  },
  {
    title: "Дополнительные",
    items: [
      { label: "Высота голенища", value: "Низкий топ" },
      { label: "Тип застежки", value: "Шнуровка" },
      { label: "Дополнительный цвет", value: "Черный" },
      { label: "Основной артикул", value: "IM3368-606" },
    ],
  },
];

const AboutProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const flatFeatures = useMemo(
    () => featureGroups.flatMap((group) => group.items),
    [],
  );

  return (
    <>
      <section
        className="mb-[3.2vw] pt-[2.667vw] px-[3.733vw] flex justify-between items-start"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="bg-white">
          <Icon icon="clipboard-list" width={16} height={16} />
        </div>
        <div className="overflow-x-auto scrollbar-none h-[8vw]">
          <ul className="flex w-fit items-center">
            {flatFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex flex-col justify-center gap-[1.067vw] px-[1.6vw] min-w-[14.133vw] max-w-[28.8vw] truncate leading-[normal]"
              >
                <span className="h-[4vw] text-[3.2vw]">{feature.value}</span>
                <span className="h-[4vw] text-[2.933vw] font-light text-slate-500">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[8vw] h-[8vw] bg-white flex justify-end">
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </div>
      </section>
      {isModalOpen && (
        <AboutProductModal
          onClose={() => setIsModalOpen(false)}
          featureGroups={featureGroups}
        />
      )}
    </>
  );
};

export default AboutProduct;
