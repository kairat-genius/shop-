"use client";
import Icon from "@/shared/icon";
import Link from "next/link";
import { useProductDetailData } from "../../context/useCatalogData";
import { generateProductSlug } from "@/shared/utils/slug";

const ProductBrand = () => {
  const {
    productData: {
      brandItemsModel,
      seriesItemsModel,
      buyDialogModel: { detail },
    },
  } = useProductDetailData();
  return (
    <>
      {brandItemsModel?.brandName && brandItemsModel?.brandId && (
        <div className="px-[3.733vw]">
          <Link
            href={`/brand/${generateProductSlug(brandItemsModel.brandName, brandItemsModel.brandId)}`}
            target="_blank"
            className="grid grid-cols-[10.667vw_1fr] items-center gap-[2.133vw] pl-[3.2vw] py-[3.2vw]"
          >
            <img
              className="rounded-full w-[8.533vw] h-[8.533vw] border border-slate-100"
              src={brandItemsModel.brandLogo}
              alt="brand-logo"
            />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[1.067vw]">
                <div className="text-[3.733vw] leading-[4.267vw] font-medium truncate">
                  {brandItemsModel.brandName}
                </div>
                <div className="text-[3.2vw] font-light leading-[3.733vw] truncate">
                  {brandItemsModel.brandItems}
                </div>
              </div>
              <Icon
                icon="chevron-right"
                className="text-slate-400 w-[3.2vw] h-[3.2vw]"
              />
            </div>
          </Link>
        </div>
      )}
      <div className="w-full h-[2.133vw] bg-slate-100" />

      <div className="my-[3.2vw] flex flex-col px-[3.733vw] text-[3.2vw] leading-[3.733vw]">
        {seriesItemsModel?.map((item) => (
          <div className="flex items-center" key={item.seriesId}>
            <div className="font-light w-[18.133vw]">{item.key}</div>
            <Link
              href={`/trends/${generateProductSlug(item.value, item.seriesId || 0)}`}
              className="flex items-center"
            >
              {item.value}
              <Icon
                icon="chevron-right"
                className="text-slate-400 w-[3.2vw] h-[3.2vw]"
              />
            </Link>
          </div>
        ))}
        <div className="mt-[1.6vw] flex items-center text-[3.2vw] leading-[3.733vw]">
          <div className="font-light w-[18.133vw]">Каталог</div>
          <div>
            <Link className="underline" href="/" title="POIZON">
              Главная
            </Link>
            <span className="mx-[.8vw] px-px text-slate-500">/</span>
            <Link
              className="underline"
              href={`/category/${generateProductSlug(detail.frontCategoryName, detail.frontCategoryId)}`}
            >
              {detail.frontCategoryName}
            </Link>
            <span className="mx-[.8vw] px-px text-slate-500">/</span>
            <Link
              className="underline"
              href={`/category/${generateProductSlug(detail.brandName, detail.brandId)}`}
            >
              {detail.brandName}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBrand;
