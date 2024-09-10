"use server";

import { GET_USER_TAG } from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { updateAvatar } from "@/data-access/user";
import { updateUrlAvatarSchema } from "@/zod-schema/schema";

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
  await updateAvatar({ userId, imageKey, url });
  revalidateTag(GET_USER_TAG);
}
