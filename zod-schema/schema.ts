import { string, z } from "zod";
// schemas
export const mangaSearchSchema = z.string();
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
export const searchMangaResultSchema = latestUpdateSchema;
export const partialSearchMangaResultSchema = searchMangaResultSchema.omit({
  lastChapter: true,
});
export const partialMangaListSchema = latestUpdateSchema.omit({
  image: true,
  lastChapter: true,
});
export const mangaListSchema = latestUpdateSchema;
export const mangaUnitDataSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  genres: z.string().min(1),
  releaseDate: z.string().min(1),
  chapters: z.array(z.string().min(1)),
  author: z.string().min(1),
  latestUpdateDate: z.string().min(1),
  synopsys: z.string().min(10),
});
// types
export type mainElementMangaType = z.infer<typeof latestUpdateSchema>; // this a generic type
export type latestUpdateType = mainElementMangaType;
export type popularMangaType = z.infer<typeof popularMangaSchema>;
export type searchResultMangaType = z.infer<typeof searchMangaResultSchema>;
export type partialPopularMangaType = z.infer<typeof partialPopularMangaSchema>;
export type partialSearchMangaResultType = z.infer<
  typeof partialSearchMangaResultSchema
>;
export type partialMangaListType = z.infer<typeof partialMangaListSchema>;
export type mangaListType = z.infer<typeof mangaListSchema>;
export type mangaUnitDataType = z.infer<typeof mangaUnitDataSchema>;
