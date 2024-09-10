import { GapOptionName } from "@/zod-schema/schema";
import { gapOptions } from "@/lib/constants";

const getGapOptionValue = (name: GapOptionName) => {
  return gapOptions.filter((option) => option.name === name)[0].value;
};

export default getGapOptionValue;
