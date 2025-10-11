import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { PartialUser } from "@/zod-schema/schema";
import useSWR from "swr";

const fetcher = async (url: string): Promise<{ user: PartialUser | null }> => {
  const res = await fetch(url);
  return res.json();
};

const useUser = () => {
  const { data, error, isLoading } = useSWR(GET_USER_SWR_KEY, fetcher);
  if (!isLoading && !data?.user) {
    // no user, if there was an history remaining, delete it from the localStorage
    localStorage.removeItem(HISTORY_LOCALSTORAGE_KEY);
  }
  return {
    user: data?.user,
    isLoading,
    error: error,
  };
};

export default useUser;
