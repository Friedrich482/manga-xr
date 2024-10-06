import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { UserHistory } from "@/zod-schema/schema";

const getStoredHistory = (): UserHistory => {
  try {
    const storedData = localStorage.getItem(HISTORY_LOCALSTORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    return [];
  }
};

export default getStoredHistory;
