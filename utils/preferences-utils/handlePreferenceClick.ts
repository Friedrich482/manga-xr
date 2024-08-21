import preferenceAction from "@/actions/preferencesActions/preferenceAction";
import { GET_USER_PREFERENCES_SWR_KEY } from "@/lib/constants";
import {
  PartialUser,
  PreferencesNames,
  PreferencesValues,
  ToastThemeType,
} from "@/zod-schema/schema";
import toast from "react-hot-toast";
import { ScopedMutator } from "swr/_internal";

const handlePreferenceClick = async <
  const T extends PreferencesValues,
  U extends PreferencesNames,
>(
  setState: (newState: T) => void,
  content: T,
  user: PartialUser | null | undefined,
  toastOptions: ToastThemeType,
  mutate: ScopedMutator,
  field: U,
  schemaSource?: readonly [T, ...T[]],
) => {
  setState(content);
  if (user) {
    const error = await preferenceAction(
      JSON.parse(
        JSON.stringify({
          data: content,
          schemaSource,
          field,
        }),
      ),
    );
    if (error) {
      toast.error(error, toastOptions);
    }
    mutate(GET_USER_PREFERENCES_SWR_KEY);
  }
};

export default handlePreferenceClick;
