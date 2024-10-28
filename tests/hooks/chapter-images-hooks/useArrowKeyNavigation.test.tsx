import { LegacyRef, useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import arrowKeyNavigation from "@/utils/chapter-images-functions/arrowKeyNavigation";
import useArrowKeyNavigation from "@/hooks/chapter-images-hooks/useArrowKeyNavigation";
import useStore from "@/hooks/zustand/store";

vi.mock("../../../utils/chapter-images-functions/arrowKeyNavigation");

const TestComponent = () => {
  const images: string[] = new Array(10).fill("image");
  const targetRefs = useRef<HTMLImageElement[]>([]);
  useArrowKeyNavigation(images);
  return (
    <>
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
    </>
  );
};

describe("useArrowKeyNavigation", () => {
  const initialState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockedArrowKeyNavigation = vi.mocked(arrowKeyNavigation);

  it("should not call arrowKeyNavigation", async () => {
    const { unmount } = render(<TestComponent />);
    fireEvent.keyDown(document.body, { key: "ArrowLeft", code: 37 });

    expect(mockedArrowKeyNavigation).not.toHaveBeenCalled();

    unmount();
  });

  it("should call arrowKeyNavigation", () => {
    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });
    const { unmount } = render(<TestComponent />);
    fireEvent.keyDown(document.body, { key: "ArrowRight", code: 37 });

    expect(mockedArrowKeyNavigation).toHaveBeenCalled();

    unmount();
  });
});
