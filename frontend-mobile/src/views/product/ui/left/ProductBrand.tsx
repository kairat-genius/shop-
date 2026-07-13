"use client";
import Icon from "@/shared/icon";
import Link from "next/link";

const ProductBrand = () => {
  return (
    <>
      <div className="px-[3.733vw]">
        <Link
          href="/brand/nike?pinSpuIds=8900150153356263"
          target="_blank"
          className="grid grid-cols-[10.667vw_1fr] items-center gap-[2.133vw] pl-[3.2vw] py-[3.2vw]"
        >
          <img
            className="rounded-full w-[8.533vw] h-[8.533vw] border border-slate-100"
            src="https://cdn-img.thepoizon.ru/pro-img/brand-logo/cut-img/20250221/ad39ee3e88e14ff39cd09c5093887d8c.jpg?x-oss-process=image/resize,s_96/format,webp"
            alt="brand-logo"
          />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[1.067vw]">
              <div className="text-[3.733vw] leading-[4.267vw] font-medium truncate">
                Nike
              </div>
              <div className="text-[3.2vw] font-light leading-[3.733vw] truncate">
                484&nbsp;тыс. товаров
              </div>
            </div>
            <Icon
              icon="chevron-right"
              className="text-slate-400 w-[3.2vw] h-[3.2vw]"
            />
          </div>
        </Link>
      </div>
      <div className="w-full h-[2.133vw] bg-slate-100" />

      <div className="my-[3.2vw] flex flex-col px-[3.733vw] text-[3.2vw] leading-[3.733vw]">
        <div className="flex items-center">
          <div className="font-light w-[18.133vw]">Модель</div>
          <Link
            href="/trends/hyperdunk-2017?pinSpuIds=8900150153356263"
            className="flex items-center"
          >
            Hyperdunk 2017
            <Icon
              icon="chevron-right"
              className="text-slate-400 w-[3.2vw] h-[3.2vw]"
            />
          </Link>
        </div>

        <div className="mt-[1.6vw] flex items-center text-[3.2vw] leading-[3.733vw]">
          <div className="font-light w-[18.133vw]">Каталог</div>
          <div>
            <Link className="underline" href="/" title="POIZON">
              Главная
            </Link>
            <span className="mx-[.8vw] px-px text-slate-500">/</span>
            <Link className="underline" href="/category/sneakers">
              Кроссовки
            </Link>
            <span className="mx-[.8vw] px-px text-slate-500">/</span>
            <Link className="underline" href="/brand/new-balance">
              New Balance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBrand;
