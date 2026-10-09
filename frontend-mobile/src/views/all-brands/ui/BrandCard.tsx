import Link from "next/link";
import Icon from "@/shared/icon";
import type { BrandFeedResponseType } from "@/types/brand-feed.type";
import { getImageUrl } from "@/shared/utils/getImageUrl";
import { generateProductSlug } from "@/shared/utils/slug";

type Brand = BrandFeedResponseType["floorModularList"][number];

export const BrandCard = ({ brand }: { brand: Brand }) => {
  return (
    <Link
      className="mb-[1.6vw] bg-white rounded-[1.067vw] block pt-[2.133vw] px-[2.667vw] pb-[3.2vw]"
      href={`/brand/${generateProductSlug(String(brand.brandId), brand.brandName)}`}
    >
      <div className="h-[11.2vw] flex items-center">
        <img
          className="w-[11.2vw] h-[11.2vw] rounded-[.533vw] object-contain"
          src={brand.brandIcon}
          alt={brand.brandName}
        />
        <div className="h-[9.333vw] ml-[2.667vw] flex-1 w-[56.8vw]">
          <div className="mb-[.533vw] font-roboto_condensed text-[4.267vw] leading-[5.067vw] font-bold truncate">
            {brand.brandName}
          </div>
          <div className="flex flex-wrap items-center gap-[1.6vw] text-slate-500 font-light text-[3.2vw] leading-[1.3]">
            {brand.statisticalData?.productNumText && (
              <span>{brand.statisticalData.productNumText}</span>
            )}
            {brand.statisticalData?.newNumText && (
              <>
                <span className="w-[.533vw] h-[.533vw] bg-slate-500" />
                <span>{brand.statisticalData.newNumText}</span>
              </>
            )}
          </div>
        </div>
        <Icon
          icon="chevron-right"
          className="text-slate-400 w-[2.667vw] h-[2.667vw]"
        />
      </div>
      <div className="flex items-center justify-between">
        {brand.spuList?.slice(0, 3).map((product) => (
          <div
            key={product.spuId}
            className="h-[29.333vw] relative overflow-hidden"
          >
            <img
              className="w-[26.667vw] h-[26.667vw] object-contain"
              src={getImageUrl(product.logoUrl)}
              alt={product.title}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 truncate leading-[4.267vw] text-[3.733vw] font-bold font-roboto_condensed">
              {product.minSpuPrice?.localizedDisplayText}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};