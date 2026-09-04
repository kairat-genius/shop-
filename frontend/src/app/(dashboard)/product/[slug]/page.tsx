import { notFound } from "next/navigation";
import ProductView, { getProductDetail } from "@/views/product";
import { ResponseError } from "@/shared/api/openapi/runtime";
import { extractIdFromSlug } from "@/shared/utils/extractIdFromSlug";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const productId = extractIdFromSlug(slug);

  if (!productId) {
    notFound();
  }

  const spuId = Number(productId);

  let productDetail;

  try {
    productDetail = await getProductDetail(
      {
        spuId: spuId,
      },
      true,
    );
  } catch (error) {
    if (error instanceof ResponseError && error.response.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <>
      <ProductView
        productData={productDetail}
        productId={spuId}
      />
    </>
  );
}
