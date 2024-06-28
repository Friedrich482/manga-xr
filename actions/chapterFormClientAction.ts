import { chapterSearchSchema } from "@/zod-schema/schema";
import toast from "react-hot-toast";

export const chapterFormClientAction = (formData: FormData) => {
  const chapterNumber = formData.get("chapter");
  const parsedNumber = chapterSearchSchema.safeParse(chapterNumber);
  if (!parsedNumber.success) {
    let errorMessage = "";
    parsedNumber.error.issues.forEach((issue) => {
      errorMessage += issue.message;
    });
    toast.error(errorMessage);
    return;
  }
};
