"use server";

import prisma from "@/lib/db";
import { decrypt } from "@/lib/session";
import { addMangaToHistorySchema } from "@/zod-schema/schema";
import { cookies } from "next/headers";
import { cache } from "react";
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
    const userHistory = await prisma.history.findUnique({
      where: { userId },
    });
    // this condition is always true because the user gets an history when he is created
    if (userHistory) {
      const existingManga = await prisma.manga.findFirst({
        where: { name, slug, historyId: userHistory.id },
        select: {
          id: true,
          historyId: true,
          lastChapterRead: true,
          chaptersRead: true,
        },
      });
      // check if the manga is already in the Manga table for the user
      if (existingManga) {
        const { chaptersRead } = existingManga;
        //  so the manga is already in the history for the user, let's update, if necessary, the last chapter
        if (lastChapterRead !== existingManga.lastChapterRead) {
          await prisma.manga.update({
            where: { id: existingManga.id },
            data: {
              lastChapterRead,
            },
          });
        }
        await prisma.manga.update({
          where: { id: existingManga.id },
          data: {
            chaptersRead: chaptersRead.includes(lastChapterRead)
              ? chaptersRead
              : [...chaptersRead, lastChapterRead],
          },
        });

        return;
      }
      // the manga is not in the history, let's add it
      const { id: mangaId } = await prisma.manga.create({
        data: {
          name,
          slug,
          lastChapterRead,
          image,
          chaptersRead: [lastChapterRead],
        },
      });

      await prisma.history.update({
        where: { userId },
        data: {
          mangas: {
            connect: { id: mangaId },
          },
        },
      });
    }
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
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null;
  }
  const userId = session.userId.toString();

  await memoizedPart({ name, slug, lastChapter, image, userId });
};

export default addMangaToHistoryAction;
