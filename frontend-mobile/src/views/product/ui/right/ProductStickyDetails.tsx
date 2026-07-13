import ModelVariants from "./ModelVariants";
import SizeSelector from "./SizeSelector";
import ProductHeader from "./ProductHeader";
import DeliveryInfo from "./DeliveryInfo";

const ProductStickyDetails = () => {
  return (
    <>
      <ProductHeader />
      <div className="my-[2.667vw] h-px w-full bg-slate-100 px-[3.733vw] bg-clip-content" />
      <ModelVariants />
      <SizeSelector />
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <DeliveryInfo />
    </>
  );
};

export default ProductStickyDetails;
