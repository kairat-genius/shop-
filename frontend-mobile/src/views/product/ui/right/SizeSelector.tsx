"use client";
import Icon from "@/shared/icon";
import dynamic from "next/dynamic";
import { useState } from "react";

const SizeSelectorModal = dynamic(() => import("../modal/SizeSelectorModal"), {
  ssr: false,
});

export const sizes = [
  { sizeRu: "34,5", sizeEu: "35,5", price: null, isActive: false },
  { sizeRu: "35", sizeEu: "36", price: null, isActive: false },
  { sizeRu: "35,5", sizeEu: "36,5", price: null, isActive: false },
  { sizeRu: "36,5", sizeEu: "37,5", price: null, isActive: false },
  { sizeRu: "37", sizeEu: "38", price: null, isActive: false },
  { sizeRu: "37,5", sizeEu: "38,5", price: null, isActive: false },
  { sizeRu: "38", sizeEu: "39", price: null, isActive: false },
  { sizeRu: "39", sizeEu: "40", price: null, isActive: false },
  { sizeRu: "39,5", sizeEu: "40,5", price: 10_711, isActive: false },
  { sizeRu: "40", sizeEu: "41", price: 10_344, isActive: true },
  { sizeRu: "41", sizeEu: "42", price: 11_103, isActive: false },
  { sizeRu: "41,5", sizeEu: "42,5", price: 13_118, isActive: false },
  { sizeRu: "42", sizeEu: "43", price: 12_594, isActive: false },
  { sizeRu: "43", sizeEu: "44", price: 12_609, isActive: false },
  { sizeRu: "43,5", sizeEu: "44,5", price: 13_572, isActive: false },
  { sizeRu: "44", sizeEu: "45", price: 11_877, isActive: false },
  { sizeRu: "44,5", sizeEu: "45,5", price: null, isActive: false },
  { sizeRu: "45", sizeEu: "46", price: 13_760, isActive: false },
  { sizeRu: "46", sizeEu: "47", price: null, isActive: false },
  { sizeRu: "46,5", sizeEu: "47,5", price: 15_524, isActive: false },
  { sizeRu: "47", sizeEu: "48", price: null, isActive: false },
  { sizeRu: "47,5", sizeEu: "48,5", price: null, isActive: false },
];

const SizeSelector = () => {
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  return (
    <div className="mt-[2.667vw] mb-[3.2vw]">
      <div className="flex items-center justify-between mb-[2.133vw] px-[3.733vw]">
        <span className="truncate text-[3.2vw] leading-[3.749vw]">Размер</span>
        <div className="flex items-center gap-[.533vw]">
          <img
            className="w-[3.2vw] h-[3.2vw] ml-[.533vw]"
            src="https://cdn-img.thepoizon.ru/node-common/935e5df6-1d97-27c8-3944-f1ad4784f80d.svg"
            alt="showsizeguide"
          />

          <div className="text-[2.933vw] leading-[normal] text-slate-500">
            Гайд размера
          </div>
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </div>
      </div>
      <div className="flex relative px-[3.733vw] overflow-hidden">
        <div className="flex flex-col items-center justify-between gap-[.533vw] pr-[1.067vw] py-[1.6vw] text-[3.733vw] leading-[100%] max-w-[18.667vw] font-medium">
          <div>RU</div>
          <div className="text-slate-500">EU</div>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex pb-px gap-[1.067vw] text-[3.733vw] leading-[4.376vw]">
            {sizes.map((item, index) => (
              <div
                key={index}
                className="relative px-[2.667vw] py-[1.6vw] text-slate-300 max-w-[53.333vw] flex flex-col items-center justify-center last:pr-[10.667vw]"
              >
                <div className="text-slate-300">{item.sizeRu}</div>
                <div className="text-slate-300 mt-[.533vw] font-light">
                  {item.sizeEu}
                </div>
                <div className="scale-50 absolute rounded-[2.133vw] border-dashed border border-slate-300 w-[200%] h-[200%] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
        <div
          className="h-full absolute right-0 top-0 flex items-center"
          onClick={() => setIsSizeModalOpen(true)}
        >
          <div className="h-full w-[3.733vw] bg-linear-to-l from-white to-transparent" />
          <div className="bg-white h-full flex items-center w-[8.533vw]">
            <Icon
              icon="chevron-right"
              className="w-[3.2vw] h-[3.2vw] ml-[1.6vw] text-slate-400"
            />
          </div>
        </div>
      </div>
      <div className="rounded-[1.067vw] flex items-center justify-between mt-[2.133vw] py-[1.067vw] px-[3.2vw] bg-[rgba(245,245,249,.6)] mx-[3.733vw]">
        <div className="text-[3.2vw] leading-[3.749vw]">
          <span className="text-slate-500 mr-[.533vw] font-light">
            Длина стопы:
          </span>
          <span>26 cm</span>
        </div>
        <Icon
          icon="chevron-right"
          className="w-[3.2vw] h-[3.2vw] text-slate-400"
        />
      </div>
      {isSizeModalOpen && (
        <SizeSelectorModal onClose={() => setIsSizeModalOpen(false)} />
      )}
    </div>
  );
};

export default SizeSelector;
