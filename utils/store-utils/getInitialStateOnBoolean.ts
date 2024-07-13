import { ZodBoolean } from "zod";

const getInitialStateOnBoolean = (
  schema: ZodBoolean,
  key: string,
  altState: boolean,
) => {
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
    const initialState = parsedInitialState.data;
    return initialState;
  } catch (error) {
    return altState;
  }
};

export default getInitialStateOnBoolean;
