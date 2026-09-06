import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import HomeView from "@/views/home";
import ProductTabsSection from "@/views/home/ui/ProductTabsSection";

export default async function HomePage() {
  const initialData = await getProductListSearch(
    {
      pageSize: 24,
    },
    true,
  );
  console.log(initialData)

  return (
    <main>
      <HomeView />
      <ProductTabsSection initialData={initialData}/>
    </main>
  );
}
