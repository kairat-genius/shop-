import AllBrandsView, { getBrandFeed } from "@/views/all-brands";

export default async function AllBrandsPage() {
  const initialData = await getBrandFeed(
    { page: 1, pageSize: 10 },
    true,
  );

  return <AllBrandsView initialData={initialData} />;
}
