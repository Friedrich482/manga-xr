"use server";

import { addChapterToBookmarks } from "@/data-access/bookmarks";
import { bookmarkChapterSchema } from "@/zod-schema/schema";
import getUserId from "@/lib/getUserId";

const addBookmarkAction = async (data: unknown) => {
  // parse data
  const parsedData = bookmarkChapterSchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue;
    });
    return errorMessage;
  }

  //   authentication
  const { userId } = await getUserId();
  if (!userId) {
    return;
  }

  const { chapterSlug, image, mangaName } = parsedData.data;

  await addChapterToBookmarks({
    userId,
    chapterSlug,
    image,
    mangaName,
  });
};

export default addBookmarkAction;
