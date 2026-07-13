import Link from "next/link";
import {
  brandsRow,
  catalog1AllData,
  catalog2AllData,
  categoriesRow,
} from "../data/homeCatalog.data";

interface CatalogProps {
  category_slug: string;
}

const Catalog = ({ category_slug }: CatalogProps) => {
  if (category_slug === "all") {
    return (
      <section className="flex flex-col items-center gap-[2.667vw] px-[1.2vw] mb-[2.133vw]">
        <div className="grid grid-cols-5 items-center gap-[1.067vw]">
          {catalog1AllData.map((item, j) => (
            <Link
              key={j}
              href={item.href}
              className="flex flex-col items-center"
            >
              <img
                className="w-[15.467vw] h-[15.467vw] aspect-square"
                src={item.image}
                alt=""
              />
              <div className="text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light w-full h-[7.467vw] mt-[-1.6vw]">
                <div className="line-clamp-2 wrap-break-word">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-5 items-center gap-[1.067vw]">
          {catalog2AllData.map((item, j) => (
            <Link
              key={j}
              href={item.href}
              className="flex flex-col items-center"
            >
              <img
                className="w-[15.467vw] h-[15.467vw] aspect-square"
                src={item.image}
                alt=""
              />
              <div className="text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light w-full h-[7.467vw] mt-[-1.6vw]">
                <div className="line-clamp-2 wrap-break-word">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="px-[1.2vw] mb-[2.133vw] overflow-hidden">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex items-center w-full min-w-max">
          <Link
            href={`/category/${category_slug}`}
            className="flex flex-col items-center w-[18.667vw] flex-none"
          >
            <img
              className="w-[15.467vw] h-[15.467vw] aspect-square"
              src="https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/41c07ab2615d4fe18cbecb70990733fb.jpg?x-oss-process=image/resize,s_96/format,webp"
              alt=""
            />
            <div className="line-clamp-2 text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light wrap-break-word w-full h-[7.467vw] mt-[-1.6vw]">
              Все категории
            </div>
          </Link>
          {categoriesRow.map((item, j) => (
            <Link
              key={j}
              href={item.href}
              className="flex flex-col items-center w-[18.667vw] flex-none"
            >
              <img
                className="w-[15.467vw] h-[15.467vw] aspect-square"
                src={item.image}
                alt=""
              />
              <div className="text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light w-full h-[7.467vw] mt-[-1.6vw]">
                <div className="line-clamp-2 wrap-break-word">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center w-full min-w-max mt-[2.667vw]">
          <Link
            href="/all-brands"
            className="flex flex-col items-center w-[18.667vw]"
          >
            <div className="w-[13.867vw] h-[13.867vw] rounded-[13.867vw] border border-[rgba(199,199,215,.4)] flex items-center justify-center">
              <img
                className="w-[9.067vw] h-[9.067vw] aspect-square"
                src="https://cdn-img.thepoizon.ru/pro-img/cut-img/20251208/41c07ab2615d4fe18cbecb70990733fb.jpg?x-oss-process=image/resize,s_96/format,webp"
                alt=""
              />
            </div>
            <div className="text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light w-full h-[7.467vw] mt-[-1.6vw]">
              Все бренды
            </div>
          </Link>
          {brandsRow.map((item, j) => (
            <Link
              key={j}
              href={item.href}
              className="flex flex-col items-center w-[18.667vw]"
            >
              <div className="w-[13.867vw] h-[13.867vw] rounded-[13.867vw] border border-[rgba(199,199,215,.4)] flex items-center justify-center">
                <img
                  className="w-[9.067vw] h-[9.067vw] aspect-square"
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="text-center flex items-center justify-center leading-[3.467vw] text-[2.667vw] font-light w-full h-[7.467vw] mt-[-1.6vw]">
                <div className="line-clamp-2 wrap-break-word">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
