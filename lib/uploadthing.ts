import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import prisma from "./db";
import { UTApi } from "uploadthing/server";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const deleteDbAndCloudAvatar = async (userId: string) => {
  const utapi = new UTApi();
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { uploadedAvatarKey: true },
  });
  if (data?.uploadedAvatarKey) {
    const { success } = await utapi.deleteFiles(data.uploadedAvatarKey, {
      keyType: "fileKey",
    });
    await prisma.user.update({
      where: { id: userId },
      data: { uploadedAvatarUrl: null, uploadedAvatarKey: null },
    });
  }
};
