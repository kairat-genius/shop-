import Icon from "@/shared/icon";
import { BrandListResponseType } from "@/types/brand-list.type";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import { generateProductSlug } from "@/shared/utils/slug";
import { POPULAR_BRANDS } from "@/views/all-brands/data/popylar-brands.data";
import Link from "next/link";

interface BrandListViewProps {
  brandsData: BrandListResponseType;
}

const BrandListView = ({ brandsData }: BrandListViewProps) => {
  return (
    <main>
      <Breadcrumbs
        items={[
          { title: "Главная", href: "/" },
          { title: "Бренды", href: "/all-brands" },
          { title: "Все бренды", href: "/brand/list" },
        ]}
      />
      <section className="pt-[1.867vw] px-[3.733vw] pb-[2.133vw] bg-white sticky z-10 w-full top-[12.8vw] flex items-center">
        <div className="h-[8.533vw] flex-1 border-scale before:border before:border-slate-300 before:rounded-[1.067vw]">
          <div className="px-[2.133vw] flex items-center h-full">
            <Icon
              icon="search"
              className="w-[4.267vw] h-[4.267vw] text-slate-500"
            />

            <input
              className="flex-1 ml-[2.133vw] min-h-[1.5em] leading-normal text-[3.2vw] w-full outline-none caret-teal-400"
              id="search-input"
              placeholder="Поиск по бренду"
            />
          </div>
        </div>
        <span className="ml-[3.2vw] font-medium text-[4.267vw] leading-[normal]">
          Отменить
        </span>
      </section>
      <section className="overflow-x-auto scrollbar-none w-full">
        <div className="px-[3.733vw] inline-flex min-w-max items-center gap-2.5 h-[19.2vw] bg-white">
          {POPULAR_BRANDS.map((brand) => (
            <Link
              key={brand.href}
              className="flex items-center justify-center w-[13.867vw] h-[13.867vw] rounded-full border border-slate-100"
              href={`/brand/${brand.href}`}
            >
              <img
                className="w-[9.067vw] h-[9.067vw] object-contain"
                src={brand.logoSrc}
                alt={brand.alt}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="pt-[2.133vw] px-[5.333vw]">
        <div
          className="w-[10.133vw] bottom-[21.333vw] right-[-3.733vw] fixed z-10"
          style={{ top: "278.5px" }}
        >
          <div className="flex flex-col text-[3.2vw] leading-[3.733vw] gap-[1.067vw]">
            {brandsData.brandInfo.map((item) => (
              <a
                key={item.sortLabel}
                className="text-slate-300"
                href={`#${item.sortLabel}`}
              >
                {item.sortLabel}
              </a>
            ))}
          </div>
        </div>

        {brandsData.brandInfo.map((item) => (
          <div key={item.sortLabel}>
            <div
              className="font-medium text-slate-500 bg-white z-10 top-[25.333vw] sticky text-[3.733vw] leading-[normal] scroll-mt-40"
              id={item.sortLabel}
            >
              {item.sortLabel}
            </div>
            <div className="mb-[3.2vw] leading-[10.133vw] text-[3.2vw]">
              {item.itemList.map((brand, indexbrand) => (
                <div
                  key={indexbrand}
                  className="first:pt-[2.133vw] h-[10.133vw] border-scale before:border-slate-100 before:border-b"
                >
                  <Link  href={`/brand/${generateProductSlug(brand.name, brand.brandId)}`}>{brand.name}</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BrandListView;
