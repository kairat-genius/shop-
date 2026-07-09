"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(
      `(max-width: ${breakpoint - 1}px)`
    );

    const updateValue = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateValue();

    mediaQuery.addEventListener("change", updateValue);

    return () => {
      mediaQuery.removeEventListener("change", updateValue);
    };
  }, [breakpoint]);

  return isMobile;
}