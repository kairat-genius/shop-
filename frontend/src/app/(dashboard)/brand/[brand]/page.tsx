import { getProductList } from "@/shared/api/product-list/getProductList";
import { getProductListCount } from "@/shared/api/product-list/getProductListCount";
import Breadcrumbs from "@/shared/ui/breadcrumbs";

import CategoryView from "@/views/category";
import ProductList from "@/widgets/product-list";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const response = await fetch(
    `http://localhost:3000/api/categories/${encodeURIComponent(category)}`,
    { next: { revalidate: 3600 } },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Category request failed: ${response.status}`);
  }

  const categoryData = await response.json();

  const [initialData, initialCountData] = await Promise.all([
    getProductList(
      {
        limit: 65,
        categories: [categoryData.id],
        currency: "RUB",
        sources: ["POIZON"],
      },
      true,
    ),
    getProductListCount(
      {
        limit: 65,
        categories: [categoryData.id],
        currency: "RUB",
        sources: ["POIZON"],
      },
      true,
    ),
  ]);

  return (
    <main>
      <Breadcrumbs
        title={categoryData.name}
        items={[{ href: "/", title: "Главная" }, { title: categoryData.name }]}
      />
      <ProductList
        category_id={categoryData.id}
        initialData={initialData}
        initialTotalCount={initialCountData.count ?? initialData.data.length}
      />
      <CategoryView />
    </main>
  );
}
