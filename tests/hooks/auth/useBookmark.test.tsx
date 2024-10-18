import { HttpResponse, http } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { GET_BOOKMARK_SWR_KEY } from "@/lib/cache-keys/swr";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useBookmark from "@/hooks/auth/useBookmark";

const handlers = [
  http.get(`${GET_BOOKMARK_SWR_KEY}`, ({ request }) => {
    const url = new URL(request.url);
    const chapterSlug = url.searchParams.get("chapterSlug");
    const mangaSlug = url.searchParams.get("mangaSlug");
    return HttpResponse.json({
      bookmark: {
        mangaName: mangaSlug?.replaceAll("-", " ").split("_")[0],
        chapterSlug,
        id: `${chapterSlug}-${mangaSlug}`,
      },
    });
  }),
];

const server = setupServer(...handlers);

describe("useBookmark", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it("should return the data from the handler", async () => {
    const mangaSlug = "Tower-Of-God_2";
    const chapterSlug = "chapter-4";
    const { unmount, result } = renderHook(
      () => useBookmark(chapterSlug, mangaSlug),
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
        mangaName: "Tower Of God",
        chapterSlug: "chapter-4",
        id: "chapter-4-Tower-Of-God_2",
      });
    });
    unmount();
  });
});
