import { getUserSelectClause } from "./constants";
import prisma from "./db";
import { unstable_cache } from "next/cache";
const getUser = unstable_cache(
  async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: getUserSelectClause.select,
    });
    if (user) {
      const {
        username,
        email,
        avatarHueValue,
        avatarIconPath,
        uploadedAvatarUrl,
      } = user;
      return {
        username,
        email,
        avatarHueValue,
        avatarIconPath,
        uploadedAvatarUrl,
      };
    }
  },
  ["userCredentials"],
  { tags: ["userCredentials"] },
);
export default getUser;
