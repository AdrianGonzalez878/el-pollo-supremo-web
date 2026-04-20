import Link from "next/link";
import type { Game } from "@/components/GameCard";
import { PremiosMarkdown } from "@/components/PremiosMarkdown";
import { fetchPartidos } from "@/lib/sanity/loaders";
import { getMerceDateParts, groupGamesByYear } from "@/lib/calendar-date";

export const revalidate = 120;

function TournamentRow({ game }: { game: Game }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isUpcoming = new Date(game.rawDate) >= today;
  const { weekday, dayMonth, year } = getMerceDateParts(game.rawDate);

  return (
    <div className="bg-card-dark rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all border border-white/5 hover:border-dorado-el-pollo/25 hover:bg-gray-900/40 hover:shadow-xl">
      <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-2">
        <div
          className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-black/50 to-black/30 border border-dorado-el-pollo/30 px-4 py-3 min-w-[5.75rem] shadow-inner"
          aria-label={`Fecha: ${game.date}`}
        >
          <span className="text-[0.65rem] font-bold tracking-[0.14em] text-dorado-el-pollo/95 uppercase">
            {weekday}
          </span>
          <span className="text-lg font-extrabold text-white leading-tight mt-0.5">
            {dayMonth}
          </span>
          <span className="text-sm font-bold text-dorado-el-pollo mt-1 tabular-nums">
            {year}
          </span>
        </div>
        <p className="text-sm text-gray-400 tabular-nums">{game.time}</p>
      </div>

      <div className="flex-grow min-w-0">
        <p className="font-bold text-white text-lg md:text-xl leading-snug">{game.tournament}</p>
        <p className="text-gray-300 text-sm md:text-base mt-1">{game.location}</p>
      </div>

      {(game.equipo_ganador || game.premios) && (
        <div className="flex-shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-700 mt-4 md:mt-0 pt-4 md:pt-0 md:pl-6 text-left">
          {game.equipo_ganador && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500 text-lg">{"\u{1F3C6}"}</span>
              <p className="font-semibold text-dorado-el-pollo-claro">
                Ganador: {game.equipo_ganador}
              </p>
            </div>
          )}
          {game.premios && (
            <div className="premios-markdown__shell mt-2 first:mt-0 max-w-xl">
              <p className="premios-markdown__label">Premios</p>
              <PremiosMarkdown content={game.premios} />
            </div>
          )}
        </div>
      )}

      <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 md:pl-4">
        {isUpcoming ? (
          <div className="text-center bg-gray-700 text-gray-400 font-bold py-2 px-4 rounded-md cursor-not-allowed">
            Próximamente
          </div>
        ) : (
          game.merce_link && (
            <Link
              href={game.merce_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-bold py-2 px-4 rounded-md hero-button"
            >
              Ver la Merce
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default async function CalendarPage() {
  const allGames = await fetchPartidos();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGames = allGames
    .filter((game) => new Date(game.rawDate) >= today)
    .sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());
  const pastGames = allGames
    .filter((game) => new Date(game.rawDate) < today)
    .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

  const upcomingByYear = groupGamesByYear(upcomingGames, "asc");
  const pastByYear = groupGamesByYear(pastGames, "desc");

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dorado-el-pollo text-center mb-3">
          Calendario de Merces
        </h1>
        <p className="text-center text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-12">
          Fechas con año para ubicar cada torneo en el historial del básquet oaxaqueño.
        </p>

        <section className="mb-16 title-container">
          <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-dorado-el-pollo/30 pb-2 mb-6 text-white title">
            Próximas Merces
          </h2>
          {upcomingGames.length > 0 ? (
            <div className="space-y-10">
              {upcomingByYear.map(({ year, games }) => (
                <div key={year}>
                  {upcomingByYear.length > 1 && (
                    <h3 className="text-sm font-bold tracking-widest text-dorado-el-pollo/80 uppercase mb-3">
                      {year}
                    </h3>
                  )}
                  <div className="space-y-4">
                    {games.map((game) => (
                      <TournamentRow key={game.id} game={game} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hay torneos programados próximamente.</p>
          )}
        </section>

        <section className="title-container">
          <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-dorado-el-pollo/30 pb-2 mb-6 text-white title">
            Merces Pasadas
          </h2>
          {pastGames.length > 0 ? (
            <div className="space-y-12">
              {pastByYear.map(({ year, games }) => (
                <div key={year}>
                  <h3 className="sticky top-0 z-10 -mx-2 px-2 py-2 mb-4 text-lg font-extrabold text-dorado-el-pollo bg-negro-el-pollo/90 border-b border-dorado-el-pollo/20 backdrop-blur-sm">
                    {year}
                  </h3>
                  <div className="space-y-4">
                    {games.map((game) => (
                      <TournamentRow key={game.id} game={game} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Aún no hay historial de torneos pasados.</p>
          )}
        </section>
      </div>
    </div>
  );
}
