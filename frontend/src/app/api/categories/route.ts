import { NextResponse } from "next/server";
import { getCachedCategories } from "@/shared/api/categories";

export async function GET() {
  const categories = await getCachedCategories();

  return NextResponse.json(categories);
}
