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
    <section className="py-16 bg-negro-el-pollo">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-heading section-heading--center text-3xl md:text-4xl font-bold text-white">
            Revive las Últimas Merces
          </h2>
          <p className="text-gray-400 mt-4">¡Desliza para ver los encuentros!</p>
        </div>

        {sortedGames.length > 0 ? (
          <UpcomingGamesCarousel games={sortedGames} />
        ) : (
          <p className="text-center text-gray-400">No hay partidos disponibles.</p>
        )}

        <div className="text-center mt-14">
          <Link
            href="/calendario"
            className="btn-gold py-3 px-8 rounded-full text-base font-bold shadow-lg shadow-dorado-el-pollo/20"
          >
            Ver Calendario Completo
          </Link>
        </div>
      </div>
    </section>
  );
}
