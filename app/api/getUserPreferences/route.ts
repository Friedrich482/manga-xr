import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import getUserPreferences from "@/lib/getUserPreferences";

export async function GET() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.json({ preferences: null });
  }
  const userId = session.userId.toString();

  try {
    const userPreferences = await getUserPreferences(userId);
    if (!userPreferences) {
      return NextResponse.json({ preferences: null });
    }
    return NextResponse.json({ preferences: userPreferences });
  } catch (error) {
    console.error("Error while fetching user preferences: ", error);
    return NextResponse.json(
      { error: "A server error occurred" },
      { status: 500 },
    );
  }
}
