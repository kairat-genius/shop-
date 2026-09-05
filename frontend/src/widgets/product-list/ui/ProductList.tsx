"use client";
import FilterAside from "./FilterAside";
import { useProductList } from "../model/useProductList";
import { useRef } from "react";
import ActiveFilters from "./filter/ActiveFilters";
import ProductCard from "@/entities/product-card";
import FavoriteButton from "@/features/favorites-button";
import Icon from "@/shared/icon";
import Pagination from "@/shared/ui/pagination";

import type { CategoryFiltersResponseType } from "@/types/category-filters.type";
import type { ProductListCategoryResponseType } from "@/types/product-list-category.type";

interface ProductListProps {
  initialData: ProductListCategoryResponseType;
  categoryId: string;
  filtersData: CategoryFiltersResponseType;
}

const ProductList = ({
  initialData,
  categoryId,
  filtersData,
}: ProductListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const {
    productData,
    isLoading,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  } = useProductList(initialData, categoryId);

  const searchSpuList = productData.searchSpuList;
  const productItems = searchSpuList.spuList ?? [];

  const pageSize = 60;
  const totalPages = Math.ceil(searchSpuList.total / pageSize);

  const handlePageChange = (value: number) => {
    updateFilter("page", value);

    if (listRef.current) {
      const elementTop =
        listRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementTop - 300;

      window.scrollTo({
        top: scrollPosition,
        behavior: "instant",
      });
    }
  };

  return (
    <div className="container mt-7.5 grid grid-cols-[220px_1fr] gap-[3.2rem]">
      <FilterAside
        filters={filters}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        filtersData={filtersData}
        categoryId={categoryId}
      />
      <div ref={listRef}>
        <ActiveFilters
          filters={filters}
          updateFilter={updateFilter}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          filtersData={filtersData}
        />
        <div className="grid grid-cols-5 gap-x-[.8rem] gap-y-8">
          {isLoading ? (
            <div className="col-span-full flex min-h-80 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />
            </div>
          ) : (productItems.length > 0 ? (
            productItems.map((item, index) => (
              <ProductCard key={index} product={item}>
                <FavoriteButton className="absolute right-2 top-4 text-slate-500">
                  <Icon icon="heart" className="h-[1.2rem] w-[1.2rem]" />
                </FavoriteButton>
              </ProductCard>
            ))
          ) : (
            <div className="col-span-full mt-5">
              <div className="text-[24px] font-bold leading-7 font-roboto_condensed ">
                Просмотр: {productData.searchSpuList.total} результатов
              </div>
              <div className="mt-2 text-[16px] leading-4.75">
                Извините. Результатов не найдены.
              </div>
            </div>
          ))}
        </div>
        {productItems.length > 0 && totalPages > 1 && (
          <Pagination
            page={filters.page}
            total={totalPages}
            onChange={handlePageChange}
            className="mt-19.5"
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
