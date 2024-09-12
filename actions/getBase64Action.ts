"use server";

import getImage from "@/lib/getImage";
import { z } from "zod";

const getBase64Action = async (data: unknown) => {
  const parsedData = z.string().safeParse(data);

  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach((issue) => (errorMessage += issue));
    return errorMessage;
  }
  const { base64 } = await getImage(parsedData.data);
  return base64;
};

export default getBase64Action;
