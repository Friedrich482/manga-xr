import { describe, expect, it, vi } from "vitest";
import defineCursorShape from "@/utils/defineCursorShape";
import handleMouseMove from "@/utils/chapter-images-functions/handleMouseMove";

vi.mock("../../../utils/defineCursorShape");
const images = new Array<string>(10).fill("image");

describe("handleMouseMove", () => {
  const e = {
    nativeEvent: {
      clientX: 50,
      clientY: 60,
    },
  } as React.MouseEvent<HTMLImageElement, MouseEvent>;

  const setCursorClass = vi.fn();
  const mockedDefineCursorShape = vi.mocked(defineCursorShape);
  mockedDefineCursorShape.mockReturnValue("cursor-up");

  it("should call defineCursorShape and setCursorClass", () => {
    handleMouseMove(e, images, setCursorClass);

    expect(mockedDefineCursorShape).toHaveBeenCalled();
    expect(setCursorClass).toHaveBeenCalledWith("cursor-up");
  });
});
