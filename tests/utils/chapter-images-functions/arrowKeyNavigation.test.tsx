import { LegacyRef, useEffect, useRef } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import arrowKeyNavigation from "@/utils/chapter-images-functions/arrowKeyNavigation";
import useStore from "@/hooks/zustand/store";

const TestComponent = () => {
  const router = useRouter();
  const pathName = usePathname();
  const images: string[] = new Array(10).fill("image");
  const targetRefs = useRef<HTMLImageElement[]>([]);
  const handleKeyDown = (e: KeyboardEvent) => {
    arrowKeyNavigation(e, images, router, pathName);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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

const windowMock = {
  scrollTo: vi.fn(),
};
Object.assign(global, windowMock);

describe("arrowKeyNavigation", () => {
  const originalState = useStore.getState();

  beforeEach(() => {
    useStore.setState(originalState);
  });

  test("the currentPageIndex should be 0", () => {
    const { unmount } = render(<TestComponent />);
    fireEvent.keyDown(document.body, { key: "ArrowLeft", code: 37 });
    const { currentPageIndex } = useStore.getState();

    expect(currentPageIndex).toBe(0);

    unmount();
  });

  test("the currentPageIndex should be 4", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({ ...originalState, currentPageIndex: 5 });
    fireEvent.keyDown(document.body, { key: "ArrowLeft", code: 37 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(4);
    });

    unmount();
  });

  test("the currentPageIndex should be 9", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      currentPageIndex: 9, // 9 = images.length - 1
      readingDirection: "From right to left",
    });

    fireEvent.keyDown(document.body, { key: "ArrowLeft", code: 37 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(9);
    });

    unmount();
  });

  test("the currentPageIndex should be 7", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      currentPageIndex: 6,
      readingDirection: "From right to left",
    });

    fireEvent.keyDown(document.body, { key: "ArrowLeft", code: 37 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(7);
    });

    unmount();
  });

  test("the currentPageIndex should be 9", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      currentPageIndex: 9, // 9 = images.length - 1
    });

    fireEvent.keyDown(document.body, { key: "ArrowRight", code: 39 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(9);
    });

    unmount();
  });

  test("the currentPageIndex should be 7", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      currentPageIndex: 6, // 9 = images.length - 1
    });

    fireEvent.keyDown(document.body, { key: "ArrowRight", code: 39 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(7);
    });

    unmount();
  });

  test("the currentPageIndex should be 0", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      readingDirection: "From right to left",
    });

    fireEvent.keyDown(document.body, { key: "ArrowRight", code: 39 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(0);
    });

    unmount();
  });

  test("the currentPageIndex should be 2", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      readingDirection: "From right to left",
      currentPageIndex: 3,
    });

    fireEvent.keyDown(document.body, { key: "ArrowRight", code: 39 });

    const { currentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(currentPageIndex).toBe(2);
    });

    unmount();
  });

  test("the currentPageIndex should be 0 (neither ArrowLeft nor ArrowRight)", async () => {
    const { unmount } = render(<TestComponent />);
    useStore.setState({
      ...originalState,
      readingDirection: "From right to left",
    });

    fireEvent.keyDown(document.body, { key: "ArrowUp", code: 38 });

    const { currentPageIndex: firstCurrentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(firstCurrentPageIndex).toBe(0);
    });

    fireEvent.keyDown(document.body, { key: "ArrowDown", code: 40 });

    const { currentPageIndex: secondCurrentPageIndex } = useStore.getState();

    await waitFor(async () => {
      expect(secondCurrentPageIndex).toBe(0);
    });

    unmount();
  });
});
