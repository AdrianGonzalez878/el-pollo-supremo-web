"use client";

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export interface Game {
  id: number;
  date: string;
  time: string;
  rawDate: string; // Es crucial tener la fecha original para comparar
  tournament: string;
  location: string;
  merce_link?: string;
  premios?: string;
  equipo_ganador?: string;
}

export function GameCard({ game }: { game: Game }) {
  const linkHref = game.merce_link || '#'; // Si no hay link, no va a ningún lado

  // Lógica para determinar si el partido es futuro
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizamos a la medianoche para una comparación justa
  const isUpcoming = new Date(game.rawDate) >= today;

  return (
    // La tarjeta entera sigue siendo un enlace
    <Link
      href={linkHref}
      target={game.merce_link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      // El enlace se desactiva si es un torneo futuro sin link
      className={`flex flex-col rounded-lg shadow-lg overflow-hidden transition-all duration-300 group h-full
                  ${game.equipo_ganador ? 'bg-card-dark border-2 border-dorado-el-pollo' : 'bg-card-dark'}
                  ${!game.merce_link && isUpcoming ? 'pointer-events-none' : 'hover:scale-105'}`}
    >
      {/* Contenido principal */}
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-dorado-el-pollo">{game.date}</span>
          <span className="text-sm text-gray-400">{game.time}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-dorado-el-pollo transition-colors">{game.tournament}</h3>
        <p className="text-gray-300 mt-1">{game.location}</p>

        {/* Sección de Ganador y Premios */}
        {(game.equipo_ganador || game.premios) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            {game.equipo_ganador && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-500 text-xl">🏆</span>
                <p className="font-bold text-dorado-el-pollo-claro">Ganador: {game.equipo_ganador}</p>
              </div>
            )}
            {game.premios && (
              <div className="text-sm">
                <p className="font-semibold text-gray-300 mb-1">Premios:</p>
                <div className="prose prose-sm prose-invert">
                  <ReactMarkdown>{game.premios}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Pie de tarjeta con lógica condicional */}
      <div className="bg-black/20 mt-auto">
        <p className="p-3 text-center font-semibold text-dorado-el-pollo-claro group-hover:text-white transition-colors">
          {isUpcoming ? "Próximamente" : (game.merce_link ? "Ver la Merce" : "Resultados")}
        </p>
      </div>
    </Link>
  );
}