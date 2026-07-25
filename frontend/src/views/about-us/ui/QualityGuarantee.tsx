"use client";

import { cn } from "@/shared/utils/clsx";
import { useRef, useState } from "react";

const QualityGuarantee = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };
  return (
    <section className="bg-slate-150 py-20">
      <div className="max-w-[72rem] w-full mx-auto px-[6rem]">
        <div className="text-[2.5rem] font-roboto_condensed font-bold leading-[normal]">
          Гарантия <span className="text-teal-400">оригинала и качества</span>
        </div>
        <div className="border-t border-slate-400 flex gap-[1.2rem] mt-10 pt-10">
          <div className="text-[2rem] leading-none font-roboto_condensed font-bold">
            Передовые
            <span className="text-teal-400">
              технологии и команда экспертов
            </span>
          </div>
          <div className="w-[35rem] h-[19.5rem] relative shrink-0 overflow-hidden">
            {!isPlaying && (
              <>
                <img
                  className="w-full h-full object-cover"
                  src="https://cdn-img.thepoizon.ru/node-common/aa77216c-6429-33be-cfba-d020686bdef2-2560-1440.png?x-oss-process=image/resize,s_1280/format,webp"
                  alt="poster"
                />
                <button
                  onClick={handlePlayClick}
                  className="absolute w-[6rem] h-[6rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <img
                    className="w-full h-full"
                    src="https://cdn-img.thepoizon.ru/node-common/ef6f2c56-e381-37cc-ae8f-87258c5f08f2-300-300.png?x-oss-process=image/resize,s_96/format,webp"
                    alt="play"
                  />
                </button>
              </>
            )}

            <video
              ref={videoRef}
              className={cn(
                "w-full h-full object-cover",
                isPlaying ? "block" : "hidden",
              )}
              preload="auto"
              muted
              controls
            >
              <source src="https://videocdn2.poizonapp.com/app/video/fa21e518-d9f0-3926-15db-948352f01ebb.mp4" />
            </video>
          </div>
        </div>
        <div className="border-t border-slate-400 flex gap-[2.05rem] mt-10 pt-10">
          <div>
            <div className="text-[2rem] leading-none font-bold font-roboto_condensed">
              НАБОР{" "}
              <span className="text-teal-400">ДЛЯ ЗАЩИТЫ ОТ ПОДДЕЛОК</span>
            </div>
            <div className="text-[1rem] mt-6 font-light leading-normal">
              Каждая коробка содержит эксклюзивный набор для защиты от подделок
              POIZON(ДЭВУ). Отсканируй QR-код на бирке и сертификате
              POIZON(ДЭВУ), чтобы узнать подробности.
            </div>
          </div>

          <img
            className="w-[35rem] h-[21.45rem]"
            src="https://cdn-img.thepoizon.ru/node-common/ab7a61c1-7f72-2067-53dc-c5b7fe2561e3-2100-1290.png?x-oss-process=image/resize,s_1280/format,webp"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default QualityGuarantee;
