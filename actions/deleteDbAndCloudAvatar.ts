"use server";
import {
  deleteUploadedAvatarKeyAndUrl,
  findUserWithId,
} from "@/data-access/user";
import { UTApi } from "uploadthing/server";

export const deleteDbAndCloudAvatar = async (userId: string) => {
  const utapi = new UTApi();
  const data = await findUserWithId(userId);
  if (data?.uploadedAvatarKey) {
    await utapi.deleteFiles(data.uploadedAvatarKey, {
      keyType: "fileKey",
    });
    await deleteUploadedAvatarKeyAndUrl(userId);
  }
};
