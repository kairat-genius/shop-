import CategoryView from "@/views/category";

interface CategoryPageProps {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage() {
  return <CategoryView category_slug={"sneakers"} />;
}
