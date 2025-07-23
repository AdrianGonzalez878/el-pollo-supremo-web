import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Game {
  id: number;
  date: string;
  time: string;
  rawDate: string;
  tournament: string;
  location: string;
  merce_link?: string;
  premios?: string;
  equipo_ganador?: string;
}

const STRAPI_URL = 'http://localhost:1337';

// Your working function - NO CHANGES MADE HERE
async function getAllGames(): Promise<Game[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/partidos?sort=date:desc&populate=*`);
    if (!res.ok) throw new Error('Failed to fetch data from Strapi');
    
    const jsonResponse = await res.json();
    const partidos = jsonResponse.data.filter((partido: any) => partido);
    
    const formattedGames: Game[] = partidos.map((partido: any) => {
      const gameDate = new Date(partido.date);
      return {
        id: partido.id,
        tournament: partido.tournament,
        location: partido.location,
        rawDate: partido.date,
        date: gameDate.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase(),
        time: partido.time.substring(0, 5) + ' HRS',
        merce_link: partido.merce_link,
        premios: partido.premios,
        equipo_ganador: partido.equipo_ganador,
      };
    });
    return formattedGames;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

// --- START OF RESPONSIVE STYLE CHANGES ---
function TournamentRow({ game }: { game: Game }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isUpcoming = new Date(game.rawDate) >= today;

  return (
    // Padding adjusted for mobile
    <div className="bg-card-dark rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-gray-800/50 hover:shadow-2xl">
      <div className="flex-shrink-0 text-center md:text-left">
        <p className="font-bold text-dorado-el-pollo">{game.date}</p>
        <p className="text-sm text-gray-400">{game.time}</p>
      </div>
      
      <div className="flex-grow">
        {/* Font size adjusted for mobile */}
        <p className="font-bold text-white text-lg md:text-xl">{game.tournament}</p>
        <p className="text-gray-300 text-sm md:text-base">{game.location}</p>
      </div>

      {(game.equipo_ganador || game.premios) && (
        <div className="flex-shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-700 mt-4 md:mt-0 pt-4 md:pt-0 md:pl-6 text-left">
          {game.equipo_ganador && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500 text-lg">🏆</span>
              <p className="font-semibold text-dorado-el-pollo-claro">Ganador: {game.equipo_ganador}</p>
            </div>
          )}
          {game.premios && (
            <div className="text-sm prose prose-sm prose-invert">
              <ReactMarkdown>{game.premios}</ReactMarkdown>
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
  const allGames = await getAllGames();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGames = allGames.filter(game => new Date(game.rawDate) >= today).reverse();
  const pastGames = allGames.filter(game => new Date(game.rawDate) < today);

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      {/* Padding adjusted for mobile */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Font size adjusted for mobile */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dorado-el-pollo text-center mb-12">Calendario de Merces</h1>

        <section className="mb-16 title-container">
          {/* Font size adjusted for mobile */}
          <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-dorado-el-pollo/30 pb-2 mb-6 text-white title">
            Próximas Merces
          </h2>
          {upcomingGames.length > 0 ? (
            <div className="space-y-4">
              {upcomingGames.map(game => <TournamentRow key={game.id} game={game} />)}
            </div>
          ) : (
            <p className="text-gray-400">No hay torneos programados próximamente.</p>
          )}
        </section>

        <section className="title-container">
          {/* Font size adjusted for mobile */}
          <h2 className="text-2xl md:text-3xl font-bold border-b-2 border-dorado-el-pollo/30 pb-2 mb-6 text-white title">
            Merces Pasadas
          </h2>
          {pastGames.length > 0 ? (
            <div className="space-y-4">
              {pastGames.map(game => <TournamentRow key={game.id} game={game} />)}
            </div>
          ) : (
            <p className="text-gray-400">Aún no hay historial de torneos pasados.</p>
          )}
        </section>
      </div>
    </div>
  );
}