import prisma from "./db";
import { unstable_cache } from "next/cache";
const getUser = unstable_cache(
  async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        email: true,
        avatarHueValue: true,
        avatarIconPath: true,
      },
    });
    if (user) {
      const { username, email, avatarHueValue, avatarIconPath } = user;
      return { username, email, avatarHueValue, avatarIconPath };
    }
  },
  ["userCredentials"],
  { tags: ["userCredentials"] },
);
export default getUser;
