import type { FacetType } from "@/types/category-filters.type";

interface FacetItem {
  name?: string;
  count?: number;
  value?: string | number;
  label?: string;
  labelUrl?: string;
}

interface NestedFacet {
  items?: FacetItem[];
  nestedFacets?: NestedFacet[];
}

interface NormalizedFacetItem {
  id: string;
  title: string;
  label?: string;
  labelUrl?: string;
}

export const normalizeFacetItems = (items: FacetItem[] = []) =>
  items
    .filter((item) => item?.name && item.count !== 0)
    .map((item) => ({
      id: String(item.value ?? item.name ?? ""),
      title: item.name ?? "",
      label: item.label,
      labelUrl: item.labelUrl,
    }));

export const getFacetList = (
  facets: FacetType[] = [],
  name: string,
  useFirstNestedItems = false,
) => {
  const getFacetItems = (facet: NestedFacet | null): NormalizedFacetItem[] => {
    if (!facet) {
      return [];
    }

    const directItems = facet.items ?? [];

    if (directItems.length > 0) {
      return normalizeFacetItems(directItems);
    }

    const nestedFacets = facet.nestedFacets ?? [];

    if (nestedFacets.length === 0) {
      return [];
    }

    if (useFirstNestedItems) {
      return getFacetItems(nestedFacets[0]);
    }

    return nestedFacets.flatMap((nestedFacet) => getFacetItems(nestedFacet));
  };

  const facet = facets.find((facet) => facet.name === name);

  if (!facet) {
    return [];
  }

  return getFacetItems(facet);
};
