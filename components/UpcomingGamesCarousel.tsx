"use client";

import { Game, GameCard } from "./GameCard";
import { EmblaCarousel } from "./EmblaCarousel";

export function UpcomingGamesCarousel({ games }: { games: Game[] }) {
  return (
    <EmblaCarousel ariaLabel="Carrusel de merces">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </EmblaCarousel>
  );
}
