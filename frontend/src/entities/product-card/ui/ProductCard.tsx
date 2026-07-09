"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ProductType } from "../types/product-card.type";
import { cn } from "@/shared/utils/clsx";
import { getImageUrl } from "@/shared/utils/getImageUrl";

interface ProductCardProps {
  children?: ReactNode;
  onClick?: () => void;
}

const ProductCard = ({ children }: ProductCardProps) => {
  return (
    <article className="relative">
      <Link
        href="/product/new-balance-530-white-natural-indigo-sneakers-8900001978861819"
        className="flex flex-col"
        target="_blank"
        rel="opener"
      >
        <img
          className="aspect-square h-full w-full"
          src="https://cdn-img.thepoizon.ru/pro-img/cut-img/20240726/1eed0defcabe44b989217ec6ef6a8431.jpg?x-oss-process=image/resize,s_540/format,webp"
          alt=""
        />
        <div className="pt-2 text-sm font-light leading-4 line-clamp-2">
          New Balance NB 530 Сетчатая ткань Текстиль Низкий топ Повседневные
          Городские Коммутатор Беговые кроссовки Унисекс
        </div>
        <div className="mt-4 flex flex-wrap justify-between items-baseline">
          <div className="text-xl leading-[1.3] font-bold font-roboto_condensed">7&nbsp;021&nbsp;₽</div>
          <span className="text-right text-xs font-light text-slate-500">Продано 819&nbsp;тыс.</span>
        </div>
      </Link>
      {children}
    </article>
  );
};

export default ProductCard;
