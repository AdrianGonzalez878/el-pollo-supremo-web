"use client";

import Link from "next/link";
import { FaFacebook, FaYoutube, FaPlay } from "react-icons/fa";
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

  const PlatformIcon =
    video.plataforma === "Facebook" ? FaFacebook : FaYoutube;

  const platformColor =
    video.plataforma === "Facebook" ? "text-blue-400" : "text-red-400";

  return (
    <Link
      href={video.video_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group video-card-link"
      aria-label={`Ver video: ${video.title} en ${video.plataforma}`}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element -- URLs de YouTube/Facebook CDN */}
        <img
          src={thumbnailUrl}
          alt={video.title}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-dorado-el-pollo/20 animate-ping" />
            <div className="relative w-14 h-14 bg-dorado-el-pollo rounded-full flex items-center justify-center shadow-xl shadow-dorado-el-pollo/40">
              <FaPlay className="text-negro-el-pollo w-5 h-5 ml-1" />
            </div>
          </div>
        </div>

        {/* Platform badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/70 rounded-full px-2.5 py-1 backdrop-blur-sm">
          <PlatformIcon className={`w-3.5 h-3.5 ${platformColor}`} aria-hidden="true" />
          <span className="text-white text-[0.65rem] font-semibold">{video.plataforma}</span>
        </div>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-gray-200 leading-snug line-clamp-2 group-hover:text-dorado-el-pollo transition-colors video-card-title">
        {video.title}
      </h3>
    </Link>
  );
}
