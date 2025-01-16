import { HISTORY_LOCALSTORAGE_KEY, userHistoryTest } from "@/lib/constants";
import { beforeEach, describe, expect, it, vi } from "vitest";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";
import updateStoredChapters from "@/utils/chapter-images-functions/updateStoredChapters";
import { userHistorySchema } from "@/zod-schema/schema";
import { z } from "zod";

vi.mock("../../../utils/chapter-images-functions/getStoredHistory.ts");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("updateStoredChapters", () => {
  const mockedGetStoredHistory = vi.mocked(getStoredHistory);

  it("should get the updated history with the new page from the localStorage", () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);

    updateStoredChapters("01JHJJ20HHP6KW0QA4GK75PH1T", 13);

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );
    expect(mockedGetStoredHistory).toHaveBeenCalled();
    expect(updatedHistory.length).toBeGreaterThan(0);
    expect(updatedHistory.at(-1)?.chapterSlug).toBe(
      "01JHJJ20HHP6KW0QA4GK75PH1T",
    );
    expect(updatedHistory.at(-1)?.page).toBe(13);
  });

  it("should get the updated history from the localStorage with a new chapter and its page", () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);
    updateStoredChapters("01JHJJ20HHP6KW0QA4GK75PH1T", 5);

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );

    expect(mockedGetStoredHistory).toHaveBeenCalled();
    expect(updatedHistory.length).toBeGreaterThan(0);

    expect(updatedHistory.at(-1)).toBeDefined();
    expect(updatedHistory.at(-1)).toBeTypeOf("object");
    expect(updatedHistory.at(-1)?.chapterSlug).toBe(
      "01JHJJ20HHP6KW0QA4GK75PH1T",
    );
    expect(updatedHistory.at(-1)?.page).toBe(5);
  });

  it("should get the updated history from the localStorage with a new manga with a chapter and its page", () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);
    updateStoredChapters("01JHJHHWB32AF62E40Z7ZT708R", 3);

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );

    expect(mockedGetStoredHistory).toHaveBeenCalled();
    expect(updatedHistory.length).toBeGreaterThan(0);

    expect(updatedHistory.at(-1)).toBeDefined();
    expect(updatedHistory.at(-1)?.chapterSlug).toBe(
      "01JHJHHWB32AF62E40Z7ZT708R",
    );

    expect(updatedHistory.at(-1)?.page).toBe(3);
  });
});
