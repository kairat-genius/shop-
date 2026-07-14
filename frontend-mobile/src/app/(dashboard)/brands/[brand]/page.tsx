import BrandView from "@/views/brand";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  return <BrandView brand_slug={brand} />;
}
