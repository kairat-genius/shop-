import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import HomeView from "@/views/home";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const initialData = await getProductListSearch(
    {
      pageSize: 24,
    },
    true,
  );

  return (
    <main>
      <HomeView initialData={initialData}/>
    </main>
  );
}
