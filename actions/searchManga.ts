"use server";

import { redirect } from "next/navigation";
import { mangaSearchSchema } from "@/zod-schema/schema";

const searchFormAction = (formData: FormData) => {
  const parsedManga = mangaSearchSchema.parse(formData.get("search-manga"));
  const slugManga = parsedManga.toLowerCase().replaceAll(" ", "-");
  redirect(`/search?name=${slugManga}`);
};

export default searchFormAction;
