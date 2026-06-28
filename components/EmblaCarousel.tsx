"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Props {
  children: React.ReactNode[];
  slideClassName?: string;
  ariaLabel?: string;
}

export function EmblaCarousel({ children, slideClassName = "embla__slide", ariaLabel = "Carrusel" }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const ArrowIcon = ({ dir }: { dir: "prev" | "next" }) => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );

  return (
    <div aria-label={ariaLabel}>
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {children.map((child, index) => (
            <div className={slideClassName} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls: arrows (hidden on mobile) + dots */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {/* Prev arrow — hidden on mobile, visible on md+ */}
        <button
          onClick={scrollPrev}
          disabled={prevDisabled}
          aria-label="Anterior"
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-400 hover:border-dorado-el-pollo hover:text-dorado-el-pollo transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ArrowIcon dir="prev" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Diapositivas">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-label={`Diapositiva ${index + 1}`}
              aria-selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 h-2.5 bg-dorado-el-pollo"
                  : "w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Next arrow — hidden on mobile, visible on md+ */}
        <button
          onClick={scrollNext}
          disabled={nextDisabled}
          aria-label="Siguiente"
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-400 hover:border-dorado-el-pollo hover:text-dorado-el-pollo transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ArrowIcon dir="next" />
        </button>
      </div>

      {/* Mobile swipe hint — only shows when there are multiple slides */}
      {scrollSnaps.length > 1 && (
        <p className="mt-3 text-center text-xs text-gray-600 md:hidden select-none">
          ← desliza para ver más →
        </p>
      )}
    </div>
  );
}
