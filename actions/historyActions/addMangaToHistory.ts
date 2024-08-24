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
          name: true,
          slug: true,
          historyId: true,
        },
      });
      if (existingManga && existingManga.historyId) {
        const { historyId } = existingManga;
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
            return;
          }
        }
      }
      const { id } = await prisma.manga.create({
        data: {
          name,
          slug,
          lastChapterRead,
          page: 0,
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

const addMangaToHistory = async ({
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

export default addMangaToHistory;
