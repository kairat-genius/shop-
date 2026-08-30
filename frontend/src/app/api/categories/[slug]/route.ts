import { NextResponse } from "next/server";
import { getCachedCategories } from "@/shared/api/categories";

interface CategorySlugRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _request: Request,
  { params }: CategorySlugRouteProps,
) {
  const { slug } = await params;
  const categories = await getCachedCategories();
  const category = categories.data.find((item) => item.slug === slug);

  if (!category) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(category);
}
