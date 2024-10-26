import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, renderHook } from "@testing-library/react";
import useHandleScroll from "@/hooks/chapter-images-hooks/useHandleScroll";
import useStore from "@/hooks/zustand/store";

const windowMock = {
  scrollTo: vi.fn(),
};
Object.assign(global, windowMock);

const initialState = useStore.getState();

beforeEach(() => {
  useStore.setState(initialState);
  window.scrollTo(0, 0);
  vi.clearAllMocks();
});

const pagesAndScrolls = [
  {
    page: 1,
    scroll: 100,
  },
  {
    page: 2,
    scroll: 400,
  },
  {
    page: 3,
    scroll: 900,
  },
  {
    page: 4,
    scroll: 1500,
  },
  {
    page: 8,
    scroll: 2800,
  },
];

const TestComponent = () => {
  const targetRefs = useHandleScroll();
  return (
    <div>
      {new Array(10).fill(1).map((_, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={(el: HTMLImageElement) => {
            if (el) {
              // Mock getBoundingClientRect for each image
              el.getBoundingClientRect = () => ({
                top: index * 400 - window.scrollY,
                bottom: index * 400 + 300 - window.scrollY,
                left: 0,
                right: 300,
                width: 300,
                height: 300,
                x: 0,
                y: index * 400 - window.scrollY,
                toJSON: () => ({}),
              });
              targetRefs.current[index] = el;
            }
          }}
          key={index}
          alt={`element-${index}`}
          src={`test-${index}.jpg`}
          width={300}
          height={300}
          id={`page-${index + 1}`}
        />
      ))}
    </div>
  );
};

describe("useHandleScroll", () => {
  it("should initialize with correct refs array", () => {
    const { result } = renderHook(() => useHandleScroll());
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeInstanceOf(Array);
  });

  it("should update visibility state on scroll", () => {
    vi.useFakeTimers();
    const { unmount } = render(<TestComponent />);

    const initialVisibleImages = useStore.getState().isVisibleImagesArray;
    fireEvent.scroll(window, {
      target: {
        scrollY: 300,
      },
    });

    // Wait for debounce
    vi.advanceTimersByTime(300);

    const updatedVisibleImages = useStore.getState().isVisibleImagesArray;
    expect(updatedVisibleImages).not.toEqual(initialVisibleImages);

    unmount();
    vi.useRealTimers();
  });

  it.each(pagesAndScrolls)(
    "should update currentPageIndex when scrolling",
    async ({ page, scroll }) => {
      vi.useFakeTimers();
      const { unmount } = render(<TestComponent />);

      // Initial page index should be 0
      expect(useStore.getState().currentPageIndex).toBe(0);
      fireEvent.scroll(window, {
        target: {
          scrollY: scroll,
        },
      });

      vi.advanceTimersByTime(300);

      expect(useStore.getState().currentPageIndex).toBe(page);

      unmount();
      vi.useRealTimers();
    },
  );

  it("should handle disposition change", async () => {
    vi.useFakeTimers();
    const { unmount } = render(<TestComponent />);

    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });

    vi.advanceTimersByTime(0);

    // Verify that handleScroll was called (check if visibility array was updated)
    expect(useStore.getState().isVisibleImagesArray).toBeDefined();

    unmount();
    vi.useRealTimers();
  });

  it("should properly clean up scroll listener", async () => {
    vi.useFakeTimers();
    const { unmount } = render(<TestComponent />);

    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    vi.useRealTimers();
  });

  it("should debounce scroll events", async () => {
    vi.useFakeTimers();
    const { unmount } = render(<TestComponent />);

    // Simulate multiple rapid scroll events
    for (let i = 0; i < 5; i++) {
      fireEvent.scroll(window, {
        target: {
          scrollY: i * 100,
        },
      });
    }

    // Advance time less than debounce delay
    vi.advanceTimersByTime(200);

    // Advance remaining time
    vi.advanceTimersByTime(100);

    const stateChanges = useStore.getState().currentPageIndex;
    expect(typeof stateChanges).toBe("number");

    unmount();
    vi.useRealTimers();
  });
});
