"use server";
import prisma from "@/lib/db";
import { registerFormSchema } from "@/zod-schema/schema";
import { hash } from "bcrypt";

const saltRounds = 10;
const registerFormAction = async (data: unknown) => {
  const parsedData = registerFormSchema.safeParse(data);
  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }
  const hashedPassword = await hash(parsedData.data.password, saltRounds);
  await prisma.user.create({
    data: {
      username: parsedData.data.username,
      email: parsedData.data.email,
      password: hashedPassword,
    },
  });
};

export default registerFormAction;
