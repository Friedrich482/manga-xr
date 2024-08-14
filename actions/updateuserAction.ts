"use server";
import prisma from "@/lib/db";
import { createSession, verifySession } from "@/lib/session";
import { updateUSerFormSchema } from "@/zod-schema/schema";
import { hash } from "bcrypt";

const saltRounds = 10;

const updateuserAction = async (data: unknown) => {
  const parsedData = updateUSerFormSchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue;
    });
    return errorMessage;
  }
  // hash the password
  let hashedPassword;
  if (parsedData.data.password) {
    hashedPassword = await hash(parsedData.data.password, saltRounds);
  }
  try {
    const { userId } = await verifySession();
    await prisma.user.update({
      where: { id: userId },
      data: {
        username: parsedData.data.username,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });
    // recreate the session
    await createSession(userId);
  } catch (error) {
    console.error(error);
    return "Error while updating your credentials. please try again";
  }
};

export default updateuserAction;
