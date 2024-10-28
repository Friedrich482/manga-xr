import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";
import useInitializePageFromHistory from "@/hooks/chapter-images-hooks/useInitializePageFromHistory";
import useStore from "@/hooks/zustand/store";
import useUser from "@/hooks/auth/useUser";
import { userHistory } from "@/lib/constants";

vi.mock("../../../utils/chapter-images-functions/getStoredHistory");
vi.mock("../../../hooks/auth/useUser");

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
  return <></>;
};

describe("useInitializePageFromHistory", () => {
  const initialState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialState);
    vi.clearAllMocks();
  });

  const mockedGetStoredHistory = vi.mocked(getStoredHistory);
  const mockedUser = vi.mocked(useUser);
  mockedUser.mockReturnValue({
    user: {
      email: "lol12345@gmail.com",
      username: "Lol",
      avatarHueValue: 49,
      avatarIconPath: "/assets/avatars/one-piece/op17.svg",
      uploadedAvatarUrl: "lol.svg",
    },
    error: undefined,
    isLoading: false,
  });

  it("should get a currentPageIndex of 0", () => {
    mockedGetStoredHistory.mockReturnValue([]);

    mockParams = {
      chapterSlug: "chapter-49",
      mangaSlug: "Murim-RPG-Simulation",
    };

    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount } = render(<TestComponent />);

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(mockedGetStoredHistory).toHaveBeenCalled();

    const currentPageIndex = useStore.getState().currentPageIndex;
    expect(currentPageIndex).toBe(0);
    unmount();
  });

  it("should get a currentPageIndex of 26", async () => {
    mockedGetStoredHistory.mockReturnValue(userHistory);

    mockParams = {
      chapterSlug: "chapter-47",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount } = renderHook(() => useInitializePageFromHistory(true));

    expect(mockedGetStoredHistory).toHaveBeenCalled();
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
    mockedGetStoredHistory.mockReturnValue(userHistory);

    mockParams = {
      chapterSlug: "chapter-11",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount } = renderHook(() => useInitializePageFromHistory(true));

    expect(mockedGetStoredHistory).toHaveBeenCalled();
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
    mockedGetStoredHistory.mockReturnValue(userHistory);

    mockParams = {
      chapterSlug: "chapter-19",
      mangaSlug: "Murim-RPG-Simulation",
    };
    mockedPathname = `/manga/${mockParams.mangaSlug}/${mockParams.chapterSlug}`;

    const { unmount, rerender } = renderHook(() =>
      useInitializePageFromHistory(true),
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

    expect(mockedGetStoredHistory).toHaveBeenCalledTimes(2);
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
