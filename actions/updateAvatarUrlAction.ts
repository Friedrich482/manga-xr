"use server";

import { GET_USER_TAG } from "@/lib/constants";
import prisma from "@/lib/db";
import { updateUrlAvatarSchema } from "@/zod-schema/schema";
import { revalidateTag } from "next/cache";

export default async function addUploadedAvatar(data: unknown) {
  const parsedData = updateUrlAvatarSchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { userId, imageKey, url } = parsedData.data;
  await prisma.user.update({
    where: { id: userId },
    data: { uploadedAvatarUrl: url, uploadedAvatarKey: imageKey },
  });
  revalidateTag(GET_USER_TAG);
}
