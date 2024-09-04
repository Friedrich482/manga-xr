import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export default async function getUserId() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return { userId: null };
  }
  return { userId: session.userId.toString() };
}
