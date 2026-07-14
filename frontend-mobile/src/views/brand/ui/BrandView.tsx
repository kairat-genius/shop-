import Breadcrumbs from "@/shared/ui/breadcrumbs";
import ProductList from "./ProductList";
import RelatedBrandsThemes from "./RelatedBrandsThemes";

interface BrandViewProps {
  brand_slug: string;
}
const BrandView = ({}: BrandViewProps) => {
  return (
    <main>
      <Breadcrumbs
        items={[
          { title: "Главная", href: "/" },
          { title: "Бренды", href: "/all-brands" },
          { title: "Nike" },
        ]}
      />
      <ProductList />
      <RelatedBrandsThemes />
    </main>
  );
};

export default BrandView;
