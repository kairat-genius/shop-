"use client";
import { useEffect, useRef } from "react";

interface LoadMoreSentinelProps {
  onIntersect: () => void;
  disabled?: boolean;
  /** Насколько заранее начинать загрузку. Больше — раньше. */
  rootMargin?: string;
}

export const LoadMoreSentinel = ({
  onIntersect,
  disabled,
  rootMargin = "800px",
}: LoadMoreSentinelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cbRef = useRef(onIntersect);

  useEffect(() => {
    cbRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) cbRef.current();
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [disabled, rootMargin]);

  return <div ref={ref} className="h-px w-full" aria-hidden />;
};