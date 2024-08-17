"use server";

import prisma from "@/lib/db";

export default async function addUploadedAvatar(
  userId: string,
  url: string,
  imageKey: string,
) {
  await prisma.user.update({
    where: { id: userId },
    data: { uploadedAvatarUrl: url, uploadedAvatarKey: imageKey },
  });
}
