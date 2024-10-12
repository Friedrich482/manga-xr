import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { userHistorySchema } from "@/zod-schema/schema";

const getStoredHistory = () => {
  const storedData = localStorage.getItem(HISTORY_LOCALSTORAGE_KEY);
  if (!storedData) {
    return [];
  }

  const parsedStoredData = userHistorySchema.safeParse(JSON.parse(storedData));

  if (!parsedStoredData.success) {
    return [];
  }

  return parsedStoredData.data;
};

export default getStoredHistory;
