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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const { email, username } = user;
      if (
        username === parsedData.data.username &&
        email === parsedData.data.email
      ) {
        return "No changes were made. Please change at least one field.";
      }
      await prisma.user.update({
        where: { id: userId },
        data: {
          username: parsedData.data.username,
          email: parsedData.data.email,
        },
      });
    }
    // recreate a session
    await createSession(userId);
  } catch (error) {
    console.error(error);
    return "Error while updating your credentials. Please try again";
  }
};

export default updateBasicInfoAction;
