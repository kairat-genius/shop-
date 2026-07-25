import { TIMELINE_EVENTS } from "../data/timeline.data";

const BrandHistory = () => {
  return (
    <section className="py-[6.4vw] px-[3.733vw] scroll-mt-[18vw]" id="history">
      <div className="relative">
        <img
          className="w-full h-[24.533vw] rounded-sm"
          src="https://cdn-img.thepoizon.ru/node-common/5e4d5b2f-cbc3-1632-4d66-1c6332319105-3600-576.png?x-oss-process=image/resize,s_1280/format,webp"
          alt="brand history"
        />

        <div className="text-[6.4vw] absolute left-[3.733vw] top-[3.733vw] text-white font-roboto_condensed font-bold z-1">
          История бренда
        </div>
      </div>
      <div className="mt-[4.267vw]">
        {TIMELINE_EVENTS.map((item, index) => (
          <div key={index} className="flex">
            <div className="text-[3.733vw] w-10.5 font-bold font-roboto_condensed leading-[normal] shrink-0">
              {item.year}
            </div>

            <div className="flex flex-col w-[3.733vw] mr-[2.133vw] ml-[.533vw] items-center flex-none">
              <img
                className="max-w-none w-[3.733vw] h-[3.733vw] object-contain"
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
            <div className="pb-[2.133vw] leading-[4.267vw] text-[2.933vw] font-light text-slate-500">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandHistory;
