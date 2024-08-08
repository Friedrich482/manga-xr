"use server";

import { deleteSession } from "@/lib/session";
// This function is useful to encapsulate the deleteSession function (server only) and call it in a client component
const logoutAction = async () => {
  await deleteSession();
};

export default logoutAction;
