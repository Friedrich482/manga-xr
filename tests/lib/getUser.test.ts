import { describe, expect, it, vi } from "vitest";
import { findUserWithId } from "@/data-access/user";
import getUser from "@/lib/getUser";

vi.mock("server-only", () => ({}));
vi.mock("../../data-access/user");
vi.mock("next/cache", () => {
  const actual = vi.importActual("next/cache");
  return {
    ...actual,
    unstable_cache: (fn: Function) => fn,
  };
});

describe("getUser", () => {
  const mockedFindUserWithId = vi.mocked(findUserWithId);

  it("should return nothing because there is no user", async () => {
    mockedFindUserWithId.mockResolvedValue(null);

    expect(await getUser("123")).toBe(undefined);
    expect(mockedFindUserWithId).toHaveBeenCalled();
  });

  it("should return a user", async () => {
    mockedFindUserWithId.mockResolvedValue({
      username: "Karl",
      email: "karl@gmail.com",
      avatarHueValue: 123,
      avatarIconPath: "path",
      uploadedAvatarUrl: "url",
      uploadedAvatarKey: "key",
    });

    expect(await getUser("123")).toStrictEqual({
      username: "Karl",
      email: "karl@gmail.com",
      avatarHueValue: 123,
      avatarIconPath: "path",
      uploadedAvatarUrl: "url",
    });
    expect(mockedFindUserWithId).toHaveBeenCalled();
  });
});
