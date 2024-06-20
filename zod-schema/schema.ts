import { z } from "zod";

export const mangaSearchSchema = z.string().min(3);
export const latestUpdateSchema = z.object({
  title: z.string().min(1),
  altTitle: z.string().min(1),
  image: z.string().min(1),
  lastChapter: z.string().min(1),
});
export const popularMangaSchema = z.object({
  title: z.string().min(1),
  altTitle: z.string().min(1),
  image: z.string().min(1),
  lastChapter: z.string().min(1),
});

export type latestUpdateType = z.infer<typeof latestUpdateSchema>;
export type popularMangaType = z.infer<typeof popularMangaSchema>;
