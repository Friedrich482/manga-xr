import { Dispatch, SetStateAction } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, renderHook } from "@testing-library/react";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";

const TestComponent = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useHandleOutsideClick(visible, setVisible);
  return (
    <div
      data-testid="test-element"
      style={{ width: 40, height: 40, top: 0, left: 0 }}
      ref={ref}
    >
      Test
    </div>
  );
};

describe("useHandleOutsideClick", () => {
  it("should return a ref object on a HTMLDiv Element that is initially null", () => {
    const visible = false;
    const setVisible = vi.fn();
    const { result } = renderHook(() =>
      useHandleOutsideClick(visible, setVisible),
    );
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it("should set the visible state to false when there is click outside", () => {
    const visible: boolean = true;
    const setVisible = vi.fn();
    const outsideDivCoordinates = { x: 400, y: 2 };

    const { unmount } = render(
      <TestComponent visible={visible} setVisible={setVisible} />,
    );

    fireEvent.click(document.body, {
      clientX: outsideDivCoordinates.x,
      clientY: outsideDivCoordinates.y,
    });
    expect(setVisible).toHaveBeenCalledTimes(1);
    expect(setVisible).toHaveBeenCalledWith(false);

    setVisible.mockClear();
    unmount();
  });

  it("should NOT set the visible state to false when there is click inside", () => {
    const visible: boolean = true;
    const setVisible = vi.fn();

    const { getByTestId } = render(
      <TestComponent visible={visible} setVisible={setVisible} />,
    );
    const element = getByTestId("test-element");

    fireEvent.click(element);

    expect(setVisible).not.toHaveBeenCalled();
  });
});
