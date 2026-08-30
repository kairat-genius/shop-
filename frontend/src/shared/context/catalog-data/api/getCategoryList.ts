import { getCachedCategories } from "@/shared/api/categories";
import type {
  CategoriesWithSlugsResponse,
  CategoryTreeItem,
  CategoryTreeResponse,
} from "@/types/category-slug.type";

const TARGET_CATEGORY_IDS = [8713, 6573, 6552, 8017, 6554, 8076] as const;

function buildCategoryTree(
  categories: CategoriesWithSlugsResponse["data"],
): CategoryTreeItem[] {
  const itemsById = new Map<number, CategoryTreeItem>();
  const childrenByParent = new Map<number, number[]>();

  for (const category of categories) {
    if (!category.id) continue;

    itemsById.set(category.id, {
      ...category,
      children: [],
    });

    if (category.parentId) {
      const parentChildren = childrenByParent.get(category.parentId) ?? [];
      parentChildren.push(category.id);
      childrenByParent.set(category.parentId, parentChildren);
    }
  }

  const attachChildren = (node: CategoryTreeItem) => {
    const childIds = childrenByParent.get(node.id ?? -1) ?? [];

    for (const childId of childIds) {
      const child = itemsById.get(childId);
      if (!child) continue;

      node.children.push(child);
      attachChildren(child);
    }
  };

  return TARGET_CATEGORY_IDS.flatMap((rootId) => {
    const rootNode = itemsById.get(rootId);

    if (!rootNode) return [];

    rootNode.children = [];
    attachChildren(rootNode);

    return [rootNode];
  });
}

export async function getCategoryList(): Promise<CategoryTreeResponse> {
  const categories = await getCachedCategories();

  return {
    ...categories,
    data: buildCategoryTree(categories.data),
  } as CategoryTreeResponse;
}
