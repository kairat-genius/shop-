"use client";
import type { IconName } from "./type";
import type { SVGProps } from "react";
import { cn } from "../utils/clsx";

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;
  className?: string;
}

const Icon = ({ icon, className, ...props }: IconProps) => {
  return (
    <svg className={cn("icon shrink-0", className)} {...props}>
      <use xlinkHref={`/static-media/sprites.svg#${icon}`} />
    </svg>
  );
};

export default Icon;
