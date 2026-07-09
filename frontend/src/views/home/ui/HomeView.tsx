import ProductCard from "@/entities/product-card";
import BrandSection from "./BrandSection";
import CategorySection from "./CategorySection";
import OurAdvantages from "./OurAdvantages";
import HomeTabs from "./HomeTabs";

const HomeView = () => {
  return (
    <main>
      <CategorySection />
      <BrandSection />
      <OurAdvantages />

      <div className="container px-5 mt-7.5">
        <HomeTabs />

        <div className="grid grid-cols-6 gap-x-4 gap-y-8">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </main>
  );
};

export default HomeView;
