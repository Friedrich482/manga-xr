"use server";

import { GET_MANGAS_FROM_HISTORY_TAG } from "@/lib/cache-keys/unstable_cache";
import { deleteManga } from "@/data-access/manga";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const deleteMangaFromHistoryAction = async (data: unknown) => {
  const parsedData = z.object({ id: z.string() }).safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }

  const { id } = parsedData.data;
  const { userId } = await getUserId();
  if (!userId) {
    return;
  }

  await deleteManga(id);
  revalidateTag(GET_MANGAS_FROM_HISTORY_TAG);
};

export default deleteMangaFromHistoryAction;
