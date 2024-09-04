import { getHistory } from "@/data-access/history";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const mangaSlug = pathname.slice(pathname.lastIndexOf("/") + 1);
  console.log(mangaSlug);
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ user: null });
  }
  const userId = session.userId.toString();

  try {
    const userHistory = await getHistory(userId);
  } catch (error) {
    return NextResponse.json(
      { error: "A server error occurred" },
      { status: 500 },
    );
  }
};
