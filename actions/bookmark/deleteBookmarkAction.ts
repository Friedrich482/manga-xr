"use server";

import { GET_BOOKMARKS } from "@/lib/constants";
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
  revalidateTag(GET_BOOKMARKS);
};

export default deleteBookmarkAction;
