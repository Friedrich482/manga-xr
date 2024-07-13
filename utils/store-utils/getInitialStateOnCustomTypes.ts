import { ZodEnum } from "zod";

const getInitialStateOnCustomTypes = <T extends string>(
  schema: ZodEnum<[T, ...T[]]>,
  key: string,
  altState: T,
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
    const initialState: T = parsedInitialState.data;
    return initialState;
  } catch (error) {
    return altState;
  }
};
export default getInitialStateOnCustomTypes;
