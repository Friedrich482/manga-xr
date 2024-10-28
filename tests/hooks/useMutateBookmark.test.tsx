import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useBookmark from "@/hooks/auth/useBookmark";
import useMutateBookmark from "@/hooks/useMutateBookmark";
import { useTheme } from "next-themes";

vi.mock("../../hooks/auth/useBookmark");

describe("useMutateBookmark", () => {
  const mockedBookmark = vi.mocked(useBookmark);

  const mangaSlug = "Tower-Of-God_2";
  const chapterSlug = "chapter-4";

  mockedBookmark.mockReturnValue({
    bookmark: {
      mangaName: mangaSlug?.replaceAll("-", " ").split("_")[0],
      chapterSlug: chapterSlug,
      id: `${chapterSlug}-${mangaSlug}`,
    },
    error: undefined,
    isLoading: false,
  });

  it("should return the bookmark, the mutate function and default toastOptions (light mode)", async () => {
    const { result, unmount } = renderHook(() =>
      useMutateBookmark(chapterSlug, mangaSlug),
    );
    await waitFor(() => {
      expect(result.current.bookmark).toBeDefined();
      expect(result.current.bookmark).toStrictEqual({
        chapterSlug: "chapter-4",
        mangaName: "Tower Of God",
        id: "chapter-4-Tower-Of-God_2",
      });
      expect(result.current.toastOptions.style).toStrictEqual({
        background: "rgb(15,15, 15)",
        color: "#ffffff",
      });
      expect(result.current.mutate).toBeDefined();
    });
    unmount();
  });

  it("should return the bookmark, the mutate function and dark mode toastOptions", async () => {
    vi.mocked(useTheme).mockReturnValue({
      ...useTheme(),
      resolvedTheme: "dark",
    });

    const { result, unmount } = renderHook(() =>
      useMutateBookmark(chapterSlug, mangaSlug),
    );
    await waitFor(() => {
      expect(result.current.bookmark).toBeDefined();
      expect(result.current.bookmark).toStrictEqual({
        chapterSlug: "chapter-4",
        mangaName: "Tower Of God",
        id: "chapter-4-Tower-Of-God_2",
      });
      expect(result.current.toastOptions.style).toStrictEqual({
        background: "rgb(247, 247, 247)",
        color: "#000000",
      });
    });
    unmount();
  });

  it("should return the bookmark, the mutate function and dark mode toastOptions", async () => {
    vi.mocked(useTheme).mockReturnValue({
      ...useTheme(),
      resolvedTheme: "dark",
    });

    const { result, unmount } = renderHook(() =>
      useMutateBookmark(chapterSlug, mangaSlug),
    );
    await waitFor(() => {
      expect(result.current.bookmark).toBeDefined();
      expect(result.current.bookmark).toStrictEqual({
        chapterSlug: "chapter-4",
        mangaName: "Tower Of God",
        id: "chapter-4-Tower-Of-God_2",
      });
      expect(result.current.toastOptions.style).toStrictEqual({
        background: "rgb(247, 247, 247)",
        color: "#000000",
      });
    });
    expect(result.current.mutate).toBeDefined();
    expect(result.current.mutate).toBeTypeOf("function");
    unmount();
  });
});
