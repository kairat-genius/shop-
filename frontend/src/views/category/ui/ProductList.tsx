"use client";

import { useRef } from "react";
import { useFiltersNuqs } from "@/shared/hooks/useNuqsFilter";
import ProductCard from "@/entities/product-card";
import Pagination from "@/shared/ui/pagination";
import ActiveFilters from "./filter/ActiveFilters";

export const sortData = [
  { title: "Популярные", slug: "popularity" },
  { title: "Высокая конверсия", slug: "conversion_rate" },
  { title: "Хиты продаж", slug: "units_sold" },
  { title: "Сначала новые", slug: "newest" },
  { title: "Сначала старые", slug: "oldest" },
  { title: "Сначала дешевые", slug: "price_asc" },
  { title: "Сначала дорогие", slug: "price_desc" },
];

const ProductList = () => {
  const { filters, updateFilter } = useFiltersNuqs();
  const listRef = useRef<HTMLDivElement>(null);

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
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
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
