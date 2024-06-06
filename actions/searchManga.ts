"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const mangaSearchSchema = z.string().min(3);

const searchFormAction = (formData: FormData) => {
  const parsedManga = mangaSearchSchema.parse(formData.get("search-manga"));
  const slugManga = parsedManga.toLowerCase().replaceAll(" ", "_");
  redirect(`/search?name=${slugManga}`);
};

export default searchFormAction;
