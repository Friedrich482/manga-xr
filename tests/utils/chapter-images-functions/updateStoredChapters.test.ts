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

    updateStoredChapters("Murim-RPG-Simulation", "chapter-47", 39);

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );
    expect(mockedGetStoredHistory).toHaveBeenCalled();
    expect(updatedHistory.length).toBeGreaterThan(0);
    expect(updatedHistory[0].chapters[1].chapterSlug).toBe("chapter-47");
    expect(updatedHistory[0].chapters[1].page).toBe(39);
  });

  it("should get the updated history from the localStorage with a new chapter and its page", () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);
    updateStoredChapters("Murim-RPG-Simulation", "chapter-25", 5);

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );

    expect(mockedGetStoredHistory).toHaveBeenCalled();
    expect(updatedHistory.length).toBeGreaterThan(0);

    expect(updatedHistory[0].chapters[2]).toBeDefined();
    expect(updatedHistory[0].chapters[2]).toBeTypeOf("object");
    expect(updatedHistory[0].chapters[2].chapterSlug).toBe("chapter-25");
    expect(updatedHistory[0].chapters[2].page).toBe(5);
  });

  it("should get the updated history from the localStorage with a new manga with a chapter and its page", () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);
    updateStoredChapters("Legend-of-the-Northern-Blade", "chapter-170", 3);

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );

    expect(mockedGetStoredHistory).toHaveBeenCalled();
    expect(updatedHistory.length).toBeGreaterThan(0);

    expect(updatedHistory[2]).toBeDefined();
    expect(updatedHistory[2].name).toBe("Legend-of-the-Northern-Blade");

    expect(updatedHistory[2].chapters).toBeInstanceOf(Array);
    expect(updatedHistory[2].chapters[0]).toBeInstanceOf(Object);

    expect(updatedHistory[2].chapters[0].chapterSlug).toBe("chapter-170");
    expect(updatedHistory[2].chapters[0].page).toBe(3);
  });
});
