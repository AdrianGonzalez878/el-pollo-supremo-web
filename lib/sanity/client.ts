import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

function getClient(): SanityClient {
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to your environment to load CMS content.",
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-11-21",
    useCdn: true,
  });
}

let _client: SanityClient | null = null;

export function sanityFetchEnabled(): boolean {
  return Boolean(projectId);
}

export function getSanityClient(): SanityClient {
  if (!_client) {
    _client = getClient();
  }
  return _client;
}
