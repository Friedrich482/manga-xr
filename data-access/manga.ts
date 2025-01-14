import "server-only";
import prisma from "@/lib/db";

// GET

export const findMangaWithSlug = async ({
  slug,
  historyId,
}: {
  slug: string;
  historyId: string;
}) => {
  const manga = await prisma.manga.findFirst({
    where: {
      slug,
      historyId,
    },
    select: {
      id: true,
      slug: true,
      lastChapterReadSlug: true,
      chaptersRead: true,
      lastChapterTitle: true,
    },
    orderBy: { updatedAt: "desc" },
  });
  if (!manga) {
    return null;
  }
  return manga;
};

export const findUserSManga = async (historyId: string) => {
  const mangasInHistory = await prisma.manga.findMany({
    where: { historyId },
    select: {
      id: true,
      name: true,
      image: true,
      lastChapterReadSlug: true,
      lastChapterTitle: true,
    },
    orderBy: { updatedAt: "desc" },
  });
  return mangasInHistory;
};

// POST

export const createManga = async ({
  name,
  mangaSlug,
  lastChapterReadSlug,
  lastChapterTitle,
  image,
}: {
  name: string;
  mangaSlug: string;
  lastChapterReadSlug: string;
  lastChapterTitle: string;
  image: string;
}) => {
  const { id: mangaId } = await prisma.manga.create({
    data: {
      slug: mangaSlug,
      lastChapterTitle,
      name,
      lastChapterReadSlug,
      image,
      chaptersRead: [lastChapterReadSlug],
    },
  });
  return mangaId;
};

// PUT

export const updateMangaLastChapter = async ({
  existingManga,
  lastChapterReadSlug,
  lastChapterTitle,
}: {
  existingManga: NonNullable<Awaited<ReturnType<typeof findMangaWithSlug>>>;
  lastChapterReadSlug: string;
  lastChapterTitle: string;
}) => {
  await prisma.manga.update({
    where: { id: existingManga.id },
    data: {
      lastChapterTitle,
      lastChapterReadSlug,
    },
  });
};

export const updateMangaChaptersRead = async ({
  id,
  chaptersRead,
  lastChapterReadSlug,
}: {
  id: string;
  chaptersRead: string[];
  lastChapterReadSlug: string;
}) => {
  await prisma.manga.update({
    where: { id },
    data: {
      chaptersRead: chaptersRead.includes(lastChapterReadSlug)
        ? chaptersRead
        : [...chaptersRead, lastChapterReadSlug],
    },
  });
};

// DELETE

export const deleteManga = async (mangaId: string) => {
  await prisma.manga.delete({ where: { id: mangaId } });
};
