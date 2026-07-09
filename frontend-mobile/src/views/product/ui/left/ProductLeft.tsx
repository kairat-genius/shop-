import Link from "next/link";
import AboutProduct from "./AboutProduct";
import Description from "./Description";
import ProductDetails from "./ProductDetails";

const ProductLeft = () => {
  return (
    <div>
      <AboutProduct />
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <ProductDetails />
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <Description />
      <div className="w-full h-[2.133vw] bg-slate-100" />
      <div className="px-[3.733vw] pt-[2.667vw] pb-[3.2vw]">
        <h2 className="text-[4.8vw] leading-[5.6vw] font-bold font-roboto_condensed">
          Подтверждено ДЭВУ
        </h2>
        <Link href="/about-us" className="mt-[3.2vw] block">
          <img
            className="aspect-5/2 object-contain"
            src="https://cdn-img.thepoizon.ru/node-common/84c40af4-aefb-dda7-1f7b-5a57d4023c60-1800-720.jpg?x-oss-process=image/resize,s_720/format,webp"
            alt=""
          />
        </Link>
      </div>
      <div className="w-full h-[2.133vw] bg-slate-100" />
    </div>
  );
};

export default ProductLeft;
