"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaYoutube } from "react-icons/fa";

export interface Video {
  id: number;
  title: string;
  video_url: string;
  plataforma: 'YouTube' | 'Facebook';
  miniatura_manual?: any;
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function VideoCard({ video }: { video: Video }) {
  let thumbnailUrl = '/placeholder-video.jpg';
  let providerIcon;

  if (video.plataforma === 'YouTube') {
    const videoId = getYouTubeId(video.video_url);
    if (videoId) {
      thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }
    providerIcon = <FaYoutube className="w-8 h-8 text-white" />;
  } else if (video.plataforma === 'Facebook') {
    const STRAPI_URL = 'http://localhost:1337';
    if (video.miniatura_manual?.url) {
      thumbnailUrl = `${STRAPI_URL}${video.miniatura_manual.url}`;
    }
    providerIcon = <FaFacebook className="w-8 h-8 text-white" />;
  }

  return (
    <Link 
      href={video.video_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block group video-card-link"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          width={1280}
          height={720}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 flex items-center justify-center 
                     bg-black/50 
                     opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300"
        >
          <div className="w-16 h-16 bg-black/50 border-2 border-white/50 rounded-full flex items-center justify-center">
            {providerIcon}
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-lg font-bold text-white transition-colors video-card-title">
        {video.title}
      </h3>
    </Link>
  );
}