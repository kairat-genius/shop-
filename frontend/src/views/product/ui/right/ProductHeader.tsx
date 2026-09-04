"use client";
import Link from "next/link";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import { useState } from "react";
import dynamic from "next/dynamic";
import { PriceDto } from "@/shared/api/openapi";

const PriceInfoModal = dynamic(() => import("../modal/PriceInfoModal"), {
  ssr: false,
});

interface ProductHeaderProps {
  price: PriceDto;
  rankingModule?: {
    rankingList: [
      {
        icon: string;
        name: string;
        rank: string;
        id: number;
        url: string;
      },
    ];
  };
}

const ProductHeader = ({ price, rankingModule }: ProductHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rankingList = rankingModule?.rankingList ?? [];
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mt-2">
        <div className="flex items-center gap-0.5">
          <div className="text-[24px] font-bold font-roboto_condensed leading-7">
            {price.amountText} {price.symbol}
          </div>
          <Button
            className="text-slate-500"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon icon="circle-question-mark" width={14} height={14} />
          </Button>
        </div>
        <Button className="text-slate-500 text-[12px] font-light leading-3.5">
          U***U недавно купил(а)
          <Icon
            icon="chevron-right"
            width={12}
            height={12}
            className="shrink-0"
          />
        </Button>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {rankingList.map((rankInfo) => (
          <Link
            key={rankInfo.id}
            className="px-1 py-0.5 flex items-center rounded-xs text-[12px] leading-[1.2] border border-slate-200 text-slate-500"
            href={rankInfo.url || "#"}
            target="_blank"
          >
            {rankInfo.icon && (
              <img
                className="aspect-square mr-0.5"
                width={14}
                height={14}
                src={rankInfo.icon}
                alt={rankInfo.name || "ranking"}
              />
            )}
            {rankInfo.rank && (
              <div className="font-roboto_condensed font-semibold opacity-[.7] mr-0.5">
                {rankInfo.rank}
              </div>
            )}
            {rankInfo.name && <div className="font-light">{rankInfo.name}</div>}
            <Icon icon="chevron-right" width={12} height={12} />
          </Link>
        ))}
      </div>
      <Link
        href="/about-us"
        className="flex items-center relative overflow-hidden h-10.25 px-3.5 py-2 mt-3 rounded-sm"
        style={{
          background:
            "linear-gradient(180deg, #fff, hsla(0, 0%, 100%, 0)), rgba(0, 219, 219, .1)",
        }}
      >
        <img
          className="pS"
          src="https://cdn-img.thepoizon.ru/node-common/6497afdb-3c52-716a-fb70-034489baa14d-75-66.png?x-oss-process=image/resize,s_96/format,webp"
          alt="100% authenticated"
          width={25}
          height={25}
        />
        <Icon
          icon="separator"
          width={1}
          height={10}
          className="shrink-0 mx-2"
        />
        <div className="font-roboto_condensed text-[14px] font-medium leading-[1.2]">
          Разнообразные категории
        </div>
        <Icon
          icon="chevron-right"
          width={12}
          height={12}
          className="shrink-0 ml-auto text-slate-500"
        />
        <img
          className="object-contain absolute top-2 right-6.5 w-12.75 h-11.25"
          src="https://cdn-img.thepoizon.ru/node-common/85e7e421-3782-1936-a2f4-d734bd1d7b88-153-96.png?x-oss-process=image/resize,s_96/format,webp"
          alt="100% authenticated"
          width={51}
          height={45}
        />
      </Link>
      {isModalOpen && <PriceInfoModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ProductHeader;
