import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "./lib/session";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/user"];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  return NextResponse.next();
}
