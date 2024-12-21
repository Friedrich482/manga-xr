import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4weeks")
    .sign(encodedKey);
};
const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return;
  }
};
const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000 * 28);
  const session = await encrypt({ userId, expiresAt });
  (await cookies()).set("session", session, {
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
// use this function to perform operations like server actions which needs the user to be authenticated
const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId.toString() };
};
// logout
const deleteSession = async () => {
  (await cookies()).delete("session");
};

export { createSession, deleteSession, verifySession, encrypt, decrypt };
