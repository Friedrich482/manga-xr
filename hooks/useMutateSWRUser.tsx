import { useSWRConfig } from "swr";
import useToastTheme from "./useToastTheme";
import useUser from "./Auth/useUser";

const useMutateSWRUser = () => {
  const { user } = useUser();
  const toastOptions = useToastTheme();
  const { mutate } = useSWRConfig();
  return { user, toastOptions, mutate };
};

export default useMutateSWRUser;
