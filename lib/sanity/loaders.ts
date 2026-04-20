import { getSanityClient, sanityFetchEnabled } from "./client";
import { urlForImage } from "./image";
import { slugify } from "../slugify";
import {
  fetchFacebookVideoThumbnail,
  getYouTubeThumbnailUrl,
} from "@/lib/video-thumbnail";
import type { Game } from "@/components/GameCard";
import type { Video } from "@/components/VideoCard";

const homepageQuery = `*[_type == "homepage"][0]{
  hero_image,
  flyer_torneo
}`;

const partidosQuery = `*[_type == "partido"] | order(date desc) {
  _id,
  tournament,
  location,
  date,
  time,
  merce_link,
  premios,
  equipo_ganador
}`;

const partidosLimitedQuery = `*[_type == "partido"] | order(date desc) [0...80] {
  _id,
  tournament,
  location,
  date,
  time,
  merce_link,
  premios,
  equipo_ganador
}`;

const videosQuery = `*[_type == "video"] | order(coalesce(publishedAt, _createdAt) desc) [0...100] {
  _id,
  title,
  video_url,
  plataforma,
  miniatura_manual,
  "categoria_video": {
    "nombre": coalesce(categoria_video->nombre, categoria_video.nombre)
  }
}`;

const videosFeaturedQuery = `*[_type == "video"] | order(coalesce(publishedAt, _createdAt) desc) [0...9] {
  _id,
  title,
  video_url,
  plataforma,
  miniatura_manual
}`;

const patrocinadoresQuery = `*[_type == "patrocinador"] | order(nombre asc) {
  _id,
  nombre,
  logo,
  numero_telefono
}`;

function formatTime(time: string | undefined): string {
  if (!time) return "— HRS";
  const t = time.trim();
  if (t.length >= 5) return `${t.substring(0, 5)} HRS`;
  return `${t} HRS`;
}

function mapPartidoToGame(doc: {
  _id: string;
  tournament?: string;
  location?: string;
  date?: string;
  time?: string;
  merce_link?: string;
  premios?: string;
  equipo_ganador?: string;
}): Game {
  const rawDate = doc.date ?? new Date().toISOString();
  const gameDate = new Date(rawDate);
  return {
    id: doc._id,
    tournament: doc.tournament ?? "",
    location: doc.location ?? "",
    rawDate,
    date: gameDate
      .toLocaleDateString("es-MX", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/\./g, "")
      .toUpperCase(),
    time: formatTime(doc.time),
    merce_link: doc.merce_link,
    premios: doc.premios,
    equipo_ganador: doc.equipo_ganador,
  };
}

function mapVideoDoc(doc: {
  _id: string;
  title?: string;
  video_url?: string;
  plataforma?: "YouTube" | "Facebook";
  miniatura_manual?: unknown;
  categoria_video?: { nombre?: string } | null;
}): Video & {
  categoria_video?: { nombre: string };
} {
  const thumb = doc.miniatura_manual
    ? urlForImage(doc.miniatura_manual as Parameters<typeof urlForImage>[0])
        ?.width(1280)
        .height(720)
        .url()
    : null;

  return {
    id: doc._id,
    title: doc.title ?? "",
    video_url: doc.video_url ?? "#",
    plataforma: doc.plataforma === "Facebook" ? "Facebook" : "YouTube",
    miniatura_manual: thumb ? { url: thumb } : undefined,
    ...(doc.categoria_video?.nombre
      ? {
          categoria_video: {
            nombre: doc.categoria_video.nombre,
          },
        }
      : {}),
  };
}

export type HomepageImages = {
  heroImageUrl: string;
  flyerImageUrl: string | null;
};

export async function fetchHomepageImages(): Promise<HomepageImages> {
  const fallback: HomepageImages = {
    heroImageUrl: "/placeholder-basketball.jpg",
    flyerImageUrl: null,
  };
  if (!sanityFetchEnabled()) return fallback;

  try {
    const data = await getSanityClient().fetch<{
      hero_image?: unknown;
      flyer_torneo?: unknown;
    } | null>(homepageQuery);

    if (!data) return fallback;

    const heroUrl = data.hero_image
      ? urlForImage(data.hero_image as Parameters<typeof urlForImage>[0])
          ?.width(1920)
          .url()
      : null;
    const flyerUrl = data.flyer_torneo
      ? urlForImage(data.flyer_torneo as Parameters<typeof urlForImage>[0])
          ?.width(1200)
          .url()
      : null;

    return {
      heroImageUrl: heroUrl ?? fallback.heroImageUrl,
      flyerImageUrl: flyerUrl ?? null,
    };
  } catch (e) {
    console.error("Sanity fetchHomepageImages:", e);
    return fallback;
  }
}

export async function fetchPartidos(): Promise<Game[]> {
  if (!sanityFetchEnabled()) return [];
  try {
    const rows = await getSanityClient().fetch<
      Parameters<typeof mapPartidoToGame>[0][]
    >(partidosQuery);
    return (rows ?? []).map(mapPartidoToGame);
  } catch (e) {
    console.error("Sanity fetchPartidos:", e);
    return [];
  }
}

export async function fetchPartidosLimited(): Promise<Game[]> {
  if (!sanityFetchEnabled()) return [];
  try {
    const rows = await getSanityClient().fetch<
      Parameters<typeof mapPartidoToGame>[0][]
    >(partidosLimitedQuery);
    return (rows ?? []).map(mapPartidoToGame);
  } catch (e) {
    console.error("Sanity fetchPartidosLimited:", e);
    return [];
  }
}

export type VideoWithCategory = ReturnType<typeof mapVideoDoc>;

async function withAutoThumbnail<T extends Video & { categoria_video?: { nombre: string } }>(
  video: T,
): Promise<T> {
  if (video.miniatura_manual?.url) return video;

  if (video.plataforma === "YouTube") {
    const yt = getYouTubeThumbnailUrl(video.video_url);
    if (yt) return { ...video, miniatura_manual: { url: yt } };
    return video;
  }

  if (video.plataforma === "Facebook") {
    const fb = await fetchFacebookVideoThumbnail(video.video_url);
    if (fb) return { ...video, miniatura_manual: { url: fb } };
  }

  return video;
}

export async function fetchVideos(): Promise<VideoWithCategory[]> {
  if (!sanityFetchEnabled()) return [];
  try {
    const rows = await getSanityClient().fetch<
      Parameters<typeof mapVideoDoc>[0][]
    >(videosQuery);
    const mapped = (rows ?? []).map(mapVideoDoc);
    return Promise.all(mapped.map((v) => withAutoThumbnail(v)));
  } catch (e) {
    console.error("Sanity fetchVideos:", e);
    return [];
  }
}

export async function fetchFeaturedVideos(): Promise<Video[]> {
  if (!sanityFetchEnabled()) return [];
  try {
    const rows = await getSanityClient().fetch<
      Parameters<typeof mapVideoDoc>[0][]
    >(videosFeaturedQuery);
    const mapped = (rows ?? []).map((r) => mapVideoDoc(r));
    return Promise.all(mapped.map((v) => withAutoThumbnail(v)));
  } catch (e) {
    console.error("Sanity fetchFeaturedVideos:", e);
    return [];
  }
}

export async function fetchVideosByCategorySlug(
  slug: string,
): Promise<VideoWithCategory[]> {
  const all = await fetchVideos();
  return all.filter(
    (v) => slugify(v.categoria_video?.nombre ?? "Otros") === slug,
  );
}

export type SponsorRow = {
  id: string;
  nombre: string;
  logoUrl: string;
  numero_telefono?: number;
};

export async function fetchPatrocinadores(): Promise<SponsorRow[]> {
  if (!sanityFetchEnabled()) return [];
  try {
    const rows = await getSanityClient().fetch<
      {
        _id: string;
        nombre?: string;
        logo?: unknown;
        numero_telefono?: number;
      }[]
    >(patrocinadoresQuery);

    return (rows ?? []).map((row) => {
      const logoUrl = row.logo
        ? urlForImage(row.logo as Parameters<typeof urlForImage>[0])
            ?.width(400)
            .url() ?? "/placeholder-logo.png"
        : "/placeholder-logo.png";

      return {
        id: row._id,
        nombre: row.nombre ?? "",
        logoUrl,
        numero_telefono: row.numero_telefono,
      };
    });
  } catch (e) {
    console.error("Sanity fetchPatrocinadores:", e);
    return [];
  }
}
