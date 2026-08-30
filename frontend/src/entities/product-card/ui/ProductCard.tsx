"use client";
import type { ProductResponseV2Dto } from "@/shared/api/openapi";
import { cn } from "@/shared/utils/clsx";
import { generateProductSlug } from "@/shared/utils/slug";
import Link from "next/link";
import type { ReactNode } from "react";

interface ProductCardProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  product: ProductResponseV2Dto;
}

const ProductCard = ({ className, children, product }: ProductCardProps) => {
  const productUrl = generateProductSlug(product.title || "", product.id);
  return (
    <article className={cn("relative", className)}>
      <Link
        href={`/product/${productUrl}`}
        className="flex flex-col"
        target="_blank"
        rel="opener"
      >
        <img
          className="aspect-square h-full w-full object-contain"
          src={product.logoUrl}
          alt=""
        />
        <div className="pt-2 text-[14px] font-light leading-4 line-clamp-2">
          {product.title}
        </div>
        <div className="mt-4 flex flex-wrap justify-between items-baseline">
          <div className="text-[20px] leading-[1.3] font-bold font-roboto_condensed">
            {product.minPrice || "--"} ₽
          </div>
          {product.soldCount > 0 && (
            <span className="text-right text-[12px] font-light text-slate-500">
              Продано {product.soldCount}
            </span>
          )}
        </div>
      </Link>
      {children}
    </article>
  );
};

export default ProductCard;
