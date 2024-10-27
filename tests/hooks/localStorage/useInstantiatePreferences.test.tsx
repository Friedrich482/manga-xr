import { HttpResponse, http } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { GET_USER_PREFERENCES_SWR_KEY } from "@/lib/cache-keys/swr";
import { Preferences } from "@/zod-schema/schema";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import useInstantiatePreferences from "@/hooks/localStorage/useInstantiatePreferences";
import useStore from "@/hooks/zustand/store";

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
const initialState = useStore.getState();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig
    value={{
      dedupingInterval: 0,
      provider: () => new Map(), // Use new cache for each test
      fetcher: (url) => fetch(url).then((res) => res.json()),
    }}
  >
    {children}
  </SWRConfig>
);

describe("group", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    useStore.setState(initialState);
  });

  it("should set the preferences to the values returned by the handler", async () => {
    const { result, unmount } = renderHook(() => useInstantiatePreferences(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      const {
        progressBarDirection,
        progressBarVisibility,
        chapterPagesDisposition,
        readingDirection,
        gapOption,
      } = useStore.getState();

      expect(result.current).toBe(true);
      expect(progressBarDirection).toBe("Vertical");
      expect(progressBarVisibility).toBe(false);
      expect(chapterPagesDisposition).toBe("Single Page");
      expect(readingDirection).toBe("From right to left");
      expect(gapOption.name).toBe("Medium");
    });

    unmount();
  });

  it("should set the preferences to the default values", async () => {
    server.use(
      // eslint-disable-next-line no-unused-vars
      http.get(`${GET_USER_PREFERENCES_SWR_KEY}`, ({ request }) => {
        return HttpResponse.json({ preferences: null });
      }),
    );
    const { result, unmount } = renderHook(() => useInstantiatePreferences(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      const {
        progressBarDirection,
        progressBarVisibility,
        chapterPagesDisposition,
        readingDirection,
        gapOption,
      } = useStore.getState();

      expect(result.current).toBe(true);
      expect(progressBarDirection).toBe("Horizontal");
      expect(progressBarVisibility).toBe(true);
      expect(chapterPagesDisposition).toBe("Long Strip");
      expect(readingDirection).toBe("From left to right");
      expect(gapOption.name).toBe("No gap");
    });

    unmount();
  });
});
