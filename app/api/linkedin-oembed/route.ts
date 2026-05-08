import { NextRequest, NextResponse } from "next/server";

/* ═══════════════════════════════════════════════════════════
   LINKEDIN OEMBED API ROUTE

   Récupère le HTML embarqué d'un post LinkedIn via l'API oEmbed
   ═══════════════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  // Validation basique de l'URL LinkedIn
  if (!url.includes("linkedin.com/posts/")) {
    return NextResponse.json(
      { error: "Invalid LinkedIn post URL" },
      { status: 400 }
    );
  }

  try {
    // Appel à l'API oEmbed de LinkedIn
    const oembedUrl = `https://www.linkedin.com/oembed?url=${encodeURIComponent(url)}`;

    const response = await fetch(oembedUrl, {
      headers: {
        "Accept": "application/json",
      },
      // Cache pour 1 heure
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("LinkedIn oEmbed error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch LinkedIn embed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("LinkedIn oEmbed fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
