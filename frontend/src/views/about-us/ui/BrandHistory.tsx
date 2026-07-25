import { TIMELINE_EVENTS } from "../data/timeline.data";

const BrandHistory = () => {
  return (
    <section className="max-w-[72rem] w-full mx-auto px-[6rem] py-10">
      <div className="relative">
        <img
          className="w-full h-[9.65rem] object-contain"
          src="https://cdn-img.thepoizon.ru/node-common/5e4d5b2f-cbc3-1632-4d66-1c6332319105-3600-576.png?x-oss-process=image/resize,s_1280/format,webp"
          alt="brand history"
        />

        <div className="text-[1.5rem] absolute left-[1.2rem] top-6 text-white font-roboto_condensed font-bold z-1">
          История бренда
        </div>
      </div>
      <div className="mt-5">
        {TIMELINE_EVENTS.map((item, index) => (
          <div key={index} className="flex gap-[.4rem]">
            <div className="text-[24px] w-15.5 font-bold font-roboto_condensed leading-[normal] shrink-0">
              {item.year}
            </div>

            <div className="flex flex-col w-[1.1rem] items-center flex-none">
              <img
                className="max-w-none w-5.5 h-5.5 object-contain"
                src="https://cdn-img.thepoizon.ru/node-common/2103e152-f71e-06ff-6f19-5cabfc31ef64.svg"
                alt=""
              />

              <div
                className="flex-1 w-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(180deg, rgba(199, 199, 215, .5) 0, rgba(199, 199, 215, .5) 2px, transparent 2px, transparent 4px)",
                }}
              />
            </div>
            <div className="pb-[1rem] leading-5.5 text-[14px] font-light text-slate-500">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandHistory;
