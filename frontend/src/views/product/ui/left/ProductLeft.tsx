import Link from "next/link";
import Gallery from "./Gallery";
import AboutProduct from "./AboutProduct";
import Reviews from "./Reviews";
import SizeFinder from "./SizeFinder";
import Description from "./Description";
import ProductDetails from "./ProductDetails";

const productMedias = [
  {
    file: "https://cdn-img.thepoizon.ru/node-common/MTE2Mjc1NTI5MDkwNDk=.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/pro-img/cut-img/20240726/1eed0defcabe44b989217ec6ef6a8431.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/pro-img/cut-img/20230707/c61f492cf7e84126ac2d2ef99fa3471e.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/pro-img/cut-img/20230707/c68364f5c463424eafeb975c72fd51e4.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/pro-img/cut-img/20230707/51d05eccaedd4fb18b9020d0c34168a6.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/node-common/NTE2Mjc1NTI5MDkyNjc=.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/du_app/2021/image/1523311250_byte259183byte_cf66bfcc99b56a653a017702cfdd7f0f_iOS_w1222h1221.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/du_app/2020/image/112839408_modelPBBM00model_byte172610byte_c2b8053f1b70f69294df9fb06fe60314_du_android_w1080_h1080.png?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-web.poizon.com/web-app-static/app/2024/community/1995963114_byte226685byte_2ea561b2c2b08e1cc8d315d26e8c6fc8_iOS_w1170h1560.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/stark/stark-web/1740513263/3cc609e15cce9f589b3cbe28aa9c7452.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/stark/stark-web/1740513263/0bcbfcc4579ce98078e6f3e2ccc94da1.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/algo/offline/20241116/1001819_130560976_1dd8b714a4d511efbdb2fa163ee08ce4.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/algo/offline/20241116/1001819_130560977_1ee48430a4d511efbdb2fa163ee08ce4.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/stark/stark-web/1740513263/c0f91a2398579e9798fbe5be9c34192f.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/node-common/NDE2Mjc1NTI5MDkxMzY=.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/node-common/MjIxNjI3NTUyOTA5MzE2.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
  {
    file: "https://cdn-img.thepoizon.ru/node-common/JUU2JTlDJUFBJUU2JUEwJTg3JUU5JUEyJTk4LTExNjI3NTUyOTA5NDAx.jpg?x-oss-process=image/resize,s_720/format,webp",
    media_type: "image",
    preview_file: null,
  },
];

const ProductLeft = () => {
  return (
    <div>
      <Gallery medias={productMedias} />
      <Reviews />
      <SizeFinder />
      <AboutProduct />
      <ProductDetails />
      <Description />
      <div className="mt-10">
        <h2 className="text-2xl leading-[100%] font-bold font-roboto_condensed">
          Подтверждено ДЭВУ
        </h2>
        <Link href="/about-us" className="mt-5 block">
          <img
            className="aspect-5/2 object-contain"
            src="https://cdn-img.thepoizon.ru/node-common/84c40af4-aefb-dda7-1f7b-5a57d4023c60-1800-720.jpg?x-oss-process=image/resize,s_720/format,webp"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductLeft;
