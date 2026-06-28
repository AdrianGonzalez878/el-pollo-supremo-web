import Link from "next/link";
import { FeaturedVideosCarousel } from "./FeaturedVideosCarousel";
import { fetchFeaturedVideos } from "@/lib/sanity/loaders";

export async function FeaturedVideos() {
  const featuredVideos = await fetchFeaturedVideos();

  return (
    <section className="py-16 bg-card-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-heading section-heading--center text-3xl md:text-4xl font-bold text-white">
            Videoteca Destacada
          </h2>
          <p className="text-gray-400 mt-4">
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

        <div className="text-center mt-14">
          <Link
            href="/videoteca"
            className="main-button font-bold py-3 px-8 rounded-full text-base"
          >
            Explorar Videoteca
          </Link>
        </div>
      </div>
    </section>
  );
}
