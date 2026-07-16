import Icon from "@/shared/icon";
import Link from "next/link";

const OurAdvantages = () => {
  return (
    <section className="relative container mt-[1.5rem]">
      <Link
        className="flex justify-between items-center gap-[1.2rem] py-[.8rem] rounded-lg pl-[1.7rem] pr-[1.3rem]"
        style={{
          background:
            "radial-gradient(69.74% 374.87% at 22.62% 125%, #d6ffff 0, #ebffff 63.11%)",
        }}
        href="/about-us"
      >
        <div className="absolute inset-be-0 inset-e-[100px]">
          <img
            src="https://cdn-img.thepoizon.ru/node-common/f17b0f9b-9943-1170-7305-e0dd4c85058b-294-189.png?x-oss-process=image/format,webp"
            alt=""
            width={98}
            height={63}
          />
        </div>
        <div className="text-[1.2rem] leading-[normal] font-bold font-roboto_condensed">
          O ДЭВУ
        </div>
        <div className="flex items-center gap-6 flex-1 z-1">
          <div className="flex items-center gap-[.4rem]">
            <img
              width={24}
              height={24}
              src="https://cdn-img.thepoizon.ru/node-common/194b22c9-776a-c541-d98a-7ee07f484c5c-72-72.png?x-oss-process=image/format,webp"
              alt=""
            />
            <div className="text-[16px] leading-[normal]">Аутентификация</div>
          </div>
          <div className="w-0.75 h-0.75 bg-slate-400" />
          <div className="flex items-center gap-[.4rem]">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/3d5b56b3-fe45-1a18-1d1d-bdccb34499ef-72-72.png"
              alt=""
              width={24}
              height={24}
            />
            <div className="text-[16px] leading-[normal]">Лучшая цена</div>
          </div>
          <div className="w-0.75 h-0.75 bg-slate-400" />
          <div className="flex items-center gap-[.4rem]">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/095fafc1-ecba-8644-d917-d3c3cb11e01d-72-72.png?x-oss-process=image/format,webp"
              alt=""
              width={24}
              height={24}
            />
            <div className="text-[16px] leading-[normal]">
              Безусловный возврат
            </div>
          </div>
          <div className="w-0.75 h-0.75 bg-slate-400" />
          <div className="flex items-center gap-[.4rem]">
            <img
              src="https://cdn-img.thepoizon.ru/node-common/a7d34829-06f9-7e6a-e221-0f1d8e726e73-72-72.png?x-oss-process=image/format,webp"
              alt=""
              width={24}
              height={24}
            />
            <div className="text-[16px] leading-[normal]">Глобальный выбор</div>
          </div>
        </div>
        <Icon
          icon={"chevron-right"}
          width={16}
          height={16}
          className="shrink-0"
        />
        <img
          className="absolute"
          style={{
            insetInlineEnd: 0,
            insetBlockStart: 0,
            transform: "translateY(-22px)",
          }}
          width={40}
          height={32}
          src="https://cdn-img.thepoizon.ru/node-common/95305786-b2c3-a957-5a11-3af50082e7e5-120-96.png?x-oss-process=image/format,webp"
          alt=""
        />
      </Link>
    </section>
  );
};

export default OurAdvantages;
