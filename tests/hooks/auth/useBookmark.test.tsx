import { HttpResponse, http } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { GET_BOOKMARK_SWR_KEY } from "@/lib/cache-keys/swr";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useBookmark from "@/hooks/auth/useBookmark";

const TestComponent = ({
  chapterSlug,
  mangaSlug,
}: {
  chapterSlug: string;
  mangaSlug: string;
}) => {
  const { bookmark, isLoading } = useBookmark(chapterSlug, mangaSlug);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return bookmark ? (
    <div>
      <p>{bookmark.id}</p>
      <p>{bookmark.mangaName}</p>
      <p>{bookmark.chapterSlug}</p>
    </div>
  ) : (
    <div>No bookmark</div>
  );
};

const handlers = [
  http.get(`${GET_BOOKMARK_SWR_KEY}`, ({ request }) => {
    const url = new URL(request.url);
    const chapterSlug = url.searchParams.get("chapterSlug");
    const mangaSlug = url.searchParams.get("mangaSlug");
    return HttpResponse.json({
      bookmark: {
        mangaName: mangaSlug?.replaceAll("-", " ").split("_")[0],
        chapterSlug: chapterSlug?.replaceAll("-", " "),
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
    const { getByText, unmount } = render(
      <SWRConfig
        value={{
          dedupingInterval: 2000,
        }}
      >
        <TestComponent chapterSlug={chapterSlug} mangaSlug={mangaSlug} />
      </SWRConfig>,
    );

    await waitFor(() => {
      expect(getByText(`${chapterSlug}-${mangaSlug}`)).toBeDefined();
      expect(getByText("Tower Of God")).toBeDefined();
      expect(getByText("chapter 4")).toBeDefined();
    });
    unmount();
  });
});
