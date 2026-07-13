import Icon from "@/shared/icon";
import Link from "next/link";

const OurAdvantages = () => {
  return (
    <section className="relative px-[3.733vw] mt-[1.067vw]">
      <Link
        className="flex justify-between items-center h-[10.667vw] px-[2.667vw] rounded-t-[1.067vw]"
        style={{
          background:
            "radial-gradient(116.95% 340% at 54.47% 90.13%, rgba(146, 236, 237, 0.036) 0%, rgba(20, 211, 211, 0.27) 63.11%)",
        }}
        href="/about-us"
      >
        <div className="mr-[4.267vw] relative font-bold font-roboto_condensed text-[3.2vw] leading-[normal]">
          <div>O</div>
          <div className="relative">ДЭВУ</div>
          <span className="absolute bg-teal-300 w-[1.333vw] h-[4.533vw] -bottom-px left-1/2 -translate-x-1/2 rotate-40 -z-1" />
        </div>
        <div className="grid grid-cols-2 items-center gap-x-[4.267vw] gap-y-[0.8vw] flex-1 text-[2.4vw] leading-[normal]">
          <div className="flex items-center gap-1">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/194b22c9-776a-c541-d98a-7ee07f484c5c-72-72.png?x-oss-process=image/format,webp"
              alt=""
              className="w-[3.2vw] h-[3.2vw]"
            />
            Аутентификация
          </div>
          <div className="flex items-center gap-1">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/3d5b56b3-fe45-1a18-1d1d-bdccb34499ef-72-72.png"
              alt=""
              className="w-[3.2vw] h-[3.2vw]"
            />
            Лучшая цена
          </div>
          <div className="flex items-center gap-1">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/095fafc1-ecba-8644-d917-d3c3cb11e01d-72-72.png?x-oss-process=image/format,webp"
              alt=""
              className="w-[3.2vw] h-[3.2vw]"
            />
            Безусловный возврат
          </div>
          <div className="flex items-center gap-1">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/a7d34829-06f9-7e6a-e221-0f1d8e726e73-72-72.png?x-oss-process=image/format,webp"
              alt=""
              className="w-[3.2vw] h-[3.2vw]"
            />
            Глобальный выбор
          </div>
        </div>
        <Icon
          icon={"chevron-right"}
          className="text-slate-500 w-[3.2vw] h-[3.2vw]"
        />
      </Link>
    </section>
  );
};

export default OurAdvantages;
