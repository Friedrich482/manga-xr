import { GET_USER_PREFERENCES_SWR_KEY } from "@/lib/constants";
import { Preferences } from "@/zod-schema/schema";
import useSWR from "swr";

const fetcher = async (
  url: string,
): Promise<{ preferences: Preferences | null }> => {
  const res = await fetch(url);
  return res.json();
};

const useUserPreferences = () => {
  const { data, error, isLoading } = useSWR(
    GET_USER_PREFERENCES_SWR_KEY,
    fetcher,
  );
  return {
    preferences: data?.preferences,
    isLoading,
    error: error,  
  };
};

export default useUserPreferences;
