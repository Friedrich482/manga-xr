import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import updateStoredChapters from "@/utils/chapter-images-functions/updateStoredChapters";
import useLastPageRead from "@/hooks/history/useLastPageRead";
import useStore from "@/hooks/zustand/store";
import useUser from "@/hooks/auth/useUser";

vi.mock("../../../utils/chapter-images-functions/updateStoredChapters");
vi.mock("../../../hooks/auth/useUser");

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

const initialState = useStore.getState();

describe("useLastPageRead", () => {
  beforeEach(() => {
    useStore.setState(initialState);
  });

  const mockedUpdateStoredChapters = vi.mocked(updateStoredChapters);
  const mockedUser = vi.mocked(useUser);

  it("should call updateStoredChapters", async () => {
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
    mockParams = {
      mangaSlug: "Murim-RPG-Simulation",
      chapterSlug: "chapter-25",
    };
    const { unmount } = renderHook(() => useLastPageRead(true));

    await waitFor(async () => {
      expect(mockedUpdateStoredChapters).toHaveBeenCalled();
    });

    unmount();
  });
});
