"use client";
import { CUT_IMAGE_PARAMS } from "@/shared/settings";
import { cn } from "@/shared/utils/clsx";
import { generateProductSlug } from "@/shared/utils/slug";
import { ProductType } from "@/types/product.type";
import Link from "next/link";
import type { ReactNode } from "react";

interface ProductCardProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  product: ProductType;
}

const ProductCard = ({ children, className, product }: ProductCardProps) => {
  const productUrl = generateProductSlug(product.title || "", product.spuId);

  const imageUrl = product.logoUrl
    ? product.logoUrl.replace("/origin-img/", "/cut-img/") + CUT_IMAGE_PARAMS
    : "";
  return (
    <article
      className={cn("relative border-slate-300 overflow-hidden", className)}
    >
      <Link
        href={`/product/${productUrl}`}
        className="flex flex-col pb-[2.133vw]"
      >
        <div className="relative">
          <div className="h-[46.4vw] w-[46.4vw] mx-auto mt-[-4.267vw]">
            <img
              className="aspect-square h-full w-full"
              src={imageUrl}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="text-[3.2vw] font-light leading-[3.733vw] line-clamp-1 h-[3.733vw] px-[3.733vw] mt-[-2.133vw] z-1">
          {product.title}
        </div>
        <div className="flex flex-wrap justify-between items-baseline px-[3.733vw] mt-[.533vw] h-[5.6vw]">
          <div className="text-[4.267vw] font-bold font-roboto_condensed leading-[1.3]">
            {product.minSpuPrice?.localizedDisplayText || "-- ₽"}
          </div>
          {product.saleTag && (
            <span className="text-right text-[2.667vw] font-light text-slate-500">
              {product.saleTag}
            </span>
          )}
        </div>
      </Link>
      {children}
    </article>
  );
};

export default ProductCard;
