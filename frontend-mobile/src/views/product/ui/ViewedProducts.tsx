"use client";

import Link from "next/link";
import { useViewedProducts } from "../model/useViewedProducts";
import { generateProductSlug } from "@/shared/utils/slug";
import { getImageUrl } from "@/shared/utils/getImageUrl";

const ViewedProducts = () => {
  const viewedProducts = useViewedProducts();

  // не рендерим пустой блок
  if (viewedProducts.length === 0) return null;
  return (
    <section className="mb-[3.2vw]">
      <h2 className="text-[4.8vw] font-bold font-roboto_condensed leading-[5.6vw] flex items-center justify-between px-[3.733vw] mt-[3.2vw]">
        Вы смотрели
      </h2>
      <ul className="mt-5 flex items-center gap-[2.667vw] overflow-x-auto scrollbar-none">
        {viewedProducts.map((product) => (
          <li
            key={product.spuId}
            className="first:ml-[3.733vw] last:mr-[3.733vw]"
          >
            <Link
              title="New Balance NB 565 Ткань Износостойкая Дышащая Низкие Повседневные Беговые Кроссовки Унисекс Серый Белый Черный Ширина D"
              href={`/product/${generateProductSlug(product.title, product.spuId)}`}
            >
              <div className="relative w-[26.667vw] h-[26.667vw] flex items-center justify-center">
                <img
                  loading="lazy"
                  className="w-full h-full object-contain"
                  src={getImageUrl(product.logoUrl)}
                  alt=""
                />
              </div>
              <div className="mt-[2.133vw] text-[3.733vw] font-bold font-roboto_condensed leading-[normal] text-center">
                {product.minSpuPrice?.localizedDisplayText || "-- ₽"}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ViewedProducts;
