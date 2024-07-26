import { cache } from "react";
import prisma from "./db";
import { verifySession } from "./session";
const getUser = cache(async () => {
  const session = await verifySession();
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { username: true, email: true },
  });
  if (user) {
    const { username, email } = user;
    return { username, email };
  }
});
export default getUser;
