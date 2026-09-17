"use client";

import { useRef, useState } from "react";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";

import { ModelVariantsFilter, FilterType } from "./ModelVariantsFilter";
import { useModelVariantsProducts } from "../model/useModelVariantsProducts";

interface ModelVariantsModalProps {
  onClose: () => void;
  categoryId: number;
  dialogTitle: string;
  selectProduct: (productId: number) => Promise<void>;
}

const ModelVariantsModal = ({
  onClose,
  categoryId,
  dialogTitle,
  selectProduct,
}: ModelVariantsModalProps) => {
  // Активный фильтр (развертка одного фильтра или полная панель)
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  // Состояние фильтров и сортировки
  const [filters, setFilters] = useState<{
    sizes: string[];
    fitIds: number[];
    priceMin?: number;
    priceMax?: number;
    colors: string[];
    sortType: number;
    sortMode: string;
  }>({
    sizes: [],
    fitIds: [],
    priceMin: undefined,
    priceMax: undefined,
    colors: [],
    sortType: 1, // По умолчанию "Топ продаж"
    sortMode: "DESC",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { products, facets, isLoading, handleScroll } =
    useModelVariantsProducts(categoryId, filters);

  // Переключение сортировки по табам
  const handleSortChange = (sortType: number, defaultMode = "DESC") => {
    setFilters((prev) => {
      let newMode = defaultMode;
      // Тобгл направления цены при повторном клике
      if (sortType === 4 && prev.sortType === 4) {
        newMode = prev.sortMode === "ASC" ? "DESC" : "ASC";
      }
      return {
        ...prev,
        sortType,
        sortMode: newMode,
      };
    });
  };

  const handleUpdateFilters = (updated: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      sizes: [],
      fitIds: [],
      priceMin: undefined,
      priceMax: undefined,
      colors: [],
    }));
  };

  const toggleFilterDropdown = (type: FilterType) => {
    setActiveFilter((prev) => (prev === type ? null : type));
  };

  const handleProductSelect = async (productId: number) => {
    await selectProduct(productId);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      className="bg-white max-w-162 rounded-sm overflow-hidden"
    >
      <div
        style={{
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Шапка модалки */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6 leading-5.75 tracking-[-.5px] font-bold font-roboto_condensed text-[20px]">
          <div className="flex items-center">
            <img
              className="w-4 h-4 mr-1 object-contain"
              src="https://cdn-img.thepoizon.ru/node-common/cec37c74-b241-e24e-3c97-0efcf0e471c9-250-250.png?x-oss-process=image/resize,s_96/format,webp"
              alt=""
            />
            <span className="mr-3.5 leading-5">{dialogTitle}</span>
          </div>
          <Button onClick={onClose}>
            <Icon icon="x" width={24} height={24} />
          </Button>
        </div>

        {/* Основной скролл-контейнер */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="max-h-[70vh] h-[70vh] overflow-y-auto relative"
        >
          <div className="bg-white w-full sticky top-0 z-20">
            {/* Сортировки */}
            <div className="flex items-center justify-between px-6">
              <div className="py-3 flex items-center gap-8 border-b border-slate-100 leading-[14.06px] text-[14px]">
                {/* Рекомендуемые (sortType: 0) */}
                <button
                  type="button"
                  onClick={() => handleSortChange(0, "DESC")}
                  className={`h-4 cursor-pointer ${
                    filters.sortType === 0
                      ? "text-slate-950 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  Рекомендуемые
                </button>

                {/* Топ продаж (sortType: 1) */}
                <button
                  type="button"
                  onClick={() => handleSortChange(1, "DESC")}
                  className={`h-4 cursor-pointer ${
                    filters.sortType === 1
                      ? "text-slate-950 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  Топ продаж
                </button>

                {/* Цена (sortType: 4) */}
                <button
                  type="button"
                  onClick={() => handleSortChange(4, "ASC")}
                  className={`h-4 flex items-center cursor-pointer ${
                    filters.sortType === 4
                      ? "text-slate-950 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  <span>Цена</span>
                  <div className="ml-0.5 w-3.5 h-3.5 flex flex-col gap-1 items-center justify-center">
                    <svg
                      width="7"
                      height="3"
                      viewBox="0 0 7 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.33325 2.56136C6.33325 2.45703 6.28894 2.35814 6.2124 2.29164L3.66712 0.0803326C3.60736 0.0284089 3.53222 -1.15982e-07 3.45465 -1.12591e-07L3.21247 -1.02005e-07C3.1349 -9.86142e-08 3.05976 0.0284089 3 0.0803327L0.454108 2.29217C0.377563 2.35867 0.333252 2.45756 0.333252 2.56189L0.333252 2.92986C0.333252 2.9891 0.398947 3.02156 0.442411 2.9838L3.33356 0.472003L6.22409 2.98327C6.26756 3.02103 6.33325 2.98856 6.33325 2.92932L6.33325 2.56136Z"
                        fill={
                          filters.sortType === 4 && filters.sortMode === "ASC"
                            ? "#000"
                            : "#7F7F8E"
                        }
                      />
                    </svg>
                    <svg
                      width="7"
                      height="3"
                      viewBox="0 0 7 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.33325 0.438643C6.33325 0.542971 6.28894 0.641862 6.2124 0.708363L3.66712 2.91967C3.60736 2.97159 3.53222 3 3.45465 3L3.21247 3C3.1349 3 3.05976 2.97159 3 2.91967L0.454108 0.707829C0.377563 0.641327 0.333252 0.542437 0.333252 0.438108L0.333252 0.0701438C0.333252 0.0109037 0.398947 -0.0215614 0.442411 0.0161996L3.33356 2.528L6.22409 0.0167346C6.26756 -0.0210265 6.33325 0.0114386 6.33325 0.0706787L6.33325 0.438643Z"
                        fill={
                          filters.sortType === 4 && filters.sortMode === "DESC"
                            ? "#000"
                            : "#7F7F8E"
                        }
                      />
                    </svg>
                  </div>
                </button>

                {/* Новые (sortType: 3) */}
                <button
                  type="button"
                  onClick={() => handleSortChange(3, "DESC")}
                  className={`h-4 cursor-pointer ${
                    filters.sortType === 3
                      ? "text-slate-950 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  Новые
                </button>
              </div>

              {/* Кнопка открыть боковые фильтры ("all") */}
              <Button
                onClick={() => toggleFilterDropdown("all")}
                className="relative pl-3.5"
              >
                <div className="h-4 w-px bg-slate-300 -left-3 absolute" />
                <Icon
                  icon="filter"
                  width={16}
                  height={16}
                  className="text-[#14151A]"
                />
              </Button>
            </div>

            {/* Быстрые фильтры (Табы) */}
            <div className="flex border-b border-slate-100 py-3 relative">
              <div className="flex items-center gap-3 text-[14px] leading-[14.06px] px-6">
                {/* Размер */}
                <button
                  type="button"
                  onClick={() => toggleFilterDropdown("size")}
                  className="bg-slate-150 cursor-pointer rounded-sm gap-px flex items-center px-2.5 py-2 text-slate-500"
                >
                  Размер{" "}
                  {filters.sizes.length > 0 && `(${filters.sizes.length})`}
                  <Icon
                    icon="chevron-down"
                    width={12}
                    height={12}
                    calcMode={`text-[#7F7F8E] transition-transform duration-200 ${
                      activeFilter === "size" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Пол */}
                <button
                  type="button"
                  onClick={() => toggleFilterDropdown("gender")}
                  className="bg-slate-150 cursor-pointer rounded-sm gap-px flex items-center px-2.5 py-2 text-slate-500"
                >
                  Пол{" "}
                  {filters.fitIds.length > 0 && `(${filters.fitIds.length})`}
                  <Icon
                    icon="chevron-down"
                    width={12}
                    height={12}
                    calcMode={`text-[#7F7F8E] transition-transform duration-200 ${
                      activeFilter === "gender" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Цена */}
                <button
                  type="button"
                  onClick={() => toggleFilterDropdown("price")}
                  className="bg-slate-150 cursor-pointer rounded-sm gap-px flex items-center px-2.5 py-2 text-slate-500"
                >
                  Цена
                  <Icon
                    icon="chevron-down"
                    width={12}
                    height={12}
                    calcMode={`text-[#7F7F8E] transition-transform duration-200 ${
                      activeFilter === "price" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Цвет */}
                <button
                  type="button"
                  onClick={() => toggleFilterDropdown("color")}
                  className="bg-slate-150 cursor-pointer rounded-sm gap-px flex items-center px-2.5 py-2 text-slate-500"
                >
                  Цвет{" "}
                  {filters.colors.length > 0 && `(${filters.colors.length})`}
                  <Icon
                    icon="chevron-down"
                    width={12}
                    height={12}
                    calcMode={`text-[#7F7F8E] transition-transform duration-200 ${
                      activeFilter === "color" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Компонент с фильтрами */}
              <ModelVariantsFilter
                facets={facets}
                activeFilter={activeFilter}
                onCloseFilter={() => setActiveFilter(null)}
                filters={filters}
                onChangeFilters={handleUpdateFilters}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>

          {activeFilter && (
            <div
              onClick={() => setActiveFilter(null)}
              className="absolute inset-0 z-10 bg-black/20 transition-opacity duration-200"
            />
          )}
          {/* Сетка товаров */}
          <div className="pb-18 pt-3 relative px-6">
            <div className="grid grid-cols-6 mx-auto w-[calc(100%-1px)]">
              {products.map((product, index) => (
                <div
                  key={`${product.spuId ?? index}-${index}`}
                  onClick={() =>
                    product.spuId && void handleProductSelect(product.spuId)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      void handleProductSelect(product.spuId);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="h-35.5 pb-2 bg-white border border-slate-100 flex flex-col items-center m-[-.5px] cursor-pointer"
                >
                  <div className="flex items-center relative">
                    <img
                      loading="lazy"
                      className="w-[4rem] h-[4rem] aspect-square block object-contain"
                      src={
                        product.logoUrl ||
                        "https://cdn-img.thepoizon.ru/pro-img/cut-img/20260602/730456031ce9456e80038460967013ee.jpg?x-oss-process=image/resize,s_96/format,webp"
                      }
                      alt=""
                    />
                  </div>
                  <span className="flex justify-center text-[16px] leading-[100%] font-bold font-roboto_condensed mt-1 text-center">
                    {product.minSpuPrice?.localizedDisplayText || "-- ₽"}
                  </span>
                </div>
              ))}
            </div>

            {/* Индикатор загрузки при бесконечном скролле */}
            {isLoading && (
              <div className="mt-5 flex items-center justify-center w-full">
                <div className="w-10 h-10 animate-spin">
                  <img
                    className="object-contain"
                    src="https://cdn-img.thepoizon.ru/node-common/45a0ec66-395e-e7a8-c213-25245aedaa89-120-120.png?x-oss-process=image/format,webp"
                    alt="loading"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModelVariantsModal;
