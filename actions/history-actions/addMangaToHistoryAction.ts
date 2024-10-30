"use server";

import {
  GET_MANGAS_FROM_HISTORY_TAG,
  GET_MANGA_CHAPTERS_FROM_HISTORY_TAG,
} from "@/lib/cache-keys/unstable_cache";
import {
  createManga,
  findMangaWithNameSlugAndHistoryId,
  updateMangaChaptersRead,
  updateMangaLastChapter,
} from "@/data-access/manga";
import { getHistory, updateHistory } from "@/data-access/history";
import { addMangaToHistorySchema } from "@/zod-schema/schema";
import { cache } from "react";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";

const memoizedPart = cache(
  async ({
    name,
    slug,
    lastChapter: lastChapterRead,
    image,
    userId,
  }: {
    name: string;
    slug: string;
    lastChapter: string;
    image: string;
    userId: string;
  }) => {
    const userHistory = await getHistory(userId);
    // this condition is always true because the user gets an history when he is created
    if (userHistory) {
      const existingManga = await findMangaWithNameSlugAndHistoryId({
        name,
        slug,
        historyId: userHistory.id,
      });
      // check if the manga is already in the Manga table for the user
      if (existingManga) {
        const { chaptersRead } = existingManga;
        //  so the manga is already in the history for the user, let's update, if necessary, the last chapter
        if (lastChapterRead !== existingManga.lastChapterRead) {
          await updateMangaLastChapter({ existingManga, lastChapterRead });
        }
        await updateMangaChaptersRead({
          mangaId: existingManga.id,
          chaptersRead,
          lastChapterRead,
        });
        revalidateTag(GET_MANGA_CHAPTERS_FROM_HISTORY_TAG);
        revalidateTag(GET_MANGAS_FROM_HISTORY_TAG);
        return;
      }
      // the manga is not in the history, let's add it
      const mangaId = await createManga({ name, slug, lastChapterRead, image });

      await updateHistory({ userId, mangaId });
    }
    return;
  },
);

const addMangaToHistoryAction = async (data: unknown) => {
  // data parsing
  const parsedData = addMangaToHistorySchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => (errorMessage += issue.message));
    return errorMessage;
  }
  const { lastChapter, name, slug, image } = parsedData.data;

  // user authentication
  const { userId } = await getUserId();

  if (!userId) {
    return;
  }

  await memoizedPart({ name, slug, lastChapter, image, userId });
};

export default addMangaToHistoryAction;
