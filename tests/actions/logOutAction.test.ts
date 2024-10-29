import { describe, expect, it, vi } from "vitest";
import { deleteSession } from "@/lib/session";
import logoutAction from "@/actions/logOutAction";

vi.mock("../../lib/session");
vi.mock("server-only", () => {
  return {};
});

describe("logOutAction", () => {
  const mockedDeleteSession = vi.mocked(deleteSession);

  it("should call the deleteSession function", async () => {
    expect(await logoutAction()).toBe(undefined);
    expect(mockedDeleteSession).toHaveBeenCalled();
  });
});
