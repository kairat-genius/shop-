import { notFound } from "next/navigation";
import ProductView, {
  getProductDetail,
  ProductDetailProvider,
} from "@/views/product";
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

  const productDetail = await getProductDetail(spuId);

  if (productDetail === 404) {
    notFound();
  }
  return (
    <ProductDetailProvider productData={productDetail} productId={spuId}>
      <ProductView />
    </ProductDetailProvider>
  );
}
