import BrandListView from "@/views/brand-list";
import { getBrandList } from "@/views/brand-list";

export const dynamic = "force-dynamic";

export default async function BrandListPage() {
  const brandList = await getBrandList();  
  return <BrandListView brandsData={brandList}/>;
}
