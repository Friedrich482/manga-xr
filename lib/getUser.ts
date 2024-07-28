import { cache } from "react";
import prisma from "./db";
const getUser = cache(async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { username: true, email: true },
  });
  if (user) {
    const { username, email } = user;
    return { username, email };
  }
});
export default getUser;
