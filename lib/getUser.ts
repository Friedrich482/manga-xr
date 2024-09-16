import { GET_USER_TAG } from "./cache-keys/unstable_cache";
import { findUserWithId } from "@/data-access/user";
import { unstable_cache } from "next/cache";
const getUser = unstable_cache(
  async (id: string) => {
    const user = await findUserWithId(id);
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
  [GET_USER_TAG],
  { tags: [GET_USER_TAG] },
);
export default getUser;
