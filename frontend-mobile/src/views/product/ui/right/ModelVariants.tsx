"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { useState } from "react";
import dynamic from "next/dynamic";

const ModelVariantsModal = dynamic(
  () => import("../modal/ModelVariantsModal"),
  {
    ssr: false,
  },
);

const variants = [
  {
    alt: "8900150153356263",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/6ae3281d208b42d98935cc5ae330a259.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: true,
  },
  {
    alt: "8900178265317364",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/d7d0c277bb8b4538981618c98998ef58.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900292617461045",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20260409/239c16774de940c1932316bdcf8943fd.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900104117152272",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251207/79f2caf2a3fb444ab7190ef33933ab1b.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900001201993382",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20230526/e851b4fdd56b4d8288fee4a003350784.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900055298534047",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251207/073aa60d196043baac9ea9c0c9ff7963.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900008243448813",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251207/2a1a988ef4c04cbe870308716159afe3.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900080020840490",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/a4ab5a80505e4fe79056e6dd9e095772.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900000140845691",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/aee305b0bebe4b268ee0d186cf08068c.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900001236783142",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251207/48bf5f2e9dc64de88479adb99a8d2c3f.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900123145288280",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/3ee60dd90b6045e3acacb3f3540b6744.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
  {
    alt: "8900017567472471",
    image:
      "https://cdn-img.thepoizon.ru/pro-img/cut-img/20230526/2ad42770fc55470c8b803944c5410a58.jpg?x-oss-process=image/resize,s_96/format,webp",
    is_current: false,
  },
];

const ModelVariants = () => {
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  return (
    <div className="flex">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-[1.067vw] max-w-[84vw]">
          {variants.map((item) => (
            <Button
              key={item.alt}
              className={cn(
                "border rounded-[2.133vw] shrink-0 first:ml-[3.733vw] overflow-hidden",
                item.is_current
                  ? "border-slate-950"
                  : "border-[rgba(199,199,215,.5)]",
              )}
            >
              <img
                className="aspect-square w-[11.733vw] h-[11.733vw]"
                src={item.image}
                alt={item.alt}
              />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex pr-[3.733vw]">
        <div className="w-[3.733vw] h-full bg-linear-to-l from-white to-transparent" />
        <Button
          className="bg-white ml-[1.6vw] text-slate-500"
          onClick={() => setIsModelModalOpen(true)}
        >
          <div className="text-[3.2vw] leading-[3.749vw]">+75</div>
          <Icon
            icon="chevron-right"
            className="w-[3.2vw] h-[3.2vw] text-slate-400"
          />
        </Button>
      </div>

      {isModelModalOpen && (
        <ModelVariantsModal onClose={() => setIsModelModalOpen(false)} variants={variants} />
      )}
    </div>
  );
};

export default ModelVariants;
