"use client";
import { type ReactNode, Suspense } from "react";
import { useInView } from "@/shared/hooks/useInView";

interface LazySectionProps {
  children: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  rootMargin?: string;
}

export const LazySection = ({
  children,
  placeholder = <div className="h-220" />,
  className,
  rootMargin
}: LazySectionProps) => {
  const { ref, isInView } = useInView({rootMargin});

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <Suspense fallback={placeholder}>{children}</Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
};
