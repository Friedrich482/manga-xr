import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  if (!userId) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 },
    );
  }
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { username: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { user: "A server error occurred" },
      { status: 500 },
    );
  }
}
