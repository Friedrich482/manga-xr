import { dashBoardSubNavLinks, getUserSelectClause } from "@/lib/constants";
import { Prisma } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
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
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .trim(),
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
  username: z.string().min(3, "Username must be at least 3 characters").trim(),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .trim(),
});

export const updateBasicInfoFormSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  username: z.string().min(3, "Username must be at least 3 characters").trim(),
});

export const updatePasswordFormSchema = z
  .object({
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

export const dashBoardSearchParamsSchema = z.enum([
  dashBoardSubNavLinks[0].searchParam,
  ...dashBoardSubNavLinks.slice(1).map((link) => link.searchParam),
]); // z.enum() expects a non-empty array, so we need to pull out the first value and add the others after

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
export const gapOptionNameSchema = z.enum([
  "No gap",
  "Small",
  "Medium",
  "Large",
]);

// manga types

export type MainElementMangaType = z.infer<typeof latestUpdateSchema>;
export type LatestUpdateType = MainElementMangaType;
export type PopularMangaType = z.infer<typeof popularMangaSchema>;
export type SearchResultMangaType = z.infer<typeof searchMangaResultSchema>;
export type PartialPopularMangaType = z.infer<typeof partialPopularMangaSchema>;
export type PartialSearchMangaResultType = z.infer<
  typeof partialSearchMangaResultSchema
>;
export type PartialMangaListType = z.infer<typeof partialMangaListSchema>;
export type MangaListType = z.infer<typeof mangaListSchema>;
export type MangaUnitDataType = z.infer<typeof mangaUnitDataSchema>;
export type ChapterImagesType = z.infer<typeof chapterImagesSchema>;
export type ChapterType = z.infer<typeof chapterSchema>;

// reading navigation type

export type ProgressBarDirection = z.infer<typeof progressBarDirectionSchema>;
export type ChapterPagesDisposition = z.infer<
  typeof chapterPagesDispositionSchema
>;
export type ReadingDirection = z.infer<typeof readingDirectionSchema>;
export type GapOptionName = z.infer<typeof gapOptionNameSchema>;

// Login & register types

export type RegisterFormType = z.infer<typeof registerFormSchema>;
export type LoginFormType = z.infer<typeof loginFormSchema>;
export type UpdateBasicInfoFormType = z.infer<typeof updateBasicInfoFormSchema>;
export type UpdatePasswordFormType = z.infer<typeof updatePasswordFormSchema>;
export type PossibleFormInputName =
  | "email"
  | "username"
  | "password"
  | "confirmPassword";
export type FormInput<T extends PossibleFormInputName> = {
  name: T;
  type: HTMLInputTypeAttribute;
  placeholder: string;
};
export type RegisterFormInputName = PossibleFormInputName;
export type LoginFormInputName = Exclude<
  PossibleFormInputName,
  "username" | "confirmPassword"
>;
export type UpdateUserFormInputName = PossibleFormInputName;

// dropdown menu type

export type MenuPosition = "top of the button" | "bottom of the button";

export type PartialUser = Prisma.UserGetPayload<typeof getUserSelectClause>;
