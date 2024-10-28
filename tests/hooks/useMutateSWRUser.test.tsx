import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useMutateSWRUser from "@/hooks/useMutateSWRUser";
import useUser from "@/hooks/auth/useUser";

vi.mock("../../hooks/auth/useUser");

describe("useMutateSWRUSer", () => {
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

  it("should return the user, the mutate function and toastOptions", async () => {
    const { result, unmount } = renderHook(() => useMutateSWRUser());

    await waitFor(() => {
      expect(result.current.user).toBeDefined();
      expect(result.current.user?.username).toBe("Lol");

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutate).toBeTypeOf("function");

      expect(result.current.toastOptions).toBeDefined();
    });

    unmount();
  });
});
