import { cn } from "@/shared/utils/clsx";
import type { ReactNode } from "react";

interface ProductCardSkeletonProps {
  className?: string;
  children?: ReactNode;
}

export const ProductCardSkeleton = ({
  className,
  children,
}: ProductCardSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse border border-gray-250 px-2.5 py-3.75 md:py-5 relative h-full flex flex-col gap-4",
        className,
      )}
    >
      <div className="bg-gray-200 aspect-square h-full w-full" />
      <div className="flex flex-col gap-2.5 justify-center items-center">
        <div className="w-25 h-[16.8px] md:h-[21.59px] bg-gray-200" />
        <div className="w-[90%] h-7.5 md:h-[32.5px] bg-gray-200" />
        <div className="w-15 h-4 md:h-5 bg-gray-200" />
      </div>
      <div className="w-6 h-6 bg-gray-200 absolute bottom-3.75 md:bottom-5 right-3.75 md:right-5" />
      {children}
    </div>
  );
};
