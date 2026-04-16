import Link from "next/link";
import { VideoCard, Video } from "@/components/VideoCard";
import { fetchVideosByCategorySlug } from "@/lib/sanity/loaders";

interface VideoWithCategory extends Video {
  plataforma: "YouTube" | "Facebook";
  miniatura_manual?: { url: string };
  categoria_video?: {
    nombre: string;
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const videos = (await fetchVideosByCategorySlug(slug)) as VideoWithCategory[];

  const categoryName =
    videos[0]?.categoria_video?.nombre ?? slug.replace(/-/g, " ");

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <Link
            href="/videoteca"
            className="text-dorado-el-pollo hover:text-white transition-colors"
          >
            &larr; Volver a todas las categorías
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-4">
            {categoryName}
          </h1>
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No hay videos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
