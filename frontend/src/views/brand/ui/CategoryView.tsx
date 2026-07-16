import Breadcrumbs from "./Breadcrumbs";
import FilterAside from "./filter/FilterAside";
import ProductList from "./ProductList";
import CategoryDescription from "./CategoryDescription";
import RelatedBrandsThemes from "./RelatedBrandsThemes";

interface CategoryViewProps {
  category_slug: string;
}

const CategoryView = ({ category_slug }: CategoryViewProps) => {
  return (
    <main>
      <Breadcrumbs
        title="Nike"
        items={[
          { title: "Главная", href: "/" },
          { title: "Nike" },
        ]}
      />
      <div className="container mt-7.5 grid grid-cols-[220px_1fr] gap-[3.2rem]">
        <FilterAside />
        <ProductList category_slug={category_slug} />
      </div>
      <CategoryDescription />
      <RelatedBrandsThemes className="container" />
    </main>
  );
};

export default CategoryView;
