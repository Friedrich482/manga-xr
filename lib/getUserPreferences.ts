import { unstable_cache } from "next/cache";
import prisma from "./db";

const getUserPreferences = unstable_cache(
  async (id: string) => {
    const preferences = await prisma.preferences.findUnique({
      where: { userId: id },
      select: {
        progressBarVisibility: true,
        progressBarDirection: true,
        chapterPagesDisposition: true,
        readingDirection: true,
        gapOptionName: true,
      },
    });
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
  ["userPreferences"],
  {
    tags: ["userPreferences"],
  },
);
export default getUserPreferences;
