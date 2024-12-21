import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export default async function getUserId() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return { userId: null };
  }
  return { userId: session.userId.toString() };
}
