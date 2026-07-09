import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";
import ProductCard from "@/entities/product-card";

const RecommendedProducts = () => {
  return (
    <section className="max-w-310 mx-auto px-5 mt-10">
      <h2 className="text-2xl font-bold font-roboto_condensed leading-7">
        ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ
      </h2>
      <div className="grid grid-cols-6 mt-5 gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="flex justify-center items-center mt-6">
        <Button className="h-12 border border-slate-950 rounded-sm px-3.75 text-xl font-bold font-roboto_condensed gap-1.5">
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
