import { useSWRConfig } from "swr";
import useUser from "./Auth/useUser";
import useToastTheme from "./useToastTheme";

const useMutateSWRUser = () => {
  const { user } = useUser();
  const toastOptions = useToastTheme();
  const { mutate } = useSWRConfig();
  return { user, toastOptions, mutate };
};

export default useMutateSWRUser;
