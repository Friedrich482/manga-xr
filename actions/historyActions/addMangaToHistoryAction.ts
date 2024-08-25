"use server";

import prisma from "@/lib/db";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { cache } from "react";
let mangaName = "";
const memoizedPart = cache(
  async ({
    name,
    slug,
    lastChapter: lastChapterRead,
    userId,
  }: {
    name: string;
    slug: string;
    lastChapter: string;
    userId: string;
  }) => {
    mangaName = name;
    const userHistory = await prisma.history.findUnique({
      where: { userId },
    });
    // this condition is always true because the user gets an history when he is created
    if (userHistory) {
      const existingManga = await prisma.manga.findFirst({
        where: { name, slug, historyId: userHistory.id },
        select: {
          id: true,
          name: true,
          slug: true,
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

const addMangaToHistoryAction = async ({
  name,
  slug,
  lastChapter,
}: {
  name: string;
  slug: string;
  lastChapter: string;
}) => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null;
  }
  const userId = session.userId.toString();

  await memoizedPart({ name, slug, lastChapter, userId });
};

export default addMangaToHistoryAction;
