import { LegacyRef, useEffect, useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { scrollToTopOffset } from "@/lib/constants";
import updateUrlAndScrollToTop from "@/utils/chapter-images-functions/updateUrlAndScrollToTop";

// override the global "next/navigation" mock

const mockRoutePush = vi.fn();
vi.mock("next/navigation", async () => {
  return {
    useRouter: () => {
      return {
        push: mockRoutePush,
      };
    },
    usePathname: vi.fn(() => ""),
  };
});
const windowMock = {
  scrollTo: vi.fn(),
};
Object.assign(global, windowMock);

afterEach(() => {
  vi.clearAllMocks();
});

const TestComponent = ({ newPageIndex }: { newPageIndex?: number }) => {
  const router = useRouter();
  const pathName = usePathname();
  const targetRefs = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    updateUrlAndScrollToTop(targetRefs, router, pathName, newPageIndex);
  }, []);
  return (
    <div>
      {new Array(10).fill(1).map((_, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          alt={`${index}`}
          style={{
            height: 300,
            width: 200,
            offset: 2,
          }}
          ref={
            ((el: HTMLImageElement) =>
              (targetRefs.current[index] = el)) as unknown as
              | LegacyRef<HTMLImageElement>
              | undefined
          }
        />
      ))}
    </div>
  );
};

describe("updateUrlAndScrollToTop", () => {
  it("should scroll to the offset", async () => {
    const newPageIndex = 5;
    const { unmount } = render(<TestComponent newPageIndex={newPageIndex} />);
    await waitFor(async () => {
      expect(windowMock.scrollTo).toHaveBeenCalledOnce();
      expect(windowMock.scrollTo).toHaveBeenCalledWith({
        behavior: "smooth",
        top: scrollToTopOffset,
      });
    });
    unmount();
  });

  it("should call router.push and use the newPageIndex", async () => {
    const newPageIndex = 5;
    const { unmount } = render(<TestComponent newPageIndex={newPageIndex} />);

    await waitFor(async () => {
      expect(mockRoutePush).toHaveBeenCalled();
      expect(mockRoutePush).toHaveBeenCalledWith(`#page-${newPageIndex + 1}`, {
        scroll: false,
      });
    });
    unmount();
  });

  it("should call router.push and use the currentPage index", async () => {
    const { unmount } = render(<TestComponent />);

    await waitFor(async () => {
      expect(mockRoutePush).toHaveBeenCalled();
      expect(mockRoutePush).toHaveBeenCalledWith("#page-1", {
        scroll: false,
      });
    });
    unmount();
  });
});
