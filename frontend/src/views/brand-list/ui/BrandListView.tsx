
import { generateProductSlug } from "@/shared/utils/slug";
import type { BrandListResponseType } from "@/types/brand-list.type";
import Link from "next/link";

interface BrandListViewProps {
  brandsData: BrandListResponseType;
}

const BrandListView = ({ brandsData }: BrandListViewProps) => {
  return (
    <main>
      <section className="max-w-360 min-w-[1024px] mx-auto px-20 max-h-[calc(100vh-108px)] sticky top-27 z-10 h-[56.9531px] bg-white">
        <div className="pt-6.25 pl-0.5 flex justify-between font-roboto_condensed font-bold text-[16px] leading-normal">
          {brandsData.brandInfo.map((item) => (
            <a
              key={item.sortLabel}
              className="py-1 first:pl-0 pl-4 text-slate-400"
              href={`#${item.sortLabel}`}
            >
              {item.sortLabel}
            </a>
          ))}
        </div>
      </section>
      {brandsData.brandInfo.map((item) => (
        <section
          key={item.sortLabel}
          className="mt-12 max-w-360 min-w-[1024px] mx-auto px-20"
        >
          <div
            className="mb-1.5 font-roboto_condensed font-bold text-slate-300 text-[18px] leading-normal scroll-mt-40"
            id={item.sortLabel}
          >
            {item.sortLabel}
          </div>
          <div className="grid grid-cols-3 text-[14px] font-medium leading-normal">
            {item.itemList.map((brand, indexbrand) => (
              <div
                key={indexbrand}
                className="border-r border-slate-100 py-5.5 pr-7.5 nth-[3n+3]:border-r-0 nth-[3n+2]:pl-7.5 nth-[3n+3]:pl-7.5"
              >
                <Link href={`/brand/${generateProductSlug(brand.name, brand.brandId)}`}>{brand.name}</Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default BrandListView;
