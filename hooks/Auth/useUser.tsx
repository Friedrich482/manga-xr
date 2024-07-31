import { PartialUser } from "@/app/api/getUserData/route";
import useSWR from "swr";

const fetcher = async (url: string): Promise<{ user: PartialUser | null }> => {
  const res = await fetch(url);
  return res.json();
};

const useUser = () => {
  const { data, error, isLoading } = useSWR("/api/getUserData", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    user: data?.user,
    isLoading,
    error: error,
  };
};

export default useUser;
