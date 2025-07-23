// components/FeaturedVideosCarousel.tsx
"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Video, VideoCard } from './VideoCard';

export function FeaturedVideosCarousel({ videos }: { videos: Video[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {videos.map((video) => (
            <div className="embla__slide" key={video.id}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 p-2 bg-white/70 rounded-full shadow-md disabled:opacity-0"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous video"
      >
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 p-2 bg-white/70 rounded-full shadow-md disabled:opacity-0"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next video"
      >
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}