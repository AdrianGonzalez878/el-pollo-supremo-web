// app/videoteca/page.tsx
import { VideoCard, Video } from "@/components/VideoCard";
import Link from 'next/link';

const STRAPI_URL = 'http://localhost:1337';

interface VideoWithCategory extends Video {
  plataforma: 'YouTube' | 'Facebook';
  miniatura_manual?: any;
  categoria_video?: {
    nombre: string;
  };
}

async function getAllVideos(): Promise<VideoWithCategory[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/videos?populate=*&sort=publishedAt:desc&pagination[pageSize]=100`);
    if (!res.ok) throw new Error('Failed to fetch videos from Strapi');
    
    const jsonResponse = await res.json();
    const videos = jsonResponse.data.filter((video: any) => video);
    
    // --- CORRECCIÓN AQUÍ ---
    // Mapeamos explícitamente cada campo para no perder ninguno
    const formattedVideos: VideoWithCategory[] = videos.map((video: any) => ({
      id: video.id,
      title: video.title,
      video_url: video.video_url,
      plataforma: video.plataforma,
      miniatura_manual: video.miniatura_manual,
      categoria_video: video.categoria_video,
    }));

    return formattedVideos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default async function VideotecaPage() {
  const allVideos = await getAllVideos();

  const videosByCategory: { [key: string]: VideoWithCategory[] } = {};
  allVideos.forEach(video => {
    const categoryName = video.categoria_video?.nombre || 'Otros';
    if (!videosByCategory[categoryName]) {
      videosByCategory[categoryName] = [];
    }
    videosByCategory[categoryName].push(video);
  });

  const categories = Object.keys(videosByCategory);

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dorado-el-pollo">Videoteca</h1>
          <p className="text-white mt-3 max-w-2xl mx-auto">
            Explora por categoría los mejores momentos de El Pollo Supremo.
          </p>
        </div>
        
        <div className="space-y-16">
          {categories.map(category => {
            const previewVideos = videosByCategory[category].slice(0, 6);
            const categorySlug = slugify(category);

            return (
              <section key={category}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-dorado-el-pollo">
                    {category}
                  </h2>
                  <Link href={`/videoteca/${categorySlug}`} className="text-dorado-el-pollo-claro hover:text-white transition-colors">
                    Ver todo &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {previewVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}