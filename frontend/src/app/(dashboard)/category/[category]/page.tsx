import { getProductListCategory } from "@/views/category/api/getProductListCategory";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import { extractIdFromSlug } from "@/shared/utils/extractIdFromSlug";

import CategoryView, { getCategoryFilters } from "@/views/category";
import ProductList from "@/widgets/product-list";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryId = extractIdFromSlug(category);

  console.log("CategoryPage categoryId:", categoryId);

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

  const categoryTitle = categoryFacet?.nestedFacets?.[0]?.name || "";

  return (
    <main>
      <Breadcrumbs
        title={categoryTitle}
        items={[
          { href: "/", title: "Главная" },
          { href: `/category/${category}`, title: categoryTitle },
        ]}
      />
      <ProductList
        initialData={initialData}
        categoryId={categoryId}
        filtersData={categoryData}
      />
      <CategoryView />
    </main>
  );
}
