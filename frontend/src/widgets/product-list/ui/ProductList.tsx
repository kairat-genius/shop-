"use client";
import FilterAside from "./FilterAside";
import { useProductList } from "../model/useProductList";
import { useRef } from "react";
import ActiveFilters from "./filter/ActiveFilters";
import ProductCard, { ProductCardSkeleton } from "@/entities/product-card";
import FavoriteButton from "@/features/favorites-button";
import Icon from "@/shared/icon";
import Pagination from "@/shared/ui/pagination";
import type {
  CategoryFiltersResponseDto,
  SearchResponseDto,
} from "@/shared/api/openapi";

interface ProductListProps {
  initialData: SearchResponseDto;
  categoryId: string;
  filtersData: CategoryFiltersResponseDto;
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
    showSkeleton,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
  } = useProductList(initialData, categoryId);

  const searchSpuList = productData.searchSpuList;
  const productItems = searchSpuList.spuList ?? [];
  const hasProducts = productItems.length > 0;

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
          {showSkeleton
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : productItems.map((item, index) => (
                <ProductCard key={index} product={item}>
                  <FavoriteButton className="absolute top-4 right-2 text-slate-500">
                    <Icon icon="heart" className="w-[1.2rem] h-[1.2rem]" />
                  </FavoriteButton>
                </ProductCard>
              ))}

          {!isLoading && !showSkeleton && !hasProducts && (
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
          total={Math.max(1, Math.ceil(searchSpuList.total))}
          onChange={handlePageChange}
          className="mt-19.5"
        />
      </div>
    </div>
  );
};

export default ProductList;
