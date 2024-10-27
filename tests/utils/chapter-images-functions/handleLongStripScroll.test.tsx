import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CursorClass } from "@/zod-schema/schema";
import handleLongStripScroll from "@/utils/chapter-images-functions/handleLongStripScroll";
import { render } from "@testing-library/react";

const originalScrollBy = window.scrollBy;
const mockScrollBy = vi.fn();
beforeEach(() => {
  window.scrollBy = mockScrollBy;
});

afterEach(() => {
  window.scrollBy = originalScrollBy;
  vi.clearAllMocks();
});

const TestComponent = ({ cursorClass }: { cursorClass: CursorClass }) => {
  handleLongStripScroll(300, cursorClass);
  return <div style={{ width: 300, height: 300 }}>Nothing to see here</div>;
};

describe("handleLongStripScroll", () => {
  it("should scroll to top by 300px", () => {
    const { unmount } = render(<TestComponent cursorClass="cursor-up" />);

    expect(mockScrollBy).toHaveBeenCalledOnce();
    expect(mockScrollBy).toHaveBeenCalledWith({
      top: -300,
      behavior: "smooth",
    });

    unmount();
  });

  it("should scroll to bottom by 300px", () => {
    const { unmount } = render(<TestComponent cursorClass="cursor-down" />);

    expect(mockScrollBy).toHaveBeenCalledOnce();
    expect(mockScrollBy).toHaveBeenCalledWith({
      top: 300,
      behavior: "smooth",
    });

    unmount();
  });
});
