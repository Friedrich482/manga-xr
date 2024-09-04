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
  const manga = await prisma.manga.findUnique({
    where: { slug, historyId },
    select: { slug: true, lastChapterRead: true, chaptersRead: true },
  });
  if (!manga) {
    return null;
  }
  const { chaptersRead, lastChapterRead } = manga;
  return { chaptersRead, lastChapterRead };
};

export const findMangaWithNameSlugAndHistoryId = async ({
  name,
  slug,
  historyId,
}: {
  name: string;
  slug: string;
  historyId: string;
}) => {
  const existingManga = await prisma.manga.findFirst({
    where: { name, slug, historyId },
    select: {
      id: true,
      lastChapterRead: true,
      chaptersRead: true,
    },
  });
  return existingManga;
};

export const findUserSManga = async (historyId: string) => {
  const mangasInHistory = await prisma.manga.findMany({
    where: { historyId },
    select: { image: true, lastChapterRead: true, name: true, slug: true },
    orderBy: { updatedAt: "desc" },
  });
  return mangasInHistory;
};

// POST

export const createManga = async ({
  name,
  slug,
  lastChapterRead,
  image,
}: {
  name: string;
  slug: string;
  lastChapterRead: string;
  image: string;
}) => {
  const { id: mangaId } = await prisma.manga.create({
    data: {
      name,
      slug,
      lastChapterRead,
      image,
      chaptersRead: [lastChapterRead],
    },
  });
  return mangaId;
};

// PUT

export const updateMangaLastChapter = async ({
  existingManga,
  lastChapterRead,
}: {
  existingManga: NonNullable<
    Awaited<ReturnType<typeof findMangaWithNameSlugAndHistoryId>>
  >;
  lastChapterRead: string;
}) => {
  await prisma.manga.update({
    where: { id: existingManga.id },
    data: {
      lastChapterRead,
    },
  });
};

export const updateMangaChaptersRead = async ({
  mangaId,
  chaptersRead,
  lastChapterRead,
}: {
  mangaId: string;
  chaptersRead: string[];
  lastChapterRead: string;
}) => {
  await prisma.manga.update({
    where: { id: mangaId },
    data: {
      chaptersRead: chaptersRead.includes(lastChapterRead)
        ? chaptersRead
        : [...chaptersRead, lastChapterRead],
    },
  });
};
