import { gapOptions } from "@/lib/constants";
import { GapOptionName } from "@/zod-schema/schema";

const getGapOptionValue = (name: GapOptionName) => {
  return gapOptions.filter((option) => option.name === name)[0].value;
};

export default getGapOptionValue;
