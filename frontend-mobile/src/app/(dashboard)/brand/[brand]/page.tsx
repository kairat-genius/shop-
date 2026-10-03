import Breadcrumbs from "@/shared/ui/breadcrumbs";
import { extractIdFromSlug } from "@/shared/utils/extractIdFromSlug";
import ProductList, {
  getProductListCategory,
} from "@/widgets/product-list";
import { notFound } from "next/navigation";


interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const brandId = extractIdFromSlug(brand);

  if (!brandId) {
    notFound();
  }

  const initialData = await getProductListCategory(
    {
      pageSize: 20,
      brandId,
    },
    true,
  );

  return (
    <main>
      <Breadcrumbs
        items={[{ href: "/", title: "Главная" }, { title: "Бренды" }]}
      />
      <ProductList initialData={initialData} brandId={brandId} />
    </main>
  );
}
