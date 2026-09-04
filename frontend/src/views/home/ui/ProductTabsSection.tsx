"use client";

import { useEffect, useState, useMemo } from "react";
import HomeTabs from "./HomeTabs";
import ProductCard from "@/entities/product-card";
import { getProductList } from "@/shared/api/product-list/getProductList";
import { SearchResponseDto } from "@/shared/api/openapi";
import { useCatalogData } from "@/shared/context/catalog-data";

const ProductTabsSection = () => {
  const [activeTab, setActiveTab] = useState("Все");
  const [products, setProducts] = useState<SearchResponseDto>();
  const [isLoading, setIsLoading] = useState(false);

  const { categoryData } = useCatalogData();

  // Формируем список вкладок: "Все" + первые 7 категорий
  const tabNames = useMemo(() => {
    const sliced = categoryData?.categories?.slice(0, 7).map((c) => c.name) ?? [];
    return ["Все", ...sliced];
  }, [categoryData?.categories]);

  // Ищем ID выбранной категории
  const activeCategoryId = useMemo(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    if (activeTab === "Все") return undefined;
    return categoryData?.categories?.find((c) => c.name === activeTab)?.id;
  }, [activeTab, categoryData?.categories]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProductList({
          // Передаем массив строк string[], так как API ожидает string[] | undefined
          categoryIds: activeCategoryId ? [String(activeCategoryId)] : undefined,
          pageSize: 24,
        });

        setProducts(response);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategoryId]);

  // Список товаров из ответа API
  const spuList = products?.searchSpuList?.fallbackSpuList
;

  return (
    <div className="container mt-7.5 mb-5">
      <HomeTabs
        categories={tabNames}
        activeCategory={activeTab}
        onCategoryChange={setActiveTab}
      />

      <div className="grid grid-cols-6 gap-x-[.8rem] gap-y-8 mt-6">
        {isLoading ? (
          <div className="col-span-6 text-center text-slate-500 py-10">
            Загрузка...
          </div>
        ) : (
          // Безопасная проверка: рендерим товары только если spuList существует и не пуст
          spuList && spuList.length > 0 && (
            spuList.map((product) => (
              <ProductCard key={product.spuId} product={product} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default ProductTabsSection;