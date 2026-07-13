"use client";
import { categoriesData } from "@/shared/data/category.data";
import Link from "next/link";
import productsData from "@/shared/data/productData.json";
import { useMemo, useState } from "react";
import { cn } from "@/shared/utils/clsx";

const AllCategoriesView = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) {
      return productsData.slice(0, 6);
    }

    return productsData
      .filter((item) => item.category === activeCategory)
      .slice(0, 6);
  }, [activeCategory]);
  return (
    <main className="flex justify-start bg-[#f5f5f5]">
      <div className="sticky top-[12.8vw] w-[25.067vw] text-slate-500 text-[3.2vw] leading-[normal] wrap-break-word">
        <div
          onClick={() => setActiveCategory(null)}
          className={cn(
            "pr-[2.667vw] pl-[3.733vw] h-[14.4vw] flex items-center cursor-pointer wrap-anywhere",
            activeCategory === null && "font-semibold text-slate-950 bg-white",
          )}
        >
          Рекомендуемое
        </div>
        {categoriesData.map((item) => (
          <div
            key={item.slug}
            onClick={() => setActiveCategory(item.slug)}
            className={cn(
              "w-full text-left pr-[2.667vw] pl-[3.733vw] h-[14.4vw] flex items-center cursor-pointer wrap-anywhere",
              activeCategory === item.slug &&
                "font-semibold text-slate-950 bg-white",
            )}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="bg-white w-[74.933vw] px-[3.733vw] py-[1.6vw]">
        <div className="mt-[3.2vw]">
          <div className="leading-[4.376vw] w-[64.533vw] font-medium text-[3.733vw] mb-[1.6vw]">
            Рекомендации
          </div>
          <div className="grid grid-cols-3 gap-x-[4.267vw]">
            {filteredProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/product/${item.slug}`}
                className="h-[21.867vw] relative overflow-hidden"
              >
                <img
                  className="w-[17.067vw] h-[17.067vw] mx-auto"
                  src={item.image}
                  alt=""
                />

                <div className="absolute h-[6.4vw] inset-x-0 bottom-0 leading-[3.2vw] text-[2.667vw] z-1 flex items-center justify-center">
                  <span className="line-clamp-2 text-center wrap-break-word">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllCategoriesView;
