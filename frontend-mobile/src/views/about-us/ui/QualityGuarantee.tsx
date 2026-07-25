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
    <section className="py-[6.4vw] px-[3.733vw] scroll-mt-[18vw]" id="authentication">
      <div className="text-[6.4vw] font-roboto_condensed font-bold leading-none">
        Гарантия
        <br /> <span className="text-teal-400">оригинала и качества</span>
      </div>
      <div className="mt-[5.333vw]">
        <div className="text-[4.8vw] leading-[normal] font-roboto_condensed font-bold mb-[3.2vw]">
          Передовые <br />
          <span className="text-teal-400">технологии и команда экспертов</span>
        </div>
        <div className="w-full h-[51.467vw] rounded-[1.067vw] relative shrink-0 overflow-hidden">
          {!isPlaying && (
            <>
              <img
                className="w-full h-full object-cover"
                src="https://cdn-img.thepoizon.ru/node-common/aa77216c-6429-33be-cfba-d020686bdef2-2560-1440.png?x-oss-process=image/resize,s_1280/format,webp"
                alt="poster"
              />
              <button
                onClick={handlePlayClick}
                className="absolute w-[10.667vw] h-[10.667vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
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
      <div className="mt-[5.333vw]">
        <div className="text-[4.8vw] leading-[normal] font-bold font-roboto_condensed">
          НАБОР <span className="text-teal-400">ДЛЯ ЗАЩИТЫ ОТ ПОДДЕЛОК</span>
        </div>
        <div className="text-[3.2vw] mt-[2.133vw] font-light leading-normal">
          Каждая коробка содержит эксклюзивный набор для защиты от подделок
          POIZON(ДЭВУ). Отсканируй QR-код на бирке и сертификате POIZON(ДЭВУ),
          чтобы узнать подробности.
        </div>

        <img
          className="w-full h-[56.8vw] mt-[2.133vw]"
          src="https://cdn-img.thepoizon.ru/node-common/ab7a61c1-7f72-2067-53dc-c5b7fe2561e3-2100-1290.png?x-oss-process=image/resize,s_1280/format,webp"
          alt=""
        />
      </div>
    </section>
  );
};

export default QualityGuarantee;
