"use client";
import {
  CATEGORIES,
  BRANDS_ROW_1,
  BRANDS_ROW_2,
  BRANDS_ROW_3,
} from "../data/global-assortment.data";

const GlobalAssortment = () => {
  return (
    <section className="py-20">
      <div className="max-w-[72rem] w-full mx-auto px-[6rem]">
        <div className="text-[2.5rem] font-bold font-roboto_condensed leading-[normal]">
          Глобальный <span className="text-teal-400">ассортимент</span>
        </div>
        <div className="border-t border-slate-400 mt-10 pt-10">
          <div className="text-[2rem] font-bold font-roboto_condensed leading-[normal]">
            <span className="text-teal-400">Предоставляем более 2 млн</span>{" "}
            товаров
          </div>
          <div className="flex gap-2 mt-6 font-medium leading-normal text-[20px] text-slate-800 text-center">
            {CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <img
                  loading="lazy"
                  className="object-contain h-[9.65rem] w-full"
                  src={cat.image}
                  alt={cat.title}
                />

                <div className="mt-1">{cat.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-400 mt-10 pt-10">
          <div className="text-[2rem] font-bold font-roboto_condensed leading-[normal]">
            <span className="text-teal-400">Предоставляем более 1500</span>{" "}
            глобальных брендов
          </div>
          <div className="flex flex-col gap-6 mt-6">
            {/* Три ряда брендов для эффекта бесконечной ленты – используем один и тот же массив */}
            <div className="overflow-hidden">
              <div className="flex w-max animate-scroll-left">
                {/* Два набора логотипов для бесшовного цикла */}
                {BRANDS_ROW_1.map((src, idx) => (
                  <img
                    key={idx}
                    className="w-[6rem] h-[6rem] object-contain mr-[.75rem] shrink-0"
                    src={src}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
            {/* Ряд 2 – влево */}
            <div className="overflow-hidden">
              <div className="flex w-max animate-scroll-right">
                {BRANDS_ROW_2.map((src, idx) => (
                  <img
                    key={idx}
                    className="w-[6rem] h-[6rem] object-contain mr-[.75rem] shrink-0"
                    src={src}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
            {/* Ряд 3 – вправо */}
            <div className="overflow-hidden">
              <div className="flex w-max animate-scroll-left">
                {BRANDS_ROW_3.map((src, idx) => (
                  <img
                    key={idx}
                    className="w-[6rem] h-[6rem] object-contain mr-[.75rem] shrink-0"
                    src={src}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-30">
          <div className="text-[2.5rem] font-bold font-roboto_condensed leading-[normal]">
            <span className="text-teal-400">Что сказали</span> о бренде
          </div>
          <div className="border-t border-slate-400 mt-10 pt-10">
            <div className="font-light text-[20px] leading-[normal]">
              🔗 <span className="underline">Нажмите, чтобы просмотреть</span>
            </div>
            <div className="text-slate-500 mt-5 font-light text-[20px] leading-[normal]">
              Количество партнёров продолжает расти, следи за новостями!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalAssortment;
