import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePathname, useRouter } from "next/navigation";
import { CursorClass } from "@/zod-schema/schema";
import handleImageClick from "@/utils/chapter-images-functions/handleImageClick";
import handleLongStripScroll from "@/utils/chapter-images-functions/handleLongStripScroll";
import handleSinglePageNavigation from "@/utils/chapter-images-functions/handleSinglePageNavigation";
import { render } from "@testing-library/react";
import useStore from "@/hooks/zustand/store";

vi.mock("../../../utils/chapter-images-functions/handleLongStripScroll");
vi.mock("../../../utils/chapter-images-functions/handleSinglePageNavigation");

const initialState = useStore.getState();

afterEach(() => {
  vi.clearAllMocks();
});

const images = new Array<string>(10).fill("image");

const TestComponent = ({ cursorClass }: { cursorClass: CursorClass }) => {
  const router = useRouter();
  const pathName = usePathname();
  handleImageClick(cursorClass, router, images, pathName);
  return <div style={{ width: 300, height: 300 }}>Nothing to see here</div>;
};

describe("handleImageClick", () => {
  beforeEach(() => {
    useStore.setState(initialState);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  const mockedHandleLongStripScroll = vi.mocked(handleLongStripScroll);
  const mockedHandleSinglePageNavigation = vi.mocked(
    handleSinglePageNavigation,
  );

  it("should call handleLongStripScroll", () => {
    const { unmount } = render(<TestComponent cursorClass="cursor-up" />);

    expect(mockedHandleLongStripScroll).toHaveBeenCalledOnce();

    unmount();
  });

  it("should call handleSinglePageNavigation", () => {
    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });

    const { unmount } = render(<TestComponent cursorClass="cursor-up" />);

    expect(mockedHandleSinglePageNavigation).toHaveBeenCalledOnce();

    unmount();
  });
});
