"use server";

import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { gapOptionNameSchema } from "@/zod-schema/schema";
import { revalidateTag } from "next/cache";

const gapOptionAction = async (name: unknown) => {
  const parsedName = gapOptionNameSchema.safeParse(name);

  if (!parsedName.success) {
    let errorMessage = "";

    parsedName.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { userId } = await verifySession();
  await prisma.preferences.update({
    where: { userId },
    data: { gapOptionName: parsedName.data },
  });

  revalidateTag("userPreferences");
};

export default gapOptionAction;
