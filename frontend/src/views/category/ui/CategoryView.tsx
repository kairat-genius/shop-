import Breadcrumbs from "./Breadcrumbs";
import FilterAside from "./filter/FilterAside";
import ProductList from "./ProductList";
import CategoryDescription from "./CategoryDescription";
import RelatedBrandsThemes from "./RelatedBrandsThemes";

const CategoryView = () => {
  return (
    <main>
      <Breadcrumbs
        title="Кроссовки"
        items={[
          { title: "Главная", href: "/" },
          { title: "Каталог", href: "/catalog" },
          { title: "Кроссовки" },
        ]}
      />
      <div className="container px-5 mt-7.5 flex gap-8 lg:gap-16">
        <FilterAside />
        <ProductList />
      </div>
      <CategoryDescription/>
      <RelatedBrandsThemes className="container"/>
    </main>
  );
};

export default CategoryView;
