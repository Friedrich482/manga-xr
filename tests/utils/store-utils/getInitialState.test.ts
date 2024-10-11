import {
  chapterPagesDispositionSchema,
  progressBarDirectionSchema,
  readingDirectionSchema,
} from "@/zod-schema/schema";
import { describe, expect, it } from "vitest";
import getInitialState from "@/utils/store-utils/getInitialState";
import { z } from "zod";

describe("getInitialState", () => {
  const prefArray = [
    {
      schema: progressBarDirectionSchema,
      key: "progressBarDirection",
      altState: "Horizontal",
      localStorageValue: "Vertical",
    },
    {
      schema: z.boolean(),
      key: "progressBarVisibility",
      altState: true,
      localStorageValue: false,
    },
    {
      schema: chapterPagesDispositionSchema,
      key: "chapterPagesDisposition",
      altState: "Long Strip",
      localStorageValue: "Single Page",
    },
    {
      schema: readingDirectionSchema,
      key: "readingDirection",
      altState: "From left to right",
      localStorageValue: "From right to left",
    },
  ] as const;
  it.each(prefArray)(
    "should return the localStorageValue",
    ({ altState, key, schema, localStorageValue }) => {
      localStorage.setItem(key, JSON.stringify(localStorageValue));
      expect(getInitialState(schema, key, altState)).toBe(localStorageValue);
      localStorage.removeItem(key);
    },
  );

  it.each(prefArray)(
    "should return the altState",
    ({ altState, key, schema }) => {
      localStorage.removeItem(key);
      expect(getInitialState(schema, key, altState)).toBe(altState);
    },
  );

  it("should throw the altState because the value is not stringified before been set as a localstorage value", () => {
    localStorage.setItem("readingDirection", "From left to right");
    expect(
      getInitialState(z.boolean(), "readingDirection", "From right to left"),
    ).toBe("From right to left");
  });

  it("should fail the zod schema parse", () => {
    localStorage.setItem(
      "readingDirection",
      JSON.stringify("From left to right"),
    );
    expect(
      getInitialState(z.boolean(), "readingDirection", "From right to left"),
    ).toBe("From right to left");
  });

  it("should not found the localStorage", () => {
    // @ts-ignore
    localStorage = undefined;
    expect(
      getInitialState(
        chapterPagesDispositionSchema,
        "chapterPagesDisposition",
        "Long Strip",
      ),
    ).toBe("Long Strip");
  });
});
