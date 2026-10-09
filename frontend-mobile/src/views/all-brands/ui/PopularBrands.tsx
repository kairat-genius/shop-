import Link from "next/link";
import type { AccessBrandItemType } from "@/types/brand-feed.type";

export const PopularBrands = ({
  brands,
}: {
  brands: AccessBrandItemType[];
}) => {
  if (brands.length === 0) return null;

  return (
    <div className="overflow-x-auto scrollbar-none w-full">
      <div className="px-[3.733vw] inline-flex min-w-max items-center gap-2.5 h-[19.2vw] bg-white">
        {brands.map((brand) => {
          const isAll = brand.type === "all";
          const href = isAll ? "/brand/list" : `/brand/${brand.brandId}`;
          return (
            <Link
              key={`${brand.brandId}-${brand.type}`}
              className="flex items-center justify-center w-[13.867vw] h-[13.867vw] rounded-full border border-slate-100"
              href={href}
            >
              <img
                className="w-[9.067vw] h-[9.067vw] object-contain"
                src={brand.icon}
                alt={brand.brandName}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};