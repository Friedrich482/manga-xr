import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";
import useInitializePageFromHistory from "@/hooks/chapter-images-hooks/useInitializePageFromHistory";
import useStore from "@/hooks/zustand/store";
import useUser from "@/hooks/auth/useUser";
import { userHistoryTest } from "@/lib/constants";

vi.mock("../../../utils/chapter-images-functions/getStoredHistory");
vi.mock("../../../hooks/auth/useUser");

let mockParams = {
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
      chapterSlug: "01JHJHHWB32AF62E40Z7ZT708R",
    };

    mockedPathname = `/chapters/${mockParams.chapterSlug}`;

    const { unmount } = render(<TestComponent />);

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(mockedGetStoredHistory).toHaveBeenCalled();

    const currentPageIndex = useStore.getState().currentPageIndex;
    expect(currentPageIndex).toBe(0);
    unmount();
  });

  it("should get a currentPageIndex of 26", async () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);

    mockParams = {
      chapterSlug: "01JHJK1MY5GMZGZRG2XZQQNPRK",
    };
    mockedPathname = `/chapters/${mockParams.chapterSlug}`;

    const { unmount } = renderHook(() => useInitializePageFromHistory(true));

    expect(mockedGetStoredHistory).toHaveBeenCalled();
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/chapters/01JHJK1MY5GMZGZRG2XZQQNPRK#page-27",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(26);
    });
    unmount();
  });

  it("should get a currentPageIndex of 0", async () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);

    mockParams = {
      chapterSlug: "01JHJRG00AJEVMX9GW50NRD2PG",
    };
    mockedPathname = `/chapters/${mockParams.chapterSlug}`;

    const { unmount } = renderHook(() => useInitializePageFromHistory(true));

    expect(mockedGetStoredHistory).toHaveBeenCalled();

    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/chapters/01JHJRG00AJEVMX9GW50NRD2PG#page-1",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(0);
    });
    unmount();
  });

  it("should update the page if the chapter changes", async () => {
    mockedGetStoredHistory.mockReturnValue(userHistoryTest);

    mockParams = {
      chapterSlug: "01JHJX33WC5Z01948MG0HJ8DYC",
    };
    mockedPathname = `/chapters/${mockParams.chapterSlug}`;

    const { unmount, rerender } = renderHook(() =>
      useInitializePageFromHistory(true),
    );
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/chapters/01JHJX33WC5Z01948MG0HJ8DYC#page-16",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(15);
    });

    mockParams = {
      chapterSlug: "01JHJK1MY5GMZGZRG2XZQQNPRK",
    };
    mockedPathname = `/chapters/${mockParams.chapterSlug}`;

    rerender();

    expect(mockedGetStoredHistory).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(routerPushMock).toHaveBeenCalledWith(
        "/chapters/01JHJK1MY5GMZGZRG2XZQQNPRK#page-27",
        { scroll: true },
      );

      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(26);
    });

    unmount();
  });
});
