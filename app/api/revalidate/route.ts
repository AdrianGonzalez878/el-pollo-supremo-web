import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation when Sanity (or you) POSTs here with the shared secret.
 * Sanity webhook URL example:
 *   https://TU_DOMINIO/api/revalidate?secret=TU_SECRETO_LARGO
 * Create the webhook in https://www.sanity.io/manage → API → Webhooks (Create/Update/Delete on your document types).
 */
export async function POST(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 503 },
    );
  }

  const fromQuery = request.nextUrl.searchParams.get("secret");
  let secret: string | null = fromQuery;

  if (secret !== expected) {
    try {
      const json = (await request.json()) as { secret?: string };
      secret =
        typeof json?.secret === "string" ? json.secret : null;
    } catch {
      secret = null;
    }
  }

  if (secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/calendario");
    revalidatePath("/videoteca");
    revalidatePath("/videoteca", "layout");
    revalidatePath("/patrocinadores");

    return NextResponse.json({ revalidated: true, at: Date.now() });
  } catch (e) {
    console.error("revalidate:", e);
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }
}
