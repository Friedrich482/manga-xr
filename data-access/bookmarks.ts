import "server-only";
import prisma from "@/lib/db";

// GET

export const getBookmark = async ({
  userId,
  chapterSlug,
  mangaName,
}: {
  userId: string;
  chapterSlug: string;
  mangaName: string;
}) => {
  const bookmark = await prisma.bookmark.findFirst({
    where: { chapterSlug, mangaName, userId },
    select: {
      id: true,
      mangaName: true,
      chapterSlug: true,
    },
  });
  return bookmark;
};

// POST

export const addChapterToBookmarks = async ({
  userId,
  chapterSlug,
  image,
  mangaName,
}: {
  userId: string;
  chapterSlug: string;
  image: string;
  mangaName: string;
}) => {
  await prisma.bookmark.create({
    data: {
      mangaName,
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
