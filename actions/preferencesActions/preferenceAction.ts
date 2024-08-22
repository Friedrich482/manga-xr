"use server";

import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { PreferencesNames, PreferencesValues } from "@/zod-schema/schema";
import { z } from "zod";

const preferenceAction = async <
  T extends PreferencesValues,
  U extends PreferencesNames,
>({
  data,
  schemaSource,
  field,
}: {
  data: unknown;
  field: U;
  schemaSource?: readonly [T, ...T[]];
}) => {
  const schema = schemaSource ? z.enum(schemaSource) : z.boolean();
  const parsedData = schema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { userId } = await verifySession();
  await prisma.preferences.update({
    where: { userId },
    data: {
      [field]: parsedData.data,
    },
  });
};

export default preferenceAction;
