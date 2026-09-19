"use client";

import { cn } from "@/shared/utils/clsx";
import { useRef, useState } from "react";

const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };
  return (
    <section className="h-[380px] w-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-[-16px] z-0 bg-[url('https://cdn-img.thepoizon.ru/node-common/ca04dfef-45d0-2541-32bc-f99e09139013-2752-1536.png')] bg-[length:100%_auto] bg-center bg-no-repeat blur-[12px]" />
      <div className="w-[675px] h-[380px] relative shrink-0 z-2 overflow-hidden">
        {!isPlaying && (
          <>
            <img
              className="w-full h-full object-cover"
              src="https://cdn-img.thepoizon.ru/node-common/ca04dfef-45d0-2541-32bc-f99e09139013-2752-1536.png?x-oss-process=image/resize,s_1280/format,webp"
              alt="poster"
            />
            <button
              onClick={handlePlayClick}
              className="absolute w-[3.2rem] h-[3.2rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
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
            "w-full h-full object-contain",
            isPlaying ? "block" : "hidden",
          )}
          preload="auto"
          muted
          controls
        >
          <source src="https://h5cdn.dewu.com/app/video/eb79008a-d9d4-e1ba-0fda-98debe85a430.mp4" />
        </video>
      </div>
      <div className="bg-[rgba(0,0,0,.6)] absolute inset-0 z-1"/>
    </section>
  );
};

export default Banner;
