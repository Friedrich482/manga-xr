"use server";
import {
  deleteUploadedAvatarKeyAndUrl,
  findUserWithId,
} from "@/data-access/user";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

export const deleteDbAndCloudAvatar = async (data: unknown) => {
  const utapi = new UTApi();

  const parsedData = z.object({ userId: z.string() }).safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }

  const { userId } = parsedData.data;

  const userData = await findUserWithId(userId);
  if (userData?.uploadedAvatarKey) {
    await utapi.deleteFiles(userData.uploadedAvatarKey, {
      keyType: "fileKey",
    });
    await deleteUploadedAvatarKeyAndUrl(userId);
  }
};
