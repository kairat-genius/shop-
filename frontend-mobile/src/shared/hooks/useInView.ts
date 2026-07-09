/* eslint-disable unicorn/prefer-global-this */
import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
  loadOnIdle?: boolean;
}

export function useInView(options?: UseInViewOptions) {
  const { rootMargin = "200px 0px", threshold = 0, loadOnIdle = true } = options || {};
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    if (ref.current) observer.observe(ref.current);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let id: any;
    
    if (loadOnIdle) {
      const triggerLoad = () => {
        setIsInView(true);
        observer.disconnect();
      };

      // eslint-disable-next-line unicorn/prefer-ternary
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id = (window as any).requestIdleCallback(() => triggerLoad(), { timeout: 2000 });
      } else {
        id = setTimeout(triggerLoad, 200);
      }
    }

    return () => {
      observer.disconnect();
      if (id) {
        if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).cancelIdleCallback(id);
        } else {
          clearTimeout(id);
        }
      }
    };
  }, [rootMargin, threshold, loadOnIdle, isInView]);

  return { ref, isInView };
}