import { HttpResponse, http } from "msw";
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
import { render, renderHook, waitFor } from "@testing-library/react";
import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { PartialUser } from "@/zod-schema/schema";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useInitializePageFromHistory from "@/hooks/chapter-images-hooks/useInitializePageFromHistory";
import useStore from "@/hooks/zustand/store";
import { userHistory } from "@/tests/utils/chapter-images-functions/getStoredHistory.test";

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

let mockParams = {
  mangaSlug: "",
  chapterSlug: "",
};
let mockedPathname = "";

const routerPushMock = vi.fn();

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useParams: () => mockParams,
    usePathname: () => mockedPathname,
    useRouter: () => ({
      push: routerPushMock,
    }),
  };
});

const TestComponent = () => {
  useInitializePageFromHistory(true);
  return (
    <SWRConfig
      value={{
        dedupingInterval: 2000,
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      <></>
    </SWRConfig>
  );
};

describe("useInitializePageFromHistory", () => {
  const initialState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialState);
    localStorage.removeItem(HISTORY_LOCALSTORAGE_KEY);
  });
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it("should get a currentPageIndex of 0", () => {
    // no history because there is nothing in the localStorage
    mockParams = {
      chapterSlug: "chapter-49",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount } = render(<TestComponent />);

    expect(routerPushMock).toHaveBeenCalledOnce();

    const currentPageIndex = useStore.getState().currentPageIndex;
    expect(currentPageIndex).toBe(0);
    unmount();
  });

  it("should get a currentPageIndex of 26", async () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(userHistory));

    mockParams = {
      chapterSlug: "chapter-47",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount } = renderHook(() => useInitializePageFromHistory(true), {
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
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/manga/Murim-RPG-Simulation/chapter-47#page-27",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(26);
    });
    unmount();
  });

  it("should get a currentPageIndex of 0", async () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(userHistory));

    mockParams = {
      chapterSlug: "chapter-11",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount } = renderHook(() => useInitializePageFromHistory(true), {
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
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/manga/Murim-RPG-Simulation/chapter-11#page-1",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(0);
    });
    unmount();
  });

  it("should update the page if the chapter changes", async () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(userHistory));

    mockParams = {
      chapterSlug: "chapter-19",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount, rerender } = renderHook(
      () => useInitializePageFromHistory(true),
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
      expect(routerPushMock).toHaveBeenCalledWith(
        "/manga/Murim-RPG-Simulation/chapter-19#page-16",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(15);
    });

    mockParams = {
      chapterSlug: "chapter-47",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    rerender();

    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/manga/Murim-RPG-Simulation/chapter-47#page-27",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(26);
    });

    unmount();
  });
});
