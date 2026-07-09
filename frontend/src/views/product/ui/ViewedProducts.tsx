import ProductCard from "@/entities/product-card";

const ViewedProducts = () => {
  return (
    <section className="max-w-310 mx-auto px-5 mt-10">
      <h2 className="text-2xl font-bold font-roboto_condensed leading-7">
        ВЫ СМОТРЕЛИ
      </h2>
      <div className="grid grid-cols-6 mt-5 gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default ViewedProducts;
