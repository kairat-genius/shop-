"use client";

import Icon from "@/shared/icon";
import { cn } from "@/shared/utils/clsx";
import { useRef, useState } from "react";

interface CustomerReviewVideoProps {
  poster: string;
  video: string;
}

const CustomerReviewVideo = ({
  poster,
  video,
}: CustomerReviewVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);

    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };

  return (
    <div className="relative h-100 w-77 overflow-hidden rounded-sm bg-slate-150">
      {!isPlaying && (
        <>
          <img
            className="h-full w-full object-cover"
            src={poster}
            alt="poster"
          />

          <button
            type="button"
            onClick={handlePlayClick}
            className="absolute left-1/2 top-1/2 h-[2.8rem] w-[2.8rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Icon icon="play" className="h-full w-full" />
          </button>
        </>
      )}

      <video
        ref={videoRef}
        preload="auto"
        className={cn(
          "h-full w-full object-contain",
          isPlaying ? "block" : "hidden",
        )}
        muted
        controls
      >
        <source src={video} />
      </video>
    </div>
  );
};

export default CustomerReviewVideo;