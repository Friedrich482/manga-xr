import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePathname, useRouter } from "next/navigation";
import { CursorClass } from "@/zod-schema/schema";
import handleSinglePageNavigation from "@/utils/chapter-images-functions/handleSinglePageNavigation";
import { render } from "@testing-library/react";
import updateUrlAndScrollToTop from "@/utils/chapter-images-functions/updateUrlAndScrollToTop";
import useStore from "@/hooks/zustand/store";

vi.mock("../../../utils/chapter-images-functions/updateUrlAndScrollToTop");

const initialState = useStore.getState();
const images = new Array<string>(10).fill("image");

const TestComponent = ({ cursorClass }: { cursorClass: CursorClass }) => {
  const router = useRouter();
  const pathName = usePathname();

  handleSinglePageNavigation(cursorClass, images, router, pathName);
  return <div style={{ width: 300, height: 300 }}>Nothing to see here</div>;
};

describe("handleSinglePageNavigation", () => {
  beforeEach(() => {
    useStore.setState(initialState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockedUpdateUrlAndScrollToTop = vi.mocked(updateUrlAndScrollToTop);

  it("should get 1 as currentPageIndex", () => {
    const { unmount } = render(<TestComponent cursorClass="cursor-right" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(1);
    expect(mockedUpdateUrlAndScrollToTop).toHaveBeenCalled();

    unmount();
  });

  it("should get 6 as currentPageIndex", () => {
    useStore.setState({ ...initialState, currentPageIndex: 5 });
    const { unmount } = render(<TestComponent cursorClass="cursor-right" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(6);
    expect(mockedUpdateUrlAndScrollToTop).toHaveBeenCalled();

    unmount();
  });

  it("should get 9 as currentPageIndex", () => {
    useStore.setState({ ...initialState, currentPageIndex: 9 }); // images.length -1 = 9
    const { unmount } = render(<TestComponent cursorClass="cursor-right" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(9);
    expect(mockedUpdateUrlAndScrollToTop).not.toHaveBeenCalled();

    unmount();
  });

  it("should get 4 as currentPageIndex", () => {
    useStore.setState({ ...initialState, currentPageIndex: 5 });
    const { unmount } = render(<TestComponent cursorClass="cursor-left" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(4);
    expect(mockedUpdateUrlAndScrollToTop).toHaveBeenCalled();

    unmount();
  });

  it("should get 0 as currentPageIndex", () => {
    useStore.setState({ ...initialState, currentPageIndex: 0 });
    const { unmount } = render(<TestComponent cursorClass="cursor-left" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(0);
    expect(mockedUpdateUrlAndScrollToTop).not.toHaveBeenCalled();

    unmount();
  });

  it("should get 6 as currentPageIndex", () => {
    useStore.setState({
      ...initialState,
      readingDirection: "From right to left",
      currentPageIndex: 7,
    });
    const { unmount } = render(<TestComponent cursorClass="cursor-right" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(6);
    expect(mockedUpdateUrlAndScrollToTop).toHaveBeenCalled();

    unmount();
  });

  it("should get 0 as currentPageIndex", () => {
    useStore.setState({
      ...initialState,
      readingDirection: "From right to left",
      currentPageIndex: 0,
    });
    const { unmount } = render(<TestComponent cursorClass="cursor-right" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(0);
    expect(mockedUpdateUrlAndScrollToTop).not.toHaveBeenCalled();

    unmount();
  });

  it("should get 8 as currentPageIndex", () => {
    useStore.setState({
      ...initialState,
      readingDirection: "From right to left",
      currentPageIndex: 7,
    });
    const { unmount } = render(<TestComponent cursorClass="cursor-left" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(mockedUpdateUrlAndScrollToTop).toHaveBeenCalled();
    expect(currentPageIndex).toBe(8);

    unmount();
  });

  it("should get 9 as currentPageIndex", () => {
    useStore.setState({
      ...initialState,
      readingDirection: "From right to left",
      currentPageIndex: 9, // 9 = images.length - 1
    });
    const { unmount } = render(<TestComponent cursorClass="cursor-left" />);

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(mockedUpdateUrlAndScrollToTop).not.toHaveBeenCalled();
    expect(currentPageIndex).toBe(9);

    unmount();
  });
});
