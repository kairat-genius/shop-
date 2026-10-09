import { getBrandFeed } from "@/views/all-brands/api/getBrandFeed";
import BrandListView from "@/views/brand-list";
import { getBrandList } from "@/views/brand-list";

export const dynamic = "force-dynamic";

export default async function BrandListPage() {
  const [brandList, initialData] = await Promise.all([
    getBrandList(),
    getBrandFeed({ page: 1, pageSize: 21 }, true),
  ]);

  return (
    <BrandListView
      brandsData={brandList}
      popularBrands={initialData.accessBrand.brandList}
    />
  );
}
