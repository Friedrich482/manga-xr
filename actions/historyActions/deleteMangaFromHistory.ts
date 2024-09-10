"use server";

import { GET_MANGAS_FROM_HISTORY } from "@/lib/constants";
import { deleteManga } from "@/data-access/manga";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const deleteMangaFromHistory = async (data: unknown) => {
  const parsedData = z.object({ mangaId: z.string() }).safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }

  const { mangaId } = parsedData.data;
  const { userId } = await getUserId();
  if (!userId) {
    return;
  }

  await deleteManga(mangaId);
  revalidateTag(GET_MANGAS_FROM_HISTORY);
};

export default deleteMangaFromHistory;
