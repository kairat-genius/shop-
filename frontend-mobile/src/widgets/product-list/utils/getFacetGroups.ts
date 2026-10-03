import type { FacetType } from "@/types/category-filters.type";
import {
  normalizeFacetItems,
  type NestedFacet,
  type NormalizedFacetItem,
} from "./getFacetList";

export interface FacetGroup {
  id: string;
  name: string;
  items: NormalizedFacetItem[];
  groups: FacetGroup[];
}

const buildGroup = (node: NestedFacet): FacetGroup => ({
  id: node.module ?? node.name ?? "",
  name: node.name ?? "",
  items: normalizeFacetItems(node.items ?? []),
  groups: (node.nestedFacets ?? []).map((element) => buildGroup(element)),
});

export const getFacetGroups = (
  facets: FacetType[] = [],
  name: string,
): FacetGroup[] => {
  const facet = facets.find((f) => f.name === name);
  if (!facet) return [];

  const node = facet as NestedFacet;

  // плоский фасет с items — оборачиваем в одну группу
  if ((node.items ?? []).length > 0) {
    return [buildGroup(node)];
  }

  return (node.nestedFacets ?? []).map((element) => buildGroup(element));
};