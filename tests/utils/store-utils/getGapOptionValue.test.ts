import { describe, expect, it } from "vitest";
import { gapOptions } from "@/lib/constants";
import getGapOptionValue from "@/utils/store-utils/getGapOptionValue";

describe("getGapOptionValue", () => {
  it.each(gapOptions.map(({ name }) => name))(
    "should return the correct value",
    (input) => {
      expect(getGapOptionValue(input)).toBe(
        gapOptions.find(({ name }) => input === name)?.value,
      );
    },
  );
});
