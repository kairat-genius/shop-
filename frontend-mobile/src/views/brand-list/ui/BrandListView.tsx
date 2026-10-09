"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/shared/icon";
import type { BrandListResponseType } from "@/types/brand-list.type";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import { generateProductSlug } from "@/shared/utils/slug";
import Link from "next/link";
import type { AccessBrandItemType } from "@/types/brand-feed.type";
import { cn } from "@/shared/utils/clsx";

interface BrandListViewProps {
  brandsData: BrandListResponseType;
  popularBrands: AccessBrandItemType[];
}

/** После какого scrollY индекс уезжает в вертикальный центр */
const CENTER_THRESHOLD = 200;
/** Y (px), по которому определяем текущую букву (примерно под sticky-шапками) */
const ACTIVE_TOP_OFFSET = 130;

const BrandListView = ({ brandsData, popularBrands }: BrandListViewProps) => {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;

  const [activeLetter, setActiveLetter] = useState(
    brandsData.brandInfo[0]?.sortLabel ?? "",
  );
  const [isCentered, setIsCentered] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredBrands = useMemo(() => {
    if (!isSearching) return [];
    const q = query.trim().toLowerCase();
    return brandsData.brandInfo.flatMap((group) =>
      group.itemList.filter((brand) => brand.name.toLowerCase().includes(q)),
    );
  }, [query, brandsData.brandInfo, isSearching]);

  // Скролл-слушатель: активная буква + переезд в центр
  useEffect(() => {
    if (isSearching) return;

    const handler = () => {
      setIsCentered(window.scrollY > CENTER_THRESHOLD);

      let current = brandsData.brandInfo[0]?.sortLabel ?? "";
      for (const group of brandsData.brandInfo) {
        const el = sectionRefs.current[group.sortLabel];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ACTIVE_TOP_OFFSET) {
          current = group.sortLabel;
        } else {
          break;
        }
      }
      setActiveLetter(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [brandsData.brandInfo, isSearching]);

  const handleCancel = () => setQuery("");

  return (
    <main className="min-h-[192vw]">
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {isSearching && (
          <button
            type="button"
            onClick={handleCancel}
            className="ml-[3.2vw] font-medium text-[4.267vw] leading-[normal] whitespace-nowrap"
          >
            Отменить
          </button>
        )}
      </section>

      <section className="overflow-x-auto scrollbar-none w-full">
        <div className="px-[3.733vw] inline-flex min-w-max items-center gap-2.5 h-[19.2vw] bg-white">
          {popularBrands
            .filter((brand) => brand.type !== "all")
            .map((brand) => (
              <Link
                key={brand.brandId}
                className="flex items-center justify-center w-[13.867vw] h-[13.867vw] rounded-full border border-slate-100"
                href={`/brand/${generateProductSlug(String(brand.brandId), brand.brandName)}`}
              >
                <img
                  className="w-[9.067vw] h-[9.067vw] object-contain"
                  src={brand.icon}
                  alt={brand.brandName}
                />
              </Link>
            ))}
        </div>
      </section>

      <section className="pt-[2.133vw] px-[5.333vw]">
        {!isSearching && (
          <div
            className={cn(
              "w-[10.133vw] right-[-3.733vw] fixed z-10",
              "transition-[top,transform] duration-300 ease-out",
              isCentered && "-translate-y-1/2",
            )}
            style={{ top: isCentered ? "50%" : "278.5px" }}
          >
            <div className="flex flex-col text-[3.2vw] leading-[3.733vw] gap-[1.067vw]">
              {brandsData.brandInfo.map((item) => (
                <a
                  key={item.sortLabel}
                  href={`#${item.sortLabel}`}
                  className={cn(
                    "transition-colors duration-200",
                    item.sortLabel === activeLetter
                      ? "text-slate-950 font-medium"
                      : "text-slate-300",
                  )}
                >
                  {item.sortLabel}
                </a>
              ))}
            </div>
          </div>
        )}

        {isSearching ? (
          <div className="mb-[3.2vw] leading-[10.133vw] text-[3.2vw]">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <div
                  key={`${brand.name}-${brand.brandId}`}
                  className="first:pt-[2.133vw] h-[10.133vw] border-scale before:border-slate-100 before:border-b"
                >
                  <Link
                    href={`/brand/${generateProductSlug(brand.name, brand.brandId)}`}
                  >
                    {brand.name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-400 py-[8vw] text-[3.2vw]">
                Ничего не найдено
              </div>
            )}
          </div>
        ) : (
          brandsData.brandInfo.map((item) => (
            <div
              key={item.sortLabel}
              ref={(el) => {
                sectionRefs.current[item.sortLabel] = el;
              }}
            >
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
                    <Link
                      href={`/brand/${generateProductSlug(brand.name, brand.brandId)}`}
                    >
                      {brand.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default BrandListView;