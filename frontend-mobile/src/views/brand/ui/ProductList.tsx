"use client";

import { useRef } from "react";
import ProductCard from "@/entities/product-card";
import { cn } from "@/shared/utils/clsx";
import productsData from "@/shared/data/productData.json";
import Filter from "./filter/Filter";
import Icon from "@/shared/icon";
import FavoriteButton from "@/features/favorites-button";


const ProductList = () => {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <Filter />

      <div className="grid grid-cols-2 pt-px" ref={listRef}>
        {productsData.slice(0, 10).map((product, index) => {
          const isLeft = index % 2 === 0;
          const isFirstRow = index < 2;

          return (
            <ProductCard
              key={product.slug}
              product={product}
              className={cn(
                "border-b",
                isLeft && "border-r",
                isFirstRow && "border-t",
              )}
            >
              <FavoriteButton className=" absolute top-[4.8vw] right-[4vw] text-slate-500">
                <Icon icon="heart" className="w-[4.8vw] h-[4.8vw]" />
              </FavoriteButton>
            </ProductCard>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
