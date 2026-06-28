// app/(site)/videoteca/page.tsx
import { VideoCard, Video } from "@/components/VideoCard";
import Link from "next/link";
import { fetchVideos } from "@/lib/sanity/loaders";
import { slugify } from "@/lib/slugify";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const revalidate = 120;

interface VideoWithCategory extends Video {
  plataforma: "YouTube" | "Facebook";
  miniatura_manual?: { url: string };
  categoria_video?: {
    nombre: string;
  };
}

export default async function VideotecaPage() {
  const allVideos = (await fetchVideos()) as VideoWithCategory[];

  const videosByCategory: { [key: string]: VideoWithCategory[] } = {};
  allVideos.forEach((video) => {
    const categoryName = video.categoria_video?.nombre || "Otros";
    if (!videosByCategory[categoryName]) {
      videosByCategory[categoryName] = [];
    }
    videosByCategory[categoryName].push(video);
  });

  const categories = Object.keys(videosByCategory);

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">

        {/* Page header */}
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h1 className="section-heading section-heading--center text-4xl sm:text-5xl font-extrabold text-dorado-el-pollo">
              Videoteca
            </h1>
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
              Explora por categoría los mejores momentos de El Pollo Supremo.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-20">
          {categories.map((category, categoryIndex) => {
            const previewVideos = videosByCategory[category].slice(0, 6);
            const totalVideos = videosByCategory[category].length;
            const categorySlug = slugify(category);

            return (
              <AnimateOnScroll key={category} delay={categoryIndex * 0.05}>
                <section>
                  <div className="flex justify-between items-end mb-6 pb-3 border-b border-gray-800">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {category}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {totalVideos} video{totalVideos !== 1 ? "s" : ""}
                      </p>
                    </div>
                    {totalVideos > 6 && (
                      <Link
                        href={`/videoteca/${categorySlug}`}
                        className="flex-shrink-0 btn-gold text-sm py-2 px-5 rounded-full"
                      >
                        Ver todo &rarr;
                      </Link>
                    )}
                  </div>
                  <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {previewVideos.map((video) => (
                      <StaggerItem key={video.id}>
                        <VideoCard video={video} />
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </section>
              </AnimateOnScroll>
            );
          })}
        </div>

      </div>
    </div>
  );
}
