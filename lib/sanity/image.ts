import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const builder =
  projectId != null && projectId !== ""
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !builder) {
    return null;
  }
  return builder.image(source);
}
