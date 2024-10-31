import { beforeEach, describe, expect, it, vi } from "vitest";
import { decrypt } from "@/lib/session";
import getUserId from "@/lib/getUserId";

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => {
  const actual = vi.importActual("next/headers");
  return {
    ...actual,
    cookies: () => ({
      get: vi.fn(),
    }),
  };
});
vi.mock("../../lib/session");

describe("getUserId", () => {
  const mockedDecrypt = vi.mocked(decrypt);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null as userId", async () => {
    mockedDecrypt.mockResolvedValue(undefined);
    expect(await getUserId()).toStrictEqual({ userId: null });
  });

  it("should return 123 as userId", async () => {
    mockedDecrypt.mockResolvedValue({ userId: "123" });
    expect(await getUserId()).toStrictEqual({ userId: "123" });
  });
});
