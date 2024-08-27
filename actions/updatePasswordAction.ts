"use server";

import { saltRounds } from "@/lib/constants";
import prisma from "@/lib/db";
import { deleteSession, verifySession } from "@/lib/session";
import { updatePasswordFormSchema } from "@/zod-schema/schema";
import { hash } from "bcrypt";
const updatePasswordAction = async (data: unknown) => {
  const parsedData = updatePasswordFormSchema.safeParse(data);

  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }

  try {
    const { userId } = await verifySession();
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: await hash(parsedData.data.password, saltRounds),
      },
    });
    // destroy the session to force the user to login again
    await deleteSession();
  } catch (error) {
    console.error(error);
    return "An error occurred. Please try again.";
  }
};

export default updatePasswordAction;
