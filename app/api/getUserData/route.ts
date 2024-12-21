import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import getUser from "@/lib/getUser";

export const GET = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ user: null });
  }
  const userId = session.userId.toString();

  try {
    const user = await getUser(userId);

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
};
