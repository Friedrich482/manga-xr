import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ userId: null });
  }
  return NextResponse.json({ userId: session.userId.toString() });
}
