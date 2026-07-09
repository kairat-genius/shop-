import Breadcrumbs from "./Breadcrumbs";
import ProductList from "./ProductList";
import RelatedBrandsThemes from "./RelatedBrandsThemes";

interface CategoryViewProps {
  category_slug: string;
}
const CategoryView = ({ category_slug }: CategoryViewProps) => {

  return (
    <main>
      <Breadcrumbs
        items={[{ title: "Главная", href: "/" }, { title: "Кроссовки" }]}
      />
      <ProductList category_slug={category_slug} />
      <RelatedBrandsThemes />
    </main>
  );
};

export default CategoryView;
