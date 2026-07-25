"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tabs } from "../data/about-us-tabs.data";
import { cn } from "@/shared/utils/clsx";

const scrollToSection = (id: string) => {
  document
    .querySelector(`#${CSS.escape(id)}`)
    ?.scrollIntoView({ behavior: "auto" });
};

const AboutUsNav = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [indicatorX, setIndicatorX] = useState(0);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const updateNav = useCallback(() => {
    const container = tabsContainerRef.current;
    const indicator = indicatorRef.current;
    const activeButton = tabRefs.current[activeTab];

    if (!container || !indicator || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const indicatorWidth = indicator.offsetWidth;

    const indicatorLeft =
      buttonRect.left -
      containerRect.left +
      container.scrollLeft +
      buttonRect.width / 2 -
      indicatorWidth / 2;

    setIndicatorX(indicatorLeft);

    const buttonCenter =
      buttonRect.left -
      containerRect.left +
      container.scrollLeft +
      buttonRect.width / 2;

    const targetScroll = buttonCenter - container.clientWidth / 2;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, [activeTab]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let visibleId = "";

      for (const entry of entries) {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > maxRatio
        ) {
          maxRatio = entry.intersectionRatio;
          visibleId = entry.target.id;
        }
      }

      if (visibleId && visibleId !== activeTab) {
        setActiveTab(visibleId);
      }
    },
    [activeTab],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-10% 0px -80% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8],
    });

    const elements = tabs
      .map((tab) =>
        document.querySelector<HTMLElement>(`#${CSS.escape(tab.id)}`),
      )
      .filter((el): el is HTMLElement => el !== null);

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    requestAnimationFrame(updateNav);
  }, [updateNav]);

  useEffect(() => {
    const handleResize = () => requestAnimationFrame(updateNav);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateNav]);

  return (
    <div className="sticky top-[12.7vw] z-10 bg-white">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[8vw]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[8vw]" />

        <div
          ref={tabsContainerRef}
          className="scrollbar-none relative flex items-center overflow-x-auto px-[2.133vw]"
          role="tablist"
        >
          <div
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[0.533vw] w-[8.533vw] rounded-[0.533vw] bg-slate-950 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${indicatorX}px,0,0)`,
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => scrollToSection(tab.id)}
              className="px-[1.6vw]"
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <div
                className={cn(
                  "min-w-max pb-[2.133vw] pt-[2.667vw] text-[2.933vw] leading-normal transition-colors duration-200",
                  activeTab === tab.id
                    ? "font-medium text-slate-950"
                    : "text-slate-500",
                )}
              >
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsNav;