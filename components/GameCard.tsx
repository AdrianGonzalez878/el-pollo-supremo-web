"use client";

import Link from 'next/link';
import { PremiosMarkdown } from '@/components/PremiosMarkdown';

export interface Game {
  id: string;
  date: string;
  time: string;
  rawDate: string;
  tournament: string;
  location: string;
  merce_link?: string;
  premios?: string;
  equipo_ganador?: string;
}

export function GameCard({ game }: { game: Game }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isUpcoming = new Date(game.rawDate) >= today;
  const isInteractive = !!(game.merce_link);

  const cardContent = (
    <>
      <div className="p-4 sm:p-6 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-dorado-el-pollo">{game.date}</span>
          <span className="text-xs text-gray-400">{game.time}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-dorado-el-pollo transition-colors leading-snug">{game.tournament}</h3>
        <p className="text-gray-300 mt-1 text-sm">{game.location}</p>

        {(game.equipo_ganador || game.premios) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            {game.equipo_ganador && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-500 text-xl" aria-hidden="true">🏆</span>
                <p className="font-bold text-dorado-el-pollo-claro">Ganador: {game.equipo_ganador}</p>
              </div>
            )}
            {game.premios && (
              <div className="premios-markdown__shell mt-1">
                <p className="premios-markdown__label">Premios</p>
                <PremiosMarkdown content={game.premios} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-black/20 mt-auto">
        <p className="p-3 text-center font-semibold text-dorado-el-pollo-claro group-hover:text-white transition-colors">
          {isUpcoming ? "Próximamente" : (game.merce_link ? "Ver la Merce" : "Resultados")}
        </p>
      </div>
    </>
  );

  const cardClass = `flex flex-col rounded-lg shadow-lg overflow-hidden transition-all duration-300 group h-full
    ${game.equipo_ganador ? 'bg-card-dark border-2 border-dorado-el-pollo' : 'bg-card-dark'}
    ${isInteractive ? 'hover:scale-105' : ''}`;

  if (isInteractive) {
    return (
      <Link
        href={game.merce_link!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver la merce: ${game.tournament} — ${game.date}`}
        className={cardClass}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      className={cardClass}
      aria-label={`${game.tournament} — ${game.date}${isUpcoming ? ' (próximamente)' : ''}`}
    >
      {cardContent}
    </div>
  );
}