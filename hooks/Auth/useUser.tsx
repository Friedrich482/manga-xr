import { useEffect, useState } from "react";
import useSWR from "swr";

export type PartialUser = {
  email: string;
  userName: string;
};

const sessionFetcher = (
  ...args: Parameters<typeof fetch>
): Promise<{ userId: string | null }> =>
  fetch(...args).then((res) => res.json());

const credentialFetcher = (
  ...args: Parameters<typeof fetch>
): Promise<{ user: null | PartialUser }> =>
  fetch(...args).then((res) => res.json());

const useUser = () => {
  const [userCredentials, setUserCredentials] = useState<PartialUser | null>(
    null,
  );

  const { data: sessionData, error: sessionError } = useSWR(
    "/api/getDecryptedCookie",
    sessionFetcher,
  );
  const userId = sessionData?.userId?.toString();

  const { data: credentialData, error: credentialError } = useSWR(
    userId ? `/api/getUserCredentials/${userId}` : null,
    credentialFetcher,
  );
  useEffect(() => {
    if (credentialData && credentialData.user) {
      setUserCredentials(credentialData.user);
    }
  }, [credentialData]);

  if (sessionError || credentialError) {
    // Handle errors appropriately
    console.error("Error fetching data:", sessionError || credentialError);
  }

  return userCredentials;
};

export default useUser;
