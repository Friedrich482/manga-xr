import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export type PartialUser = {
  email: string;
  userName: string;
};

const fetcher = async (url: string): Promise<{ user: PartialUser | null }> => {
  const res = await fetch(url);
  return res.json();
};

const useUser = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/getUserData", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (error) {
      // Handle error, maybe redirect to login page
      router.push("/login");
    }
  }, [error, router]);
  return {
    user: data?.user,
    isLoading,
    error: error,
  };
};

export default useUser;
