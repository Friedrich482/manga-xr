"use server";
import {
  PossibleFormInputName,
  preferencesSchema,
  registerFormSchema,
} from "@/zod-schema/schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createHistory } from "@/data-access/history";
import { createPreferences } from "@/data-access/preferences";
import { createSession } from "@/lib/session";
import { createUser } from "@/data-access/user";
import { hash } from "bcrypt";
import { saltRounds } from "@/lib/constants";

const registerFormAction = async (
  data: unknown,
  preferences: unknown,
): Promise<
  | string
  | {
      message: string;
      name: PossibleFormInputName;
    }
  | undefined
> => {
  // validate the preferences (security measure)
  const parsedPreferences = preferencesSchema.safeParse(preferences);
  if (!parsedPreferences.success) {
    let errorMessage = "";
    parsedPreferences.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }

  // validate the data
  const parsedData = registerFormSchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { email, username, password } = parsedData.data;
  try {
    const hashedPassword = await hash(password, saltRounds);

    const { userId } = await createUser({ username, email, hashedPassword });
    await createPreferences({ userId, ...parsedPreferences.data });
    await createHistory(userId);
    await createSession(userId);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[];

        if (target?.includes("email")) {
          return { message: "This email is already taken.", name: "email" };
        } else if (target?.includes("username")) {
          return {
            message: "This username is already taken.",
            name: "username",
          };
        }
      }
    }
    return "Error while creating your account. Please try again.";
  }
};

export default registerFormAction;
