import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GoBackToTopButton from "@/components/GoBackToTopButton";

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    usePathname: () => "",
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});
describe("GoBackToTopButton", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("should not be visible initially", async () => {
    const { unmount } = render(<GoBackToTopButton />);
    expect(
      screen.queryByTestId("go-back-to-top-button"),
    ).not.toBeInTheDocument();
    unmount();
  });

  it("should render the button", async () => {
    const { unmount } = render(<GoBackToTopButton />);

    Object.defineProperty(window, "scrollY", { value: 300 });
    fireEvent.scroll(window);

    expect(screen.getByTestId("go-back-to-top-button")).toBeInTheDocument();
    unmount();
  });

  it("should scroll to top when clicked", async () => {
    const { unmount } = render(<GoBackToTopButton />);

    Object.defineProperty(window, "scrollY", { value: 300 });
    fireEvent.scroll(window);
    await waitFor(() => {
      const button = screen.getByTestId("go-back-to-top-button");
      expect(button).toBeInTheDocument;
      fireEvent.click(button);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });

      unmount();
    });
  });
});
