import type { FacetDto } from "@/shared/api/openapi";

interface FacetItem {
  name?: string;
  value?: string | number;
}

interface NestedFacet {
  items?: FacetItem[];
  nestedFacets?: NestedFacet[];
}

export const normalizeFacetItems = (items: FacetItem[] = []) =>
  items
    .filter((item) => item?.name)
    .map((item) => ({
      id: String(item.value ?? item.name ?? ""),
      title: item.name ?? "",
    }));

export const getFacetList = (
  facets: FacetDto[] = [],
  name: string,
  useFirstNestedItems = false,
) => {
  const getFacetItems = (
    facet: NestedFacet | null,
  ): Array<{ id: string; title: string }> => {
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

    return nestedFacets.flatMap((nestedFacet) =>
      getFacetItems(nestedFacet),
    );
  };

  const facet = facets.find((facet) => facet.name === name);

  if (!facet) {
    return [];
  }

  return getFacetItems(facet);
};