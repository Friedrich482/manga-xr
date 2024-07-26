"use server";
import prisma from "@/lib/db";
import { createSession } from "@/lib/session";
import { registerFormInputName, registerFormSchema } from "@/zod-schema/schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcrypt";

const saltRounds = 10;
const registerFormAction = async (
  data: unknown,
): Promise<
  | string
  | {
      message: string;
      name: registerFormInputName;
    }
  | undefined
> => {
  const parsedData = registerFormSchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const hashedPassword = await hash(parsedData.data.password, saltRounds);
  try {
    // register the user in the db get the id
    const { id: userId } = await prisma.user.create({
      data: {
        username: parsedData.data.username,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });
    // create a session
    await createSession(userId);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[];

        if (target?.includes("email")) {
          return { message: "This email is already taken.", name: "email" };
        } else if (target?.includes("username")) {
          return {
            message: "This username is already taken",
            name: "username",
          };
        }
      }
      return "Error while creating your account. Please try again.";
    }
  }
};

export default registerFormAction;
