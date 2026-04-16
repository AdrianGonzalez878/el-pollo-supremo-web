import Link from "next/link";
import { FeaturedVideosCarousel } from "./FeaturedVideosCarousel";
import { fetchFeaturedVideos } from "@/lib/sanity/loaders";

export async function FeaturedVideos() {
  const featuredVideos = await fetchFeaturedVideos();

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
          <p className="text-center text-gray-400">
            No hay videos destacados en este momento.
          </p>
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
