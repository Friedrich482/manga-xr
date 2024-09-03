import "server-only";
import prisma from "@/lib/db";
import {
  ChapterPagesDisposition,
  GapOptionName,
  PreferencesNames,
  PreferencesValues,
  ProgressBarDirection,
  ReadingDirection,
} from "@/zod-schema/schema";

// GET

export const getPreferences = async (id: string) => {
  const preferences = await prisma.preferences.findUnique({
    where: { userId: id },
    select: {
      progressBarVisibility: true,
      progressBarDirection: true,
      chapterPagesDisposition: true,
      readingDirection: true,
      gapOptionName: true,
    },
  });
  return preferences;
};

// POST

export const createPreferences = async ({
  progressBarVisibility,
  progressBarDirection,
  chapterPagesDisposition,
  readingDirection,
  gapOptionName,
  userId,
}: {
  progressBarVisibility: boolean;
  progressBarDirection: ProgressBarDirection;
  chapterPagesDisposition: ChapterPagesDisposition;
  readingDirection: ReadingDirection;
  gapOptionName: GapOptionName;
  userId: string;
}) => {
  await prisma.preferences.create({
    data: {
      progressBarVisibility,
      progressBarDirection,
      chapterPagesDisposition,
      readingDirection,
      gapOptionName,
      user: { connect: { id: userId } },
    },
  });
};

// PUT

export const updatePreference = async <
  T extends PreferencesValues,
  U extends PreferencesNames,
>({
  userId,
  field,
  data,
}: {
  userId: string;
  field: U;
  data: T | boolean;
}) => {
  await prisma.preferences.update({
    where: { userId },
    data: {
      [field]: data,
    },
  });
};
