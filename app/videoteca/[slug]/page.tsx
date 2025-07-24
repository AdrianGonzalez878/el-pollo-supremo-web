"use client"; // This converts the page to a Client Component

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Hook to get URL parameters
import { VideoCard, Video } from "@/components/VideoCard";
import Link from 'next/link';

const STRAPI_URL = 'http://localhost:1337';

// The interface for our video data
interface VideoWithCategory extends Video {
  plataforma: 'YouTube' | 'Facebook';
  miniatura_manual?: any;
  categoria_video?: {
    nombre: string;
  };
}

// This is no longer an async server component
export default function CategoryPage() {
  const params = useParams(); // Hook to safely get URL params on the client
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // State to hold our data and loading status
  const [videos, setVideos] = useState<VideoWithCategory[]>([]);
  const [categoryName, setCategoryName] = useState(slug.replace(/-/g, ' '));
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch data after the component mounts
  useEffect(() => {
    // We only fetch if the slug is available
    if (!slug) return;

    async function fetchData() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/videos?populate=*&filters[categoria_video][nombre][$eqi]=${slug.replace(/-/g, ' ')}&sort=publishedAt:desc&pagination[pageSize]=100`);
        if (!res.ok) throw new Error('Failed to fetch category videos');

        const jsonResponse = await res.json();
        const videosData = jsonResponse.data.filter((video: any) => video);

        const formattedVideos: VideoWithCategory[] = videosData.map((video: any) => ({
          id: video.id,
          title: video.title,
          video_url: video.video_url,
          plataforma: video.plataforma,
          miniatura_manual: video.miniatura_manual,
          categoria_video: video.categoria_video,
        }));
        
        setVideos(formattedVideos);
        setCategoryName(formattedVideos[0]?.categoria_video?.nombre || slug.replace(/-/g, ' '));

      } catch (error) {
        console.error("Error fetching category videos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [slug]); // This effect runs whenever the slug changes

  // Show a loading message while fetching data
  if (isLoading) {
    return (
      <div className="bg-negro-el-pollo text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-dorado-el-pollo-claro">Cargando categoría...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <Link href="/videoteca" className="text-dorado-el-pollo hover:text-white transition-colors">
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