import { Button } from "@/shared/ui/action";
import Icon from "@/shared/icon";

const Reviews = () => {
  return (
    <div className="mt-10">
      <Button className="justify-between gap-5 w-full">
        <div className="flex items-center gap-1.5 font-roboto_condensed font-bold text-2xl leading-[28.13px]">
          <span>ОТЗЫВЫ</span>
          <span>(37)</span>
        </div>
        <Icon
          icon="chevron-right"
          width={14}
          height={14}
          className="shrink-0 text-slate-500"
        />
      </Button>
      <Button
        className="mt-3 p-4 rounded-sm gap-4 w-full"
        style={{ backgroundColor: "rgba(245, 245, 249, .6)" }}
      >
        <div className="w-40">
          <div className="text-[32px] font-bold leading-7 font-roboto_condensed">
            5,0
          </div>
          <div className="mt-2 flex gap-1 items-center justify-center">
            <div className="flex gap-1 items-center">
              <Icon icon="star" width={14} height={14} className="shrink-0" />
              <Icon icon="star" width={14} height={14} className="shrink-0" />
              <Icon icon="star" width={14} height={14} className="shrink-0" />
              <Icon icon="star" width={14} height={14} className="shrink-0" />
              <Icon icon="star" width={14} height={14} className="shrink-0" />
            </div>
            <Icon
              icon="circle-question-mark"
              width={14}
              height={14}
              className="shrink-0 text-slate-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-1 text-xs text-slate-500 leading-4">
            <div className="max-w-20 w-full truncate text-left">Маломерит</div>
            <div className="rounded-xs h-1 relative bg-gray-200 w-full">
              <div
                className="bg-slate-500 rounded-sm absolute left-0 h-1"
                style={{ width: "11%" }}
              />
            </div>
            <div className="w-8 text-right shrink-0">11%</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 leading-4">
            <div className="max-w-20 w-full truncate text-left">В размер</div>
            <div className="rounded-xs h-1 relative bg-gray-200 w-full">
              <div
                className="bg-slate-500 rounded-sm absolute left-0 h-1"
                style={{ width: "89%" }}
              />
            </div>
            <div className="w-8 text-right shrink-0">89%</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 leading-4">
            <div className="max-w-20 w-full truncate text-left">
              Большемерит
            </div>
            <div className="rounded-xs h-1 relative bg-gray-200 w-full">
              <div
                className="bg-slate-500 rounded-sm absolute left-0 h-1"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-8 text-right shrink-0">0%</div>
          </div>
        </div>
      </Button>
      <div className="mt-3 flex gap-1 items-center w-full">
        <div className="grid grid-cols-6 gap-1">
          <img
            className="aspect-3/4"
            src="https://cdn-web.poizon.com/web-app-static/app/2025/community/2521422225_byte1868689byte_6dda3920ac1e24e986553a31309ccbae_iOS_w1440h1920.jpg?x-oss-process=image/resize,s_360/format,webp"
            alt=""
          />
          <img
            className="aspect-3/4"
            src="https://cdn-web.poizon.com/web-app-static/app/2025/community/1249864427_byte2628568byte_7a335aec23207b84b780877f507cb4b0_iOS_w1440h1920.jpg?x-oss-process=image/resize,s_360/format,webp"
            alt=""
          />
          <img
            className="aspect-3/4"
            src="https://cdn-web.poizon.com/web-app-static/app/2025/community/1388564918_modelMI8Litemodel_byte928572byte_6fbae07db7609afe3fcbe3ed70efd948_1757333695903_du_android_w1441_h1921.webp?x-oss-process=image/resize,s_360/format,webp"
            alt=""
          />
          <img
            className="aspect-3/4"
            src="https://cdn-web.poizon.com/web-app-static/app/2025/community/1727928951_modelPJW110model_byte781088byte_d0f19505ef53789910a1329d3e2a00f7_1757330511520_du_android_w1280_h1707.webp?x-oss-process=image/resize,s_360/format,webp"
            alt=""
          />
          <img
            className="aspect-3/4"
            src="https://cdn-web.poizon.com/web-app-static/app/2025/community/2225623377_byte2563809byte_7dc890ed4c85028b7e75001bf507ac9a_iOS_w1440h1920.jpg?x-oss-process=image/resize,s_360/format,webp"
            alt=""
          />
          <img
            className="aspect-3/4"
            src="https://cdn-web.poizon.com/web-app-static/app/2025/community/2554429547_byte3113018byte_87a44c5c06e86aa1839f9feb41ec3167_iOS_w1440h1920.jpg?x-oss-process=image/resize,s_360/format,webp"
            alt=""
          />
        </div>
        <Icon
          icon="chevron-right"
          width={14}
          height={14}
          className="ml-1 shrink-0"
        />
      </div>
      <div className="bg-slate-100 h-px my-4" />
    </div>
  );
};

export default Reviews;
