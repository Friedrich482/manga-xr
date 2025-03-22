import { NextRequest, NextResponse } from "next/server";
import { MAIN_URL } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url)
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 });

  try {
    const response = await fetch(url, {
      headers: { Referer: MAIN_URL },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/png",
        "Cache-Control": "max-age=86400, public",
      },
    });
  } catch (error) {
    console.error("Image Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
