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
  };
}

const ProductCard = ({ className, children, product }: ProductCardProps) => {
  return (
    <article className={cn("relative", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="flex flex-col"
        target="_blank"
        rel="opener"
      >
        <img
          className="aspect-square h-full w-full"
          src={product.image}
          alt=""
        />
        <div className="pt-2 text-[14px] font-light leading-4 line-clamp-2">
          {product.title}
        </div>
        <div className="mt-4 flex flex-wrap justify-between items-baseline">
          <div className="text-[20px] leading-[1.3] font-bold font-roboto_condensed">
            {product.price}
          </div>
          <span className="text-right text-[12px] font-light text-slate-500">
            {product.sold}
          </span>
        </div>
      </Link>
      {children}
    </article>
  );
};

export default ProductCard;
