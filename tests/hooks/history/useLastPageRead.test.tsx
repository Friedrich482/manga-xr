import { HttpResponse, http } from "msw";
import { PartialUser, userHistorySchema } from "@/zod-schema/schema";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useLastPageRead from "@/hooks/history/useLastPageRead";
import useStore from "@/hooks/zustand/store";
import { userHistory } from "@/tests/utils/chapter-images-functions/getStoredHistory.test";
import { z } from "zod";

let mockParams = {
  mangaSlug: "",
  chapterSlug: "",
};

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useParams: () => mockParams,
  };
});

const handlers = [
  // eslint-disable-next-line no-unused-vars
  http.get(`${GET_USER_SWR_KEY}`, ({ request }) => {
    const user: PartialUser = {
      email: "lol12345@gmail.com",
      username: "Lol",
      avatarHueValue: 49,
      avatarIconPath: "/assets/avatars/one-piece/op17.svg",
      uploadedAvatarUrl: "lol.svg",
    };
    return HttpResponse.json({ user });
  }),
];

const server = setupServer(...handlers);
const originalState = useStore.getState();

describe("useLastPageRead", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(userHistory));
    useStore.setState(originalState);
  });

  it("should get the updated history with the new page from the localStorage", async () => {
    mockParams = {
      mangaSlug: "Murim-RPG-Simulation",
      chapterSlug: "chapter-47",
    };
    const { unmount } = renderHook(() => useLastPageRead(true), {
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
    });

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );
    console.dir(updatedHistory, { depth: Infinity });

    await waitFor(() => {
      expect(updatedHistory.length).toBeGreaterThan(0);
      expect(updatedHistory[0].chapters[1].chapterSlug).toBe("chapter-47");
      expect(updatedHistory[0].chapters[1].page).toBe(27);
    });

    unmount();
  });

  it("should get the updated history from the localStorage with a new chapter and its page", async () => {
    mockParams = {
      mangaSlug: "Murim-RPG-Simulation",
      chapterSlug: "chapter-25",
    };
    const { unmount } = renderHook(() => useLastPageRead(true), {
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
    });

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );

    await waitFor(() => {
      expect(updatedHistory.length).toBeGreaterThan(0);

      expect(updatedHistory[0].chapters[2]).toBeDefined();
      expect(updatedHistory[0].chapters[2]).toBeTypeOf("object");
      expect(updatedHistory[0].chapters[2].chapterSlug).toBe("chapter-25");
      expect(updatedHistory[0].chapters[2].page).toBe(1);
    });

    unmount();
  });

  it("should get the updated history from the localStorage with a new manga with a chapter and its page", async () => {
    mockParams = {
      mangaSlug: "Legend-of-the-Northern-Blade",
      chapterSlug: "chapter-170",
    };
    useStore.setState({ ...originalState, currentPageIndex: 7 });

    const { unmount } = renderHook(() => useLastPageRead(true), {
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
    });

    const updatedHistory = userHistorySchema.parse(
      JSON.parse(
        z.string().parse(localStorage.getItem(HISTORY_LOCALSTORAGE_KEY)),
      ),
    );

    await waitFor(() => {
      expect(updatedHistory.length).toBeGreaterThan(0);

      expect(updatedHistory[2]).toBeDefined();
      expect(updatedHistory[2].name).toBe("Legend-of-the-Northern-Blade");

      expect(updatedHistory[2].chapters).toBeInstanceOf(Array);
      expect(updatedHistory[2].chapters[0]).toBeInstanceOf(Object);

      expect(updatedHistory[2].chapters[0].chapterSlug).toBe("chapter-170");
      expect(updatedHistory[2].chapters[0].page).toBe(8);
    });

    unmount();
  });
});
