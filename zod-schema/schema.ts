import { z } from "zod";
// schemas
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
  genres: z.string().min(1),
});
export const partialPopularMangaSchema = popularMangaSchema.omit({
  genres: true,
});

// types
export type latestUpdateType = z.infer<typeof latestUpdateSchema>;
export type popularMangaType = z.infer<typeof popularMangaSchema>;
export type partialPopularMangaType = z.infer<typeof partialPopularMangaSchema>;
