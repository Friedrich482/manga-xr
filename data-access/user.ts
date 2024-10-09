import "server-only";
import { imagesArrayLength, imagesNames } from "@/lib/constants";
import prisma from "@/lib/db";

// GET
export const findUserWithUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      password: true,
      id: true,
    },
  });
  return user;
};

export const findUserWithId = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      email: true,
      avatarHueValue: true,
      avatarIconPath: true,
      uploadedAvatarUrl: true,
      uploadedAvatarKey: true,
    },
  });
  return user;
};

// POST

export const createUser = async ({
  username,
  email,
  hashedPassword,
}: {
  username: string;
  email: string;
  hashedPassword: string;
}) => {
  // generate a random hue value and pick a random avatar icon
  const avatarHueValue = Math.floor(Math.random() * 360);
  const avatarIconPath =
    imagesNames[Math.floor(Math.random() * imagesArrayLength)];
  const { id: userId } = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      avatarHueValue,
      avatarIconPath,
    },
  });
  return { userId };
};

// PUT

export const updateAvatar = async ({
  userId,
  imageKey,
  url,
}: {
  userId: string;
  imageKey: string;
  url: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: { uploadedAvatarUrl: url, uploadedAvatarKey: imageKey },
  });
};

export const updateEmailAndUsername = async ({
  userId,
  newEmail,
  newUsername,
}: {
  userId: string;
  newEmail: string;
  newUsername: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      username: newUsername,
      email: newEmail,
    },
  });
};

export const updatePassword = async ({
  userId,
  hashedPassword,
}: {
  userId: string;
  hashedPassword: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });
  // destroy the session to force the user to login again
};

export const deleteUploadedAvatarKeyAndUrl = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { uploadedAvatarUrl: null, uploadedAvatarKey: null },
  });
};
