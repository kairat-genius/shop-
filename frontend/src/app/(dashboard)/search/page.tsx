import Breadcrumbs from "@/shared/ui/breadcrumbs";
import ProductList from "@/widgets/product-list";
import RelatedBrandsThemes from "@/widgets/RelatedBrandsThemes";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";

interface SearchPageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword } = await searchParams;

  if (!keyword || !keyword.trim()) {
    return <EmptySearchState />;
  }

  const initialData = await getProductListSearch(
    {
      pageSize: 60,
      keyword: keyword,
    },
    true,
  );

  const totalResults = initialData?.searchSpuList?.total ?? 0;

  if (totalResults === 0) {
    return <EmptySearchState />;
  }

  return (
    <main>
      <Breadcrumbs
        items={[
          { href: "/", title: "Главная" },
          { title: "Поиск" },
          { title: keyword },
        ]}
      />
      <ProductList
        initialData={initialData}
        filtersData={initialData.facetList}
        keyword={keyword}
      />
      <RelatedBrandsThemes className="container" />
    </main>
  );
}

function EmptySearchState() {
  return (
    <main>
      <div className="pt-8 pb-37.5 container">
        <div className="font-bold text-[24px] leading-7 font-roboto_condensed">
          Просмотр: 0 результатов
        </div>
        <div className="text-[16px] leading-4.75 mt-2">
          Извините. Результатов не найдены.
        </div>
      </div>
    </main>
  );
}
