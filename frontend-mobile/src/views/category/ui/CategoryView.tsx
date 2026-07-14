import Breadcrumbs from "@/shared/ui/breadcrumbs";
import ProductList from "./ProductList";
import RelatedBrandsThemes from "./RelatedBrandsThemes";
import { categoriesData } from "@/shared/data/category.data";

interface CategoryViewProps {
  category_slug: string;
}
const CategoryView = ({ category_slug }: CategoryViewProps) => {
  const getBreadcrumbs = () => {
    const homeCrumb = { title: "Главная", href: "/" };

    // 1. Проверяем, является ли category_slug родительской категорией
    const parent = categoriesData.find((cat) => cat.slug === category_slug);
    if (parent) {
      return [homeCrumb, { title: parent.title }];
    }

    // 2. Ищем среди дочерних категорий
    for (const parentCat of categoriesData) {
      const child = parentCat.children?.find(
        (child) => child.slug === category_slug,
      );
      if (child) {
        return [
          homeCrumb,
          { title: parentCat.title }, // Родительская категория
          { title: child.title }, // Дочерняя подкатегория
        ];
      }
    }

    // 3. Если ничего не найдено, отображаем переданный слаг
    return [homeCrumb, { title: category_slug }];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} />
      <ProductList category_slug={category_slug} />
      <RelatedBrandsThemes />
    </main>
  );
};

export default CategoryView;
