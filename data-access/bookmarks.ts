import "server-only";
import prisma from "@/lib/db";

// GET

export const getBookmark = async ({
  userId,
  chapterSlug,
  mangaSlug,
}: {
  userId: string;
  chapterSlug: string;
  mangaSlug: string;
}) => {
  const bookmark = await prisma.bookmark.findFirst({
    where: { chapterSlug, mangaSlug, userId },
    select: {
      id: true,
      mangaName: true,
      chapterSlug: true,
    },
  });
  return bookmark;
};

export const getAllBookmarks = async (userId: string) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    select: {
      chapterSlug: true,
      mangaName: true,
      image: true,
      mangaSlug: true,
    },
  });
  return bookmarks;
};

// POST

export const addChapterToBookmarks = async ({
  userId,
  chapterSlug,
  image,
  mangaName,
  mangaSlug,
}: {
  userId: string;
  chapterSlug: string;
  image: string;
  mangaName: string;
  mangaSlug: string;
}) => {
  await prisma.bookmark.create({
    data: {
      mangaName,
      mangaSlug,
      image,
      chapterSlug,
      user: { connect: { id: userId } },
    },
  });
};

// DELETE

export const deleteBookmark = async (id: string) => {
  await prisma.bookmark.delete({
    where: { id },
  });
};
