import { describe, expect, it } from "vitest";
import { fireEvent, render, renderHook } from "@testing-library/react";
import Image from "next/image";
import useLogoRotation from "@/hooks/useLogoRotation";

const TestComponent = () => {
  const ref = useLogoRotation();
  return (
    <Image
      ref={ref}
      src="/logo.png"
      data-testid="test-image"
      alt="Logo"
      width={40}
      height={40}
      style={{ top: 0, left: 0 }}
    />
  );
};

describe("useLogoRotation", () => {
  it("should a ref on an HTMLImageElement that is initially null", () => {
    const { result } = renderHook(() => useLogoRotation());
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it("should not rotate the logo when mouse is at the center", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: 0, clientY: 0 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(0deg)");
    unmount();
  });

  it("should not rotate the logo when mouse is at right on the x axis", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: 100, clientY: 0 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(0deg)");
    unmount();
  });

  it("should not rotate the logo 180 degrees when mouse at left on the x axis", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: -200, clientY: 0 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(180deg)");
    unmount();
  });

  it("should rotate the logo -45 degrees when mouse is in top-right quadrant", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: 100, clientY: -100 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(-45deg)");
    unmount();
  });

  it("should rotate the logo 135 degrees when mouse is in bottom-left quadrant", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: -100, clientY: 100 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(135deg)");
    unmount();
  });

  it("should rotate the logo 0 degrees when mouse is at far right", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: 1000, clientY: 0 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(0deg)");
    unmount();
  });

  it("should not rotate the logo when mouse is at far left", () => {
    const { getByTestId, unmount } = render(<TestComponent />);
    fireEvent.mouseMove(document.body, { clientX: -1000, clientY: 0 });
    const image = getByTestId("test-image");
    expect(image.style.transform).toBe("rotate(180deg)");
    unmount();
  });
});
