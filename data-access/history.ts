import "server-only";
import prisma from "@/lib/db";

// GET
export const getHistory = async (userId: string) => {
  const userHistory = await prisma.history.findUnique({
    where: { userId },
  });
  return userHistory;
};

// POST
export const createHistory = async (userId: string) => {
  await prisma.history.create({
    data: {
      user: { connect: { id: userId } },
    },
  });
};

// PUT

export const updateHistory = async ({
  userId,
  mangaId,
}: {
  userId: string;
  mangaId: string;
}) => {
  await prisma.history.update({
    where: { userId },
    data: {
      mangas: {
        connect: { id: mangaId },
      },
    },
  });
};
