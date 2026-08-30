"use client";
import ProductCard from "@/entities/product-card";
import BrandSection from "./BrandSection";
import CategorySection from "./CategorySection";
import OurAdvantages from "./OurAdvantages";
import HomeTabs from "./HomeTabs";
import { useState, useMemo } from "react";
import type { ProductResponseV2Dto } from "@/shared/api/openapi";
import { categoriesData } from "@/shared/data/category.data";
import productData from "@/shared/data/productData.json";

const MAX_CATEGORIES = 7;
const MAX_PRODUCTS = 18;

export const normalizeHomeProduct = (
  product: (typeof productData)[number],
): ProductResponseV2Dto => {
  const productId = product.slug.length + product.title.length;
  const priceNumber = Number(product.price.replaceAll(/\D/g, "")) || 0;
  const soldNumber = Number(product.sold.replaceAll(/\D/g, "")) || 0;

  return {
    id: Math.abs(productId) || 1,
    article: product.slug,
    isCustom: false,
    logoUrl: product.image,
    gender: "UNISEX",
    favoriteCount: 0,
    soldCount: soldNumber,
    popularityScore: 0,
    currency: "RUB",
    minPrice: priceNumber,
    maxPrice: priceNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
    brandId: 0,
    categoryId: 0,
    modelId: 0,
    mainSource: "POIZON",
    sources: [],
    title: product.title,
  } as ProductResponseV2Dto;
};

// для удобства создаём карту slug ↔ title
const categoryMap = new Map(categoriesData.map((cat) => [cat.title, cat.slug]));
// slug'и всех корневых категорий (первые 7)
const rootSlugs = new Set(
  categoriesData.slice(0, MAX_CATEGORIES).map((c) => c.slug),
);

const HomeView = () => {
  const [activeCategory, setActiveCategory] = useState("Все");

  // Названия для вкладок
  const categories = useMemo(() => {
    const rootTitles = categoriesData
      .slice(0, MAX_CATEGORIES)
      .map((c) => c.title);
    return ["Все", ...rootTitles];
  }, []);

  // Товары с учётом фильтра по категории
  const filteredProducts = useMemo(() => {
    if (activeCategory === "Все") {
      // показать товары всех корневых категорий (первые 7)
      return productData
        .filter((product) => rootSlugs.has(product.category))
        .slice(0, MAX_PRODUCTS);
    }
    const slug = categoryMap.get(activeCategory);
    if (!slug) return [];
    return productData
      .filter((product) => product.category === slug)
      .slice(0, MAX_PRODUCTS);
  }, [activeCategory]);

  return (
    <main>
      <CategorySection />
      <BrandSection />
      <OurAdvantages />

      <div className="container mt-7.5 mb-5">
        <HomeTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-6 gap-x-[.8rem] gap-y-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={normalizeHomeProduct(product)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomeView;
