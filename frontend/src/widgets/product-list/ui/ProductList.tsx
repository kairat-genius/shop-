"use client";
import { ProductsResponseV2WithPaginationDto } from "@/shared/api/openapi";
import FilterAside from "./FilterAside";
import { useProductList } from "../model/useProductList";
import { useRef } from "react";
import ActiveFilters from "./filter/ActiveFilters";
import ProductCard, { ProductCardSkeleton } from "@/entities/product-card";
import FavoriteButton from "@/features/favorites-button";
import Icon from "@/shared/icon";
import Pagination from "@/shared/ui/pagination";

interface ProductListProps {
  category_id: number;
  initialData: ProductsResponseV2WithPaginationDto;
  initialTotalCount?: number;
}

const ProductList = ({
  category_id,
  initialData,
  initialTotalCount = initialData.data.length,
}: ProductListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const {
    productData: { meta, data },
    totalCount,
    isLoading,
    showSkeleton,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  } = useProductList(category_id, initialData, initialTotalCount);

  const handlePageChange = (value: number) => {
    updateFilter("page", value);
    updateFilter("cursor", value === 1 ? null : (meta.cursor ?? null));

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
    <div className="container mt-7.5 grid grid-cols-[220px_1fr] gap-[3.2rem]">
      <FilterAside
        filters={filters}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
      />
      <div ref={listRef}>
        <ActiveFilters
          filters={filters}
          updateFilter={updateFilter}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
        />
        <div className="grid grid-cols-5 gap-x-[.8rem] gap-y-8">
          {showSkeleton
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : data.map((item, index) => (
                <ProductCard key={index} product={item}>
                  <FavoriteButton className="absolute top-4 right-2 text-slate-500">
                    <Icon icon="heart" className="w-[1.2rem] h-[1.2rem]" />
                  </FavoriteButton>
                </ProductCard>
              ))}

          {!isLoading && data.length === 0 && !showSkeleton && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-medium">Товары не найдены</p>
              <p className="mt-2 text-sm text-gray-500">
                Попробуйте изменить фильтры или выбрать другое устройство
              </p>
            </div>
          )}
        </div>
        <Pagination
          page={filters.page}
          total={Math.max(1, Math.ceil(totalCount / (meta.limit || 65)))}
          onChange={handlePageChange}
          className="mt-19.5"
        />
      </div>
    </div>
  );
};

export default ProductList;
