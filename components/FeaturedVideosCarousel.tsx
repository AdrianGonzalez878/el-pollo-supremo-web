"use client";

import { Video, VideoCard } from "./VideoCard";
import { EmblaCarousel } from "./EmblaCarousel";

export function FeaturedVideosCarousel({ videos }: { videos: Video[] }) {
  return (
    <EmblaCarousel ariaLabel="Carrusel de videos destacados">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </EmblaCarousel>
  );
}
