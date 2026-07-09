import Link from "next/link";
import Gallery from "./Gallery";
import AboutProduct from "./AboutProduct";
import Reviews from "./Reviews";
import SizeFinder from "./SizeFinder";
import Description from "./Description";
import ProductDetails from "./ProductDetails";

const ProductLeft = () => {
  return (
    <div>
      <Gallery
        medias={[
          {
            file: "/back_media/uploads/productmedia/processed/4ddd528b-4fbe-4e2a-8825-6ada9012eab6/17Pm-17P---leo-1.jpg",
            media_type: "image",
            preview_file: null,
          },
          {
            file: "/back_media/uploads/productmedia/processed/f32d6b94-643d-44dc-80c3-7ce49575cdd8/17Pm-17P---leo-2-MS.jpg",
            media_type: "image",
            preview_file: null,
          },
          {
            file: "/back_media/uploads/productmedia/processed/cdcdae26-5b47-44df-bcbf-a66bc8393bd1/%D0%9B%D0%B5%D0%BE_1.mp4",
            media_type: "video",
            preview_file:
              "/back_media/uploads/productmedia/preview/cdcdae26-5b47-44df-bcbf-a66bc8393bd1/%D0%9B%D0%B5%D0%BE_1_preview.jpg",
          },
        ]}
      />
      <Reviews />
      <SizeFinder />
      <div className="w-full h-[2.133vw] bg-slate-100" />
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
