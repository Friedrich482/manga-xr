"use server";
import prisma from "@/lib/db";
import { createSession, verifySession } from "@/lib/session";
import { updateBasicInfoFormSchema } from "@/zod-schema/schema";

const updateBasicInfoAction = async (data: unknown) => {
  const parsedData = updateBasicInfoFormSchema.safeParse(data);

  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => (errorMessage += issue));
    return errorMessage;
  }
  try {
    const { userId } = await verifySession();
    await prisma.user.update({
      where: { id: userId },
      data: {
        username: parsedData.data.username,
        email: parsedData.data.email,
      },
    });
    // recreate a session
    await createSession(userId);
  } catch (error) {
    console.error(error);
    return "Error while updating your credentials. Please try again";
  }
};

export default updateBasicInfoAction;
