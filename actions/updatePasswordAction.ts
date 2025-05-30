"use server";

import { deleteSession, verifySession } from "@/lib/session";
import { hash } from "bcrypt";
import { saltRounds } from "@/lib/constants";
import { updatePassword } from "@/data-access/user";
import { updatePasswordFormSchema } from "@/zod-schema/schema";
const updatePasswordAction = async (data: unknown) => {
  const parsedData = updatePasswordFormSchema.safeParse(data);

  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const { password } = parsedData.data;
  try {
    const { userId } = await verifySession();
    const hashedPassword = await hash(password, saltRounds);
    await updatePassword({ userId, hashedPassword });
    // destroy the session to force the user to login again
    await deleteSession();
  } catch (error) {
    console.error(error);
    return "An error occurred. Please try again.";
  }
};

export default updatePasswordAction;
