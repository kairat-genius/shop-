import dynamic from "next/dynamic";
import { getProductListSearch } from "@/shared/api/product-list/getProductListSearch";
import { getFacetList } from "@/widgets/product-list/utils/getFacetList";

const RecommendedProducts = dynamic(() => import("./RecommendedProducts"));

interface RecommendedProductsSectionProps {
  frontCategoryId: number;
}

export default async function RecommendedProductsSection({
  frontCategoryId,
}: RecommendedProductsSectionProps) {
  if (!frontCategoryId) return null;

  const initialData = await getProductListSearch(
    {
      categoryIds: [String(frontCategoryId)],
      pageSize: 24,
      page: 1,
    },
    false,
  );

  const fetchedFacets =
    initialData.facetList && initialData.facetList.length > 0
      ? initialData.facetList
      : initialData.facetPanel && initialData.facetPanel.length > 0
        ? initialData.facetPanel
        : [];

  const categoryList = getFacetList(fetchedFacets, "Категория", true);

  return (
    <RecommendedProducts
      initialData={initialData}
      frontCategoryId={frontCategoryId}
      categoryList={categoryList}
    />
  );
}
