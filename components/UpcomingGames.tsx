import Link from 'next/link';
import { Game } from './GameCard';
import { UpcomingGamesCarousel } from './UpcomingGamesCarousel';

const STRAPI_URL = 'http://localhost:1337';

async function getGames(): Promise<Game[]> {
  try {
    const endpoint = `${STRAPI_URL}/api/partidos`;
    // We fetch all games without a specific sort from the API
    const params =
      `?pagination[limit]=20` + // Get more games to have enough for both past and future
      `&fields[0]=tournament&fields[1]=location&fields[2]=date&fields[3]=time&fields[4]=merce_link&fields[5]=premios&fields[6]=equipo_ganador`;
    
    const res = await fetch(endpoint + params);
    if (!res.ok) throw new Error('Failed to fetch games');

    const jsonResponse = await res.json();
    const games = jsonResponse.data.filter((game: any) => game);

    const formattedGames: Game[] = games.map((game: any) => {
      const gameDate = new Date(game.date);
      return {
        id: game.id,
        tournament: game.tournament,
        location: game.location,
        rawDate: game.date,
        date: gameDate.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase(),
        time: game.time.substring(0, 5) + ' HRS',
        merce_link: game.merce_link,
        premios: game.premios,
        equipo_ganador: game.equipo_ganador,
      };
    });
    return formattedGames;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

export async function UpcomingGames() {
  const games = await getGames();

  // --- CUSTOM SORTING LOGIC ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Separate games into two lists: past and future
  const pastGames = games.filter(game => new Date(game.rawDate) < today);
  const upcomingGames = games.filter(game => new Date(game.rawDate) >= today);

  // 2. Sort past games from newest to oldest
  pastGames.sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

  // 3. Sort upcoming games from oldest to newest (closest to today first)
  upcomingGames.sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

  // 4. Join the lists: past games first, then upcoming games
  const sortedGames = [...pastGames, ...upcomingGames];

  return (
    <section className="py-12 bg-negro-el-pollo">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 title-container">
          <h2 className="text-3xl md:text-4xl font-bold text-white title">
            Revive las ultimas Merces
          </h2>
          <p className="text-white mt-2 subtitle">
            ¡Desliza para ver los encuentros!
          </p>
        </div>

        {sortedGames.length > 0 ? (
          // Pass the final, custom-sorted array to the carousel
          <UpcomingGamesCarousel games={sortedGames} />
        ) : (
          <p className="text-center text-gray-400">No hay partidos disponibles.</p>
        )}

        <div className="text-center mt-12">
          <Link href="/calendario" className="main-button font-bold py-3 px-8 rounded-full text-lg">
            Ver Calendario Completo
          </Link>
        </div>
      </div>
    </section>
  );
}