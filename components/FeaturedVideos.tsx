
import Link from 'next/link';
import { type Video } from './VideoCard';
import { FeaturedVideosCarousel } from './FeaturedVideosCarousel';

const STRAPI_URL = 'http://localhost:1337';

// ESTA FUNCIÓN AHORA ES IDÉNTICA A LA DE LA PÁGINA DE VIDEOTECA
async function getFeaturedVideos(): Promise<Video[]> {
  try {
    // 1. Pedimos los nuevos campos y poblamos la miniatura manual
    const res = await fetch(`${STRAPI_URL}/api/videos?populate=miniatura_manual&fields[0]=title&fields[1]=video_url&fields[2]=plataforma&sort=publishedAt:desc&pagination[limit]=9`);
    if (!res.ok) throw new Error('Failed to fetch featured videos');

    const jsonResponse = await res.json();
    const videos = jsonResponse.data.filter((video: any) => video);

    // 2. Mapeamos todos los datos necesarios que espera la VideoCard
    const formattedVideos: Video[] = videos.map((video: any) => ({
      id: video.id,
      title: video.title,
      video_url: video.video_url,
      plataforma: video.plataforma,
      miniatura_manual: video.miniatura_manual,
    }));

    return formattedVideos;
  } catch (error) {
    console.error("Error fetching featured videos:", error);
    return [];
  }
}

export async function FeaturedVideos() {
  const featuredVideos = await getFeaturedVideos();

  return (
    <section className="py-12 bg-card-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 title-container">
          <h2 className="text-3xl md:text-4xl font-bold text-white title">
            Videoteca Destacada
          </h2>
          <p className="text-white mt-2 subtitle">
            Revive los mejores momentos de las últimas Merces.
          </p>
        </div>

        {featuredVideos.length > 0 ? (
          <FeaturedVideosCarousel videos={featuredVideos} />
        ) : (
          <p className="text-center text-gray-400">No hay videos destacados en este momento.</p>
        )}

        <div className="text-center mt-12">
          <Link
            href="/videoteca"
            className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg 
                       transition-all duration-300 button-videoteca"
          >
            Explorar Videoteca
          </Link>
        </div>
      </div>
    </section>
  );
}