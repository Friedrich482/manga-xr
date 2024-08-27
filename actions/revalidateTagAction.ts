"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

export default async function revalidateTagAction(tag: unknown) {
  const parsedTag = z.string().safeParse(tag);
  if (!parsedTag.success) {
    let errorMessage = "";
    parsedTag.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  revalidateTag(parsedTag.data);
}
