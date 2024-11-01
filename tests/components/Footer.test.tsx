import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("should render all the necessary text", () => {
    const { unmount } = render(<Footer />);
    expect(
      screen.getByText(/The code source is available on/),
    ).toBeInTheDocument();

    expect(screen.getByText(/Friedrich482/)).toBeInTheDocument();
    expect(screen.getByText(/Github/)).toBeInTheDocument();

    unmount();
  });

  it("should render all the necessary links", () => {
    const { unmount } = render(<Footer />);
    const gitHubProfileLink = screen.getByRole("link", { name: /Github/ });
    expect(gitHubProfileLink).toBeInTheDocument();
    const appLink = screen.getByRole("link", { name: /Friedrich482/ });
    expect(appLink).toBeInTheDocument();
    unmount();
  });
});
