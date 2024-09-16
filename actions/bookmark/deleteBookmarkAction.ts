"use server";

import {
  GET_BOOKMARKS_TAG,
  GET_MANGA_BOOKMARKS_TAG,
} from "@/lib/cache-keys/unstable_cache";
import { deleteBookmark } from "@/data-access/bookmarks";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const deleteBookmarkAction = async (data: unknown) => {
  // parse data
  const parsedData = z.object({ id: z.string().min(1) }).safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";

    parsedData.error?.issues.forEach((issue) => {
      errorMessage += issue;
    });
    return errorMessage;
  }
  //   authentication
  const { userId } = await getUserId();
  if (!userId) {
    return;
  }

  const { id } = parsedData.data;
  await deleteBookmark(id);
  revalidateTag(GET_BOOKMARKS_TAG);
  revalidateTag(GET_MANGA_BOOKMARKS_TAG);
};

export default deleteBookmarkAction;
