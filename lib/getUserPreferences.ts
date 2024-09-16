import { GET_USER_PREFERENCES_TAG } from "./cache-keys/unstable_cache";
import { getPreferences } from "@/data-access/preferences";
import { unstable_cache } from "next/cache";

const getUserPreferences = unstable_cache(
  async (id: string) => {
    const preferences = await getPreferences(id);
    if (preferences) {
      const {
        progressBarDirection,
        progressBarVisibility,
        chapterPagesDisposition,
        readingDirection,
        gapOptionName,
      } = preferences;
      return {
        progressBarDirection,
        progressBarVisibility,
        chapterPagesDisposition,
        readingDirection,
        gapOptionName,
      };
    }
  },
  [GET_USER_PREFERENCES_TAG],
  {
    tags: [GET_USER_PREFERENCES_TAG],
  },
);
export default getUserPreferences;
