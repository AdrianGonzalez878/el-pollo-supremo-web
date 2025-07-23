"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Game, GameCard } from './GameCard';

export function UpcomingGamesCarousel({ games }: { games: Game[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  // State to track if buttons should be disabled
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // Functions to scroll
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Function to check button states on selection
  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  // Effect to set up the event listener
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* The carousel viewport with the ref */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {games.map((game) => (
            <div className="embla__slide" key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      {/* The buttons are outside the overflow-hidden div, but inside the relative one */}
      <button
        className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 p-2 bg-white/70 rounded-full shadow-md disabled:opacity-0"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous game"
      >
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 p-2 bg-white/70 rounded-full shadow-md disabled:opacity-0"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next game"
      >
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}