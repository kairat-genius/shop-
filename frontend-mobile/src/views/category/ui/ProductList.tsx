"use client";

import { useMemo, useRef } from "react";
import ProductCard from "@/entities/product-card";
import { cn } from "@/shared/utils/clsx";
import productsData from "@/shared/data/productData.json";
import Filter from "./filter/Filter";
import Icon from "@/shared/icon";

interface ProductListProps {
  category_slug: string;
}

const ProductList = ({ category_slug }: ProductListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => product.category === category_slug);
  }, [category_slug]);

  return (
    <div className="min-h-screen">
      <Filter category_slug={category_slug} />
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2" ref={listRef}>
            {filteredProducts.map((product, index) => {
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
                />
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col pt-[26.667vw]">
            <Icon
              icon="box"
              className="text-slate-100 h-[37.333vw] w-[37.333vw]"
            />
            <div className="text-[3.467vw] leading-4.5">Ой, ничего нет здесь :-(</div>
          </div>
        )}
    </div>
  );
};

export default ProductList;
