"use server";

import { compare } from "bcrypt";
import { createSession } from "@/lib/session";
import { findUserWithUsername } from "@/data-access/user";
import { loginFormSchema } from "@/zod-schema/schema";

const loginFormAction = async (data: unknown) => {
  // validate the credentials
  const parsedCredentials = loginFormSchema.safeParse(data);
  if (!parsedCredentials.success) {
    let errorMessage = "";
    parsedCredentials.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    return errorMessage;
  }

  // check if the user exists with the username
  const { username, password } = parsedCredentials.data;
  try {
    const user = await findUserWithUsername(username);
    if (!user) {
      return { message: "User not found", name: "username" };
    }
    //   check if the password is correct
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return { message: "Incorrect password", name: "password" };
    }
    //   create a session for the user
    const userId = user.id;
    await createSession(userId);
    return username;
  } catch (error) {
    return { message: `A server error occurred: ${error}` };
  }
};

export default loginFormAction;
