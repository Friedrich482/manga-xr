"use server";

import { PreferencesNames, PreferencesValues } from "@/zod-schema/schema";
import { GET_USER_PREFERENCES_TAG } from "@/lib/cache-keys/unstable_cache";
import { revalidateTag } from "next/cache";
import { updatePreference } from "@/data-access/preferences";
import { verifySession } from "@/lib/session";
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
  await updatePreference({ userId, field, data: parsedData.data });
  revalidateTag(GET_USER_PREFERENCES_TAG);
};

export default preferenceAction;
