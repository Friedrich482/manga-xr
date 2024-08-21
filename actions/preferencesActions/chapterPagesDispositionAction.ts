"use server";

import { GET_USER_PREFERENCES_TAG } from "@/lib/constants";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { chapterPagesDispositionSchema } from "@/zod-schema/schema";
import { revalidateTag } from "next/cache";

const chapterPagesDispositionAction = async (
  chapterPagesDisposition: unknown,
) => {
  const parsedChapterPagesDisposition = chapterPagesDispositionSchema.safeParse(
    chapterPagesDisposition,
  );

  if (!parsedChapterPagesDisposition.success) {
    let errorMessage = "";
    parsedChapterPagesDisposition.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { userId } = await verifySession();
  await prisma.preferences.update({
    where: { userId },
    data: {
      chapterPagesDisposition: parsedChapterPagesDisposition.data,
    },
  });
  revalidateTag(GET_USER_PREFERENCES_TAG);
};

export default chapterPagesDispositionAction;
