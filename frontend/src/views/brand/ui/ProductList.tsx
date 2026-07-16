"use client";

import { useMemo, useRef } from "react";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import ProductCard from "@/entities/product-card";
import Pagination from "@/shared/ui/pagination";
import ActiveFilters from "./filter/ActiveFilters";
import productsData from "@/shared/data/productData.json";
import Icon from "@/shared/icon";
import FavoriteButton from "@/features/favorites-button";

export const sortData = [
  { title: "Популярные", slug: "popularity" },
  { title: "Высокая конверсия", slug: "conversion_rate" },
  { title: "Хиты продаж", slug: "units_sold" },
  { title: "Сначала новые", slug: "newest" },
  { title: "Сначала старые", slug: "oldest" },
  { title: "Сначала дешевые", slug: "price_asc" },
  { title: "Сначала дорогие", slug: "price_desc" },
];

interface ProductListProps {
  category_slug: string;
}

const getLastWord = (slug: string): string => {
  const parts = slug.split("-");
  // eslint-disable-next-line unicorn/prefer-at
  return parts[parts.length - 1];
};

const ProductList = ({ category_slug }: ProductListProps) => {
  const { filters, updateFilter } = useFiltersNuqs();
  const listRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    const targetWord = getLastWord(category_slug);
    return productsData.filter((product) => {
      const productCategory = product.category || "";
      const productLastWord = getLastWord(productCategory);
      return productLastWord === targetWord;
    });
  }, [category_slug]);

  const handlePageChange = (value: number) => {
    updateFilter("page", value);

    if (listRef.current) {
      const elementTop =
        listRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementTop - 300;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={listRef}>
      <ActiveFilters />
      <div className="grid grid-cols-5 gap-x-[.8rem] gap-y-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product}>
            <FavoriteButton className="absolute top-4 right-2 text-slate-500">
              <Icon icon="heart" className="w-[1.2rem] h-[1.2rem]" />
            </FavoriteButton>
          </ProductCard>
        ))}
      </div>
      <Pagination
        page={filters.page}
        total={20}
        onChange={handlePageChange}
        className="mt-19.5"
      />
    </div>
  );
};

export default ProductList;
