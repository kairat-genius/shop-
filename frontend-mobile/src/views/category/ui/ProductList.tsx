"use client";

import { useMemo, useRef } from "react";
import ProductCard from "@/entities/product-card";
import { cn } from "@/shared/utils/clsx";
import productsData from "@/shared/data/productData.json";
import Filter from "./filter/Filter";
import Icon from "@/shared/icon";
import FavoriteButton from "@/features/favorites-button";

interface ProductListProps {
  category_slug: string;
}

const getLastWord = (slug: string): string => {
  const parts = slug.split("-");
  // eslint-disable-next-line unicorn/prefer-at
  return parts[parts.length - 1];
};
const ProductList = ({ category_slug }: ProductListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    const targetWord = getLastWord(category_slug);
    return productsData.filter((product) => {
      const productCategory = product.category || "";
      const productLastWord = getLastWord(productCategory);
      return productLastWord === targetWord;
    });
  }, [category_slug]);

  return (
    <div className="min-h-screen">
      <Filter category_slug={category_slug} />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 pt-px" ref={listRef}>
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
              >
                <FavoriteButton className=" absolute top-[4.8vw] right-[4vw] text-slate-500">
                  <Icon icon="heart" className="w-[4.8vw] h-[4.8vw]" />
                </FavoriteButton>
              </ProductCard>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col pt-[26.667vw]">
          <Icon
            icon="box"
            className="text-slate-100 h-[37.333vw] w-[37.333vw]"
          />
          <div className="text-[3.467vw] leading-[normal]">
            Ой, ничего нет здесь :-(
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
