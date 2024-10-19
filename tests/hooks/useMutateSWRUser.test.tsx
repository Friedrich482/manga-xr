import { HttpResponse, http } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { GET_USER_SWR_KEY } from "@/lib/cache-keys/swr";
import { PartialUser } from "@/zod-schema/schema";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useMutateSWRUser from "@/hooks/useMutateSWRUser";

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

describe("useMutateSWRUSer", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it("should return the user, the mutate function and toastOptions", async () => {
    const { result, unmount } = renderHook(() => useMutateSWRUser(), {
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
      expect(result.current.user).toBeDefined();
      expect(result.current.user?.username).toBe("Lol");

      expect(result.current.mutate).toBeDefined();
      expect(result.current.mutate).toBeTypeOf("function");

      expect(result.current.toastOptions).toBeDefined();
    });

    unmount();
  });
});
