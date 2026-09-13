"use client";
import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import ProductCard from "@/entities/product-card";
import FavoriteButton from "@/features/favorites-button";
import { useRecommendedProducts } from "../model/useRecommendedProducts";
import { cn } from "@/shared/utils/clsx";

interface RecommendedProductsProps {
  frontCategoryId: number;
}

const RecommendedProducts = ({ frontCategoryId }: RecommendedProductsProps) => {
  const { products, isLoading, hasMore, handleLoadMore } =
    useRecommendedProducts(frontCategoryId);

  // Если товаров нет и загрузка завершена — не рендерим пустую секцию
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="w-[60rem] mx-auto mt-10">
      <h2 className="text-[24px] font-bold font-roboto_condensed leading-7">
        ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ
      </h2>
      <div className="grid grid-cols-6 mt-5 gap-y-2 gap-x-[.8rem]">
        {products.map((product) => (
          <ProductCard key={product.spuId} product={product}>
            <FavoriteButton className="absolute top-4 right-2 text-slate-500">
              <Icon icon="heart" className="w-[1.2rem] h-[1.2rem]" />
            </FavoriteButton>
          </ProductCard>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center items-center mt-6">
          <Button
            disabled={isLoading}
            onClick={handleLoadMore}
            className={cn(
              "h-12 border border-slate-950 rounded-sm px-3.75 text-[20px] font-bold font-roboto_condensed gap-1.5",
              isLoading && "opacity-65 cursor-not-allowed",
            )}
          >
            {isLoading && (
              <span role="img" aria-label="loading" className="animate-spin">
                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="loading"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                </svg>
              </span>
            )}
            Показать больше
            <Icon
              icon="chevron-down"
              width={18}
              height={18}
              className="shrink-0 rotate-180"
            />
          </Button>
        </div>
      )}
    </section>
  );
};

export default RecommendedProducts;
