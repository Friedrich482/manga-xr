import { HttpResponse, http } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { GET_USER_PREFERENCES_SWR_KEY } from "@/lib/cache-keys/swr";
import { Preferences } from "@/zod-schema/schema";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useUserPreferences from "@/hooks/auth/useUserPreferences";

const handlers = [
  // eslint-disable-next-line no-unused-vars
  http.get(`${GET_USER_PREFERENCES_SWR_KEY}`, ({ request }) => {
    const preferences: Preferences = {
      chapterPagesDisposition: "Single Page",
      gapOptionName: "Medium",
      progressBarDirection: "Vertical",
      readingDirection: "From right to left",
      progressBarVisibility: false,
    };
    return HttpResponse.json({ preferences });
  }),
];

const server = setupServer(...handlers);

describe("group", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it("should return the data from the handler", async () => {
    const { unmount, result } = renderHook(() => useUserPreferences(), {
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
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.preferences).toBeDefined();
      expect(result.current.preferences?.chapterPagesDisposition).toBe(
        "Single Page",
      );
    });

    unmount();
  });
});
