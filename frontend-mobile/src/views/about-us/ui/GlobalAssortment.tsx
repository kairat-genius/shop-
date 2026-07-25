"use client";
import {
  CATEGORIES,
  BRANDS_ROW_1,
  BRANDS_ROW_2,
  BRANDS_ROW_3,
} from "../data/global-assortment.data";

const GlobalAssortment = () => {
  return (
    <section className="py-[6.4vw] px-[3.733vw] scroll-mt-[18vw]" id="assortment">
      <div className="text-[6.4vw] font-bold font-roboto_condensed leading-[normal]">
        Глобальный <span className="text-teal-400">ассортимент</span>
      </div>
      <div className="mt-[5.333vw]">
        <div className="text-[4.8vw] font-bold font-roboto_condensed leading-[normal]">
          <span className="text-teal-400">Предоставляем более 2 млн</span>{" "}
          товаров
        </div>
        <div className="grid grid-cols-3 gap-y-[2.133vw] gap-x-[3.2vw] mt-[3.2vw] font-light leading-[3.733vw] text-[3.467vw] text-slate-800 text-center">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="min-w-0">
              <img
                loading="lazy"
                className="object-contain h-[21.333vw] w-full"
                src={cat.image}
                alt={cat.title}
              />

              <div className="">{cat.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[5.333vw]">
        <div className="text-[4.8vw] font-bold font-roboto_condensed leading-[normal]">
          <span className="text-teal-400">Предоставляем более 1500</span>{" "}
          глобальных брендов
        </div>
        <div className="flex flex-col gap-[2.667vw] mt-[3.2vw]">
          {/* Три ряда брендов для эффекта бесконечной ленты – используем один и тот же массив */}
          <div className="overflow-hidden">
            <div className="flex w-max animate-scroll-left">
              {/* Два набора логотипов для бесшовного цикла */}
              {BRANDS_ROW_1.map((src, idx) => (
                <img
                  key={idx}
                  className="w-[16vw] h-[16vw] object-contain mr-[3.2vw] shrink-0"
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
                  className="w-[16vw] h-[16vw] object-contain mr-[3.2vw] shrink-0"
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
                  className="w-[16vw] h-[16vw] object-contain mr-[3.2vw] shrink-0"
                  src={src}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[5.333vw]">
        <div className="text-[6.4vw] font-bold font-roboto_condensed leading-[normal]">
          <span className="text-teal-400">Что сказали</span> о бренде
        </div>
        <div className="mt-[2.133vw]">
          <div className="font-light text-[3.2vw] leading-[normal]">
            🔗 <span className="underline">Нажмите, чтобы просмотреть</span>
          </div>
          <div className="text-slate-500 mt-[2.133vw] font-light text-[3.2vw] leading-[normal]">
            Количество партнёров продолжает расти, следи за новостями!
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalAssortment;
