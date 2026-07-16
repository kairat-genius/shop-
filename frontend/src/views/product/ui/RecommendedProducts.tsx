import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import ProductCard from "@/entities/product-card";
import productsData from "@/shared/data/productData.json";
import FavoriteButton from "@/features/favorites-button";

const RecommendedProducts = () => {
  return (
    <section className="w-[60rem] mx-auto mt-10">
      <h2 className="text-[24px] font-bold font-roboto_condensed leading-7">
        ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ
      </h2>
      <div className="grid grid-cols-6 mt-5 gap-y-2 gap-x-[.8rem]">
        {productsData.slice(0, 10).map((product) => (
          <ProductCard key={product.slug} product={product}>
            <FavoriteButton className="absolute top-4 right-2 text-slate-500">
              <Icon icon="heart" className="w-[1.2rem] h-[1.2rem]" />
            </FavoriteButton>
          </ProductCard>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        <Button className="h-12 border border-slate-950 rounded-sm px-3.75 text-[20px] font-bold font-roboto_condensed gap-1.5">
          Показать больше
          <Icon
            icon="chevron-down"
            width={18}
            height={18}
            className="shrink-0 rotate-180"
          />
        </Button>
      </div>
    </section>
  );
};

export default RecommendedProducts;
