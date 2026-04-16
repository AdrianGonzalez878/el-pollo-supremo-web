/** Extrae el ID de video de YouTube (incl. Shorts, youtu.be, embed, live). */
export function getYouTubeVideoId(url: string): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();

  let m = u.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(?:\?|\/|#|$)/);
  if (m) return m[1];

  m = u.match(/youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?|#|$)/);
  if (m) return m[1];

  m = u.match(/(?:youtube\.com\/watch\?[^#]*v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];

  m = u.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})(?:\?|\/|#|$)/);
  if (m) return m[1];

  m = u.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];

  return null;
}

export function getYouTubeThumbnailUrl(videoUrl: string): string | null {
  const id = getYouTubeVideoId(videoUrl);
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** Miniatura oficial vía oEmbed de Meta (solo servidor; no subir imagen en Sanity). */
export async function fetchFacebookVideoThumbnail(
  videoUrl: string,
): Promise<string | null> {
  const lowered = videoUrl.toLowerCase();
  if (
    !lowered.includes("facebook.com") &&
    !lowered.includes("fb.watch") &&
    !lowered.includes("fb.com")
  ) {
    return null;
  }
  try {
    const endpoint = `https://www.facebook.com/plugins/video/oembed.json/?url=${encodeURIComponent(videoUrl)}`;
    const res = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86_400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : null;
  } catch {
    return null;
  }
}
