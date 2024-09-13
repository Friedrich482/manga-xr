import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { getBookmark } from "@/data-access/bookmarks";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const chapterSlug = searchParams.get("chapterSlug");
  const mangaSlug = searchParams.get("mangaSlug");
  if (!chapterSlug || !mangaSlug) {
    return NextResponse.json({ bookmark: null });
  }
  //   authentication
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ bookmark: null });
  }
  const userId = session.userId.toString();

  //   data fetching
  const bookmark = await getBookmark({ userId, chapterSlug, mangaSlug });
  return NextResponse.json({ bookmark });
};
