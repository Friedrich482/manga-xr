"use server";
import { GET_USER_PREFERENCES_TAG } from "@/lib/constants";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const progressBarVisibilityAction = async (progressBarVisibility: unknown) => {
  const parsedProgressBarVisibility = z
    .boolean()
    .safeParse(progressBarVisibility);
  if (!parsedProgressBarVisibility.success) {
    let errorMessage = "";
    parsedProgressBarVisibility.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { userId } = await verifySession();
  await prisma.preferences.update({
    where: { userId },
    data: { progressBarVisibility: parsedProgressBarVisibility.data },
  });
  revalidateTag(GET_USER_PREFERENCES_TAG);
};

export default progressBarVisibilityAction;
