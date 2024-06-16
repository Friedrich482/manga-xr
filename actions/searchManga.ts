"use server";

import { redirect } from "next/navigation";
import { mangaSearchSchema } from "@/zod-schema/schema";

const searchManga = async (data: unknown) => {
  const parsedManga = mangaSearchSchema.safeParse(data);

  if (!parsedManga.success) {
    let errorMessage = "";
    parsedManga.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return `Manga to search is ${errorMessage.toLowerCase()}`;
  }
  const slugManga = parsedManga.data.toLowerCase().replaceAll(" ", "-");
  redirect(`/search?name=${slugManga}`);
};

export default searchManga;
