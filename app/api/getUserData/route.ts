import prisma from "@/lib/db";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ user: null });
  }
  const userId = session.userId.toString();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "A server error occurred" },
      { status: 500 },
    );
  }
}
