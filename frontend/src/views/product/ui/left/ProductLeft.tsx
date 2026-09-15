import Link from "next/link";
import Gallery from "./Gallery";
import AboutProduct from "./AboutProduct";
import Reviews from "./Reviews";
import SizeFinder from "./SizeFinder";
import Description from "./Description";
import ProductDetails from "./ProductDetails";
import { useProductDetailData } from "../../context/useCatalogData";

const ProductLeft = () => {
  const { productData, productId } = useProductDetailData();
  return (
    <div>
      <Gallery />
      {productData.commodityReviews && <Reviews />}
      {productData.sizeAssistantModule && (
        <SizeFinder sizeAssistantModule={productData.sizeAssistantModule} productId={productId}/>
      )}
      <AboutProduct />
      {productData.detailImageList?.length > 0 && (
        <ProductDetails detailImageList={productData.detailImageList} />
      )}
      {productData.detailTextModule && (
        <Description detailTextModule={productData.detailTextModule} />
      )}
      {productData.authenticatedGuaranteeModule && (
        <div className="mt-10">
          <h2 className="text-[24px] leading-[100%] font-bold font-roboto_condensed">
            {productData.authenticatedGuaranteeModule.title}
          </h2>
          <Link href="/about-us" className="mt-5 block">
            <img
              className="aspect-5/2 object-contain"
              src={productData.authenticatedGuaranteeModule.url}
              alt=""
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductLeft;
