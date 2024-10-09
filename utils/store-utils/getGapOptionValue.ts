import { GapOptionName } from "@/zod-schema/schema";
import { gapOptions } from "@/lib/constants";

const getGapOptionValue = (name: GapOptionName) => {
  return gapOptions.find((option) => option.name === name)?.value;
};

export default getGapOptionValue;
