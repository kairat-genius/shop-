import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";

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

const ModelVariants = () => (
  <div className="">
    <div className="flex items-center justify-between mb-3">
      <div className="font-roboto_condensed font-bold text-[16px] leading-4">
        Модель Hyperdunk 2017 ({variants.length} товаров)
      </div>
      <button>
        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="text-slate-500"
        />
      </button>
    </div>
    <div className="grid grid-cols-6">
      {variants.map((item) => (
        <Button
          key={item.alt}
          className={cn(
            "border shrink-0",
            item.is_current
              ? "border-slate-950"
              : "border-[rgba(20,21,26,0.03)]",
          )}
        >
          <img className="aspect-square" src={item.image} alt={item.alt} />
        </Button>
      ))}
    </div>
  </div>
);

export default ModelVariants;
