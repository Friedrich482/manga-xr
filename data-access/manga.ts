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
    select: { slug: true, lastChapterReadSlug: true, chaptersRead: true },
    orderBy: { updatedAt: "desc" },
  });
  if (!manga) {
    return null;
  }
  return manga;
};

// export const findMangaWithNameSlugAndHistoryId = async ({
//   slug,
//   historyId,
// }: {
//   slug: string;
//   historyId: string;
// }) => {
//   const existingManga = await prisma.manga.findFirst({
//     where: { slug, historyId },
//     select: {
//       id: true,
//       lastChapterRead: true,
//       chaptersRead: true,
//     },
//   });
//   return existingManga;
// };

export const findUserSManga = async (historyId: string) => {
  const mangasInHistory = await prisma.manga.findMany({
    where: { historyId },
    select: {
      id: true,
      image: true,
      lastChapterReadSlug: true,
      slug: true,
    },
    orderBy: { updatedAt: "desc" },
  });
  return mangasInHistory;
};

// POST

export const createManga = async ({
  mangaSlug,
  lastChapterReadSlug,
  image,
}: {
  mangaSlug: string;
  lastChapterReadSlug: string;
  image: string;
}) => {
  const { id: mangaId } = await prisma.manga.create({
    data: {
      slug: mangaSlug,
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
}: {
  existingManga: NonNullable<Awaited<ReturnType<typeof findMangaWithSlug>>>;
  lastChapterReadSlug: string;
}) => {
  await prisma.manga.update({
    where: { slug: existingManga.slug },
    data: {
      lastChapterReadSlug,
    },
  });
};

export const updateMangaChaptersRead = async ({
  slug,
  chaptersRead,
  lastChapterReadSlug,
}: {
  slug: string;
  chaptersRead: string[];
  lastChapterReadSlug: string;
}) => {
  await prisma.manga.update({
    where: { slug },
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
