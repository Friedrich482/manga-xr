import { Preferences, PreferencesNames } from "@/zod-schema/schema";
import { ZodTypeAny } from "zod";

const getInitialState = <
  U extends PreferencesNames,
  T extends Preferences[U] & (string | boolean),
>(
  schema: ZodTypeAny,
  key: U,
  altState: T,
): T => {
  if (typeof localStorage === "undefined") {
    return altState;
  }

  const value = localStorage.getItem(key);
  if (!value) {
    return altState;
  }

  try {
    const parsedInitialState = schema.safeParse(JSON.parse(value));
    if (!parsedInitialState.success) {
      return altState;
    }
    return parsedInitialState.data;
  } catch (error) {
    return altState;
  }
};

export default getInitialState;
