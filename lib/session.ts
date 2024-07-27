import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4hrs")
    .sign(encodedKey);
};
const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Session verification failed !");
  }
};
const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  // redirect should not be used here because of the registerFormAction where we call the createSession function in a try/catch block
  // So it will throw a 303/307 error
  // redirect("/");
};
const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId.toString() };
};
const deleteSession = async () => {
  cookies().delete("session");
  redirect("/login");
};

export { createSession, deleteSession, verifySession, encrypt, decrypt };
