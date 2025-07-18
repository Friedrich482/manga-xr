import { HTMLInputTypeAttribute } from "react";
import { Prisma } from "@prisma/client";
import { getUserSelectClause } from "@/lib/constants";
import { z } from "zod";

// manga schemas

export const mangaSearchFormSchema = z.object({
  name: z.string().trim(),
});

export const chapterSearchSchema = mangaSearchFormSchema;
export const fetchMangaBasicSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  lastChapter: z.string().min(1),
  chapterSlug: z.string().min(1),
});
export const latestUpdateSchema = fetchMangaBasicSchema.extend({
  lastUpdateDate: z.string().min(1),
});
export const popularMangaSchema = fetchMangaBasicSchema.extend({
  releaseDate: z.string().min(1),
});

export const searchMangaResultSchema = fetchMangaBasicSchema
  .omit({
    lastChapter: true,
    chapterSlug: true,
  })
  .extend({
    yearOfRelease: z.string().min(1),
    mangaSlug: z.string().min(1),
  });

export const partialMangaListSchema = fetchMangaBasicSchema.omit({
  image: true,
  lastChapter: true,
});

export const mangaListSchema = fetchMangaBasicSchema;

export const chapterSchema = z.object({
  chapterTitle: z.string().min(1),
  chapterReleaseDate: z.string().min(1),
  chapterSlug: z.string().min(1),
});

export const mangaUnitDataSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  genres: z.string().min(1),
  releaseDate: z.string().min(1),
  chapters: z.array(chapterSchema),
  author: z.string().min(1),
  latestUpdateDate: z.string().min(1),
  synopsis: z.string().min(10),
});

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
export const dashBoardSearchParamsValues = ["history", "bookmarks"] as const;
export const dashBoardSearchParamsSchema = z.enum(dashBoardSearchParamsValues);

// reading navigation schema
export const progressBarDirectionValues = ["Horizontal", "Vertical"] as const;
export const progressBarDirectionSchema = z.enum(progressBarDirectionValues);

export const chapterPagesDispositionValues = [
  "Single Page",
  "Long Strip",
] as const;
export const chapterPagesDispositionSchema = z.enum(
  chapterPagesDispositionValues,
);

export const readingDirectionValues = [
  "From left to right",
  "From right to left",
] as const;
export const readingDirectionSchema = z.enum(readingDirectionValues);

export const gapOptionNameValues = [
  "No gap",
  "Small",
  "Medium",
  "Large",
] as const;
export const gapOptionNameSchema = z.enum(gapOptionNameValues);

export const preferencesSchema = z.object({
  progressBarVisibility: z.boolean(),
  progressBarDirection: progressBarDirectionSchema,
  chapterPagesDisposition: chapterPagesDispositionSchema,
  readingDirection: readingDirectionSchema,
  gapOptionName: gapOptionNameSchema,
});

export const updateUrlAvatarSchema = z.object({
  userId: z.string().min(6),
  url: z.string().min(6),
  imageKey: z.string().min(1),
});

export const addMangaToHistorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  lastChapterReadSlug: z.string().min(1),
  image: z.string().min(2),
  lastChapterTitle: z.string().min(1),
});

export const bookmarkChapterSchema = z.object({
  mangaName: z.string().min(1),
  mangaSlug: z.string().min(1),
  chapterSlug: z.string().min(1),
  image: z.string().min(1),
  chapterTitle: z.string().min(1),
});

// manga types
export type FetchMangaBasic = z.infer<typeof fetchMangaBasicSchema>;
export type MainElementMangaType = FetchMangaBasic;
export type LatestUpdateType = z.infer<typeof latestUpdateSchema>;
export type PopularMangaType = z.infer<typeof popularMangaSchema>;
export type SearchResultMangaType = z.infer<typeof searchMangaResultSchema>;
export type PartialMangaListType = z.infer<typeof partialMangaListSchema>;
export type MangaListType = z.infer<typeof mangaListSchema>;
export type MangaUnitDataType = z.infer<typeof mangaUnitDataSchema>;
export type PartialMangaUnitDataType = Omit<MangaUnitDataType, "chapters">;
export type ChapterType = z.infer<typeof chapterSchema>;

// reading navigation type

export type ProgressBarDirection = z.infer<typeof progressBarDirectionSchema>;
export type ChapterPagesDisposition = z.infer<
  typeof chapterPagesDispositionSchema
>;
export type ReadingDirection = z.infer<typeof readingDirectionSchema>;
export type GapOptionName = z.infer<typeof gapOptionNameSchema>;
export type GapOption = {
  name: GapOptionName;
  value: string;
};
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

export type DashBoardSubNavLinksSearchParam = z.infer<
  typeof dashBoardSearchParamsSchema
> | null;

export type DashBoardSubNavLinksName = "Overview" | "History" | "Bookmarks";

export type Preferences = z.infer<typeof preferencesSchema>;
export type ToastThemeType = {
  style: {
    background: string;
    color: string;
  };
  duration?: number;
};

export type PreferencesNames = keyof Preferences;

export type PreferencesValues = Exclude<Preferences[PreferencesNames], boolean>;

export type PreferencesState =
  | Exclude<PreferencesValues, GapOptionName>
  | GapOption
  | boolean;

// LocalStorage history schema and type
export const userHistorySchema = z.array(
  z.object({
    chapterSlug: z.string().min(1),
    page: z.number(),
  }),
);
export type UserHistory = z.infer<typeof userHistorySchema>;

export type MangaSearchForm = z.infer<typeof mangaSearchFormSchema>;
export type ChapterSearchForm = z.infer<typeof chapterSearchSchema>;
export type updateUrlAvatar = z.infer<typeof updateUrlAvatarSchema>;
export type CursorClass =
  | "cursor-default"
  | "cursor-up"
  | "cursor-right"
  | "cursor-left"
  | "cursor-down";
