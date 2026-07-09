"use client";
import { cn } from "@/shared/utils/clsx";
import Link from "next/link";
import type { ReactNode } from "react";

interface ProductCardProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  product: {
    title: string;
    slug: string;
    image: string;
    category: string;
    price: string;
    sold: string;
  }
}

const ProductCard = ({ children, className, product }: ProductCardProps) => {
  return (
    <article className={cn("relative border-slate-300 overflow-hidden", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="flex flex-col pb-[2.133vw]"
        target="_blank"
        rel="opener"
      >
        <div className="relative">
          <div className="h-[46.4vw] w-[46.4vw] mx-auto mt-[-4.267vw]">
            <img
              className="aspect-square h-full w-full"
              src={product.image}
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
            {product.price}
          </div>
          <span className="text-right text-[2.667vw] font-light text-slate-500">
           {product.sold}
          </span>
        </div>
      </Link>
      {children}
    </article>
  );
};

export default ProductCard;
