import { HttpResponse, http } from "msw";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { GET_BOOKMARK_SWR_KEY } from "@/lib/cache-keys/swr";
import { SWRConfig } from "swr";
import { afterEach } from "node:test";
import { setupServer } from "msw/node";
import useMutateBookmark from "@/hooks/useMutateBookmark";
import { useTheme } from "next-themes";

const handlers = [
  http.get(`${GET_BOOKMARK_SWR_KEY}`, ({ request }) => {
    const url = new URL(request.url);
    const chapterSlug = url.searchParams.get("chapterSlug");
    const mangaSlug = url.searchParams.get("mangaSlug");
    return HttpResponse.json({
      bookmark: {
        mangaName: mangaSlug?.replaceAll("-", " ").split("_")[0],
        chapterSlug: chapterSlug,
        id: `${chapterSlug}-${mangaSlug}`,
      },
    });
  }),
];

const server = setupServer(...handlers);

describe("useMutateBookmark", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  const mangaSlug = "Tower-Of-God_2";
  const chapterSlug = "chapter-4";

  it("should return the bookmark, the mutate function and default toastOptions (light mode)", async () => {
    const { result, unmount } = renderHook(
      () => useMutateBookmark(chapterSlug, mangaSlug),
      {
        wrapper: ({ children }) => (
          <SWRConfig
            value={{
              dedupingInterval: 2000,
              fetcher: (url) => fetch(url).then((res) => res.json()),
            }}
          >
            {children}
          </SWRConfig>
        ),
      },
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

    const { result, unmount } = renderHook(
      () => useMutateBookmark(chapterSlug, mangaSlug),
      {
        wrapper: ({ children }) => (
          <SWRConfig
            value={{
              dedupingInterval: 2000,
              fetcher: (url) => fetch(url).then((res) => res.json()),
            }}
          >
            {children}
          </SWRConfig>
        ),
      },
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

    const { result, unmount } = renderHook(
      () => useMutateBookmark(chapterSlug, mangaSlug),
      {
        wrapper: ({ children }) => (
          <SWRConfig
            value={{
              dedupingInterval: 2000,
              fetcher: (url) => fetch(url).then((res) => res.json()),
            }}
          >
            {children}
          </SWRConfig>
        ),
      },
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
