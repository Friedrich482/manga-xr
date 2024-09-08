import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard"];

// avoid already logged in users to go back on the "/login" or "/register" page
const onlyAccessibleByNotLoggedInUsers = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);
  const isOnlyAccessibleByNotLoggedInUsers =
    onlyAccessibleByNotLoggedInUsers.includes(currentPath);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (isOnlyAccessibleByNotLoggedInUsers && session?.userId) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
