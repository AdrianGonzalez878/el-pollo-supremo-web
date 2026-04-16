"use client";

import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { getYouTubeThumbnailUrl } from "@/lib/video-thumbnail";

export interface Video {
  id: string;
  title: string;
  video_url: string;
  plataforma: "YouTube" | "Facebook";
  /** URL final de miniatura (Sanity, automática YouTube/Facebook en servidor, o vacío). */
  miniatura_manual?: { url: string };
}

const PLACEHOLDER = "/placeholder-video.svg";

export function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl =
    video.miniatura_manual?.url ||
    (video.plataforma === "YouTube"
      ? getYouTubeThumbnailUrl(video.video_url)
      : null) ||
    PLACEHOLDER;

  const providerIcon =
    video.plataforma === "Facebook" ? (
      <FaFacebook className="w-8 h-8 text-white" />
    ) : (
      <FaYoutube className="w-8 h-8 text-white" />
    );

  return (
    <Link
      href={video.video_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group video-card-link"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-video bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element -- URLs de YouTube/Facebook CDN; evita listar todos los hosts en next.config */}
        <img
          src={thumbnailUrl}
          alt={video.title}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
