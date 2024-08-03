import { z } from "zod";
// manga schemas
export const mangaSearchSchema = z.string();
export const chapterSearchSchema = z.string().min(1);
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
export const chapterSchema = z.object({
  chapterTitle: z.string().min(1),
  chapterReleaseDate: z.string().min(1),
});
export const mangaUnitDataSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  genres: z.string().min(1),
  releaseDate: z.string().min(1),
  chapters: z.array(chapterSchema),
  author: z.string().min(1),
  latestUpdateDate: z.string().min(1),
  synopsys: z.string().min(10),
});
export const chapterImagesSchema = z.string().min(1);
export const registerFormSchema = z
  .object({
    email: z.string().email("Invalid email").trim(),
    username: z.string().min(3).trim(),
    password: z
      .string()
      .min(10, "Password must be at least 10 characters")
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export const loginFormSchema = z.object({
  username: z.string().min(3).trim(),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .trim(),
});

// manga types
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
export type chapterImagesType = z.infer<typeof chapterImagesSchema>;
export type chapterType = z.infer<typeof chapterSchema>;

// reading navigation schema
export const progressBarDirectionSchema = z.enum(["Vertical", "Horizontal"]);
export const chapterPagesDispositionSchema = z.enum([
  "Single Page",
  "Long Strip",
]);
export const readingDirectionSchema = z.enum([
  "From left to right",
  "From right to left",
]);

// reading navigation type
export type progressBarDirection = z.infer<typeof progressBarDirectionSchema>;
export type chapterPagesDisposition = z.infer<
  typeof chapterPagesDispositionSchema
>;
export type readingDirection = z.infer<typeof readingDirectionSchema>;

// Login & register types
export type registerFormType = z.infer<typeof registerFormSchema>;
export type loginFormType = z.infer<typeof loginFormSchema>;
export type registerFormInputName =
  | "email"
  | "username"
  | "password"
  | "confirmPassword";
export type loginFormInputName = Exclude<
  registerFormInputName,
  "confirmPassword" | "email"
>;
export type MenuPosition = "top of the button" | "bottom of the button";
