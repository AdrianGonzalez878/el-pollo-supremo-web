import Link from "next/link";
import { Game } from "./GameCard";
import { UpcomingGamesCarousel } from "./UpcomingGamesCarousel";
import { fetchPartidosLimited } from "@/lib/sanity/loaders";

export async function UpcomingGames() {
  const games = await fetchPartidosLimited();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastGames = games.filter((game) => new Date(game.rawDate) < today);
  const upcomingGames = games.filter((game) => new Date(game.rawDate) >= today);

  pastGames.sort(
    (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime(),
  );

  upcomingGames.sort(
    (a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime(),
  );

  const sortedGames: Game[] = [...pastGames, ...upcomingGames];

  return (
    <section className="py-12 bg-negro-el-pollo">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 title-container">
          <h2 className="text-3xl md:text-4xl font-bold text-white title">
            Revive las ultimas Merces
          </h2>
          <p className="text-white mt-2 subtitle">¡Desliza para ver los encuentros!</p>
        </div>

        {sortedGames.length > 0 ? (
          <UpcomingGamesCarousel games={sortedGames} />
        ) : (
          <p className="text-center text-gray-400">No hay partidos disponibles.</p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/calendario"
            className="main-button font-bold py-3 px-8 rounded-full text-lg"
          >
            Ver Calendario Completo
          </Link>
        </div>
      </div>
    </section>
  );
}
