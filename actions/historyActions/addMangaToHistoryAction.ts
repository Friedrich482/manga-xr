"use server";

import prisma from "@/lib/db";
import { decrypt } from "@/lib/session";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { cache } from "react";
let mangaName = "";
const cachedPart = unstable_cache(
  cache(
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
      // check if the manga is already in the Manga table
      const existingManga = await prisma.manga.findFirst({
        where: { name, slug },
        select: {
          id: true,
          name: true,
          slug: true,
          historyId: true,
          lastChapterRead: true,
          chaptersRead: true,
        },
      });
      if (existingManga && existingManga.historyId) {
        const { historyId, chaptersRead } = existingManga;
        // if there is an existing manga let's check if the userId of the owner of this history is the same as the current one (from the current user logged in)
        const userIdObject = await prisma.history.findFirst({
          where: { id: historyId },
          select: {
            userId: true,
          },
        });
        if (userIdObject) {
          const { userId: userIdFromDb } = userIdObject;
          if (userId === userIdFromDb) {
            //  so the manga is already in the history for the user, let's update, if necessary, the last chapter
            if (lastChapterRead !== existingManga.lastChapterRead) {
              await prisma.manga.update({
                where: { id: existingManga.id },
                data: {
                  lastChapterRead,
                  chaptersRead: [...chaptersRead, lastChapterRead],
                },
              });
            }
            return;
          }
        }
      }
      // the manga is not in the history, let's add it

      const { id } = await prisma.manga.create({
        data: {
          name,
          slug,
          lastChapterRead,
          chaptersRead: [lastChapterRead],
        },
      });

      const history = await prisma.history.update({
        where: { userId },
        data: {
          mangas: {
            connect: { id },
          },
        },
      });
    },
  ),
  [`add manga to history : ${mangaName}`],
  { tags: [`add manga to history : ${mangaName}`] },
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

  await cachedPart({ name, slug, lastChapter, userId });
};

export default addMangaToHistoryAction;
