import { getProductListCategory } from "@/views/category-brand/api/getProductListCategory";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import { extractIdFromSlug } from "@/shared/utils/extractIdFromSlug";
import categoryTreeData from "@/shared/context/catalog-data/api/categoryData.json";

import CategoryView, { getCategoryFilters } from "@/views/category-brand";
import ProductList from "@/widgets/product-list";
import { notFound } from "next/navigation";

const findSubcategoryTitleById = (
  categories: typeof categoryTreeData.categories,
  categoryId: string,
): string => {
  const candidateIds = new Set([
    String(categoryId),
    String(Number(categoryId) - 1),
  ]);

  for (const category of categories) {
    for (const child of category.childTreeNode ?? []) {
      if (candidateIds.has(String(child.id))) {
        return child.title;
      }
    }
  }

  return "";
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryId = extractIdFromSlug(category);

  if (!categoryId) {
    notFound();
  }

  const categoryData = await getCategoryFilters(categoryId);

  if (categoryData === 404) {
    notFound();
  }

  const initialData = await getProductListCategory(
    {
      pageSize: 60,
      categoryId,
    },
    true,
  );

  const categoryFacet = categoryData.facets.find(
    (facet) => facet.name === "Категория",
  );

  const categoryTitle =
    categoryFacet?.nestedFacets?.[0]?.name ||
    findSubcategoryTitleById(categoryTreeData.categories, categoryId) ||
    "";

  return (
    <main>
      <Breadcrumbs
        title={categoryTitle}
        items={[{ href: "/", title: "Главная" }, { title: categoryTitle }]}
      />
      <ProductList
        initialData={initialData}
        categoryId={categoryId}
        filtersData={categoryData.facets}
      />
      <CategoryView />
    </main>
  );
}
