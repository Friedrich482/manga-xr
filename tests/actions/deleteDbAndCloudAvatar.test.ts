import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteUploadedAvatarKeyAndUrl,
  findUserWithId,
} from "@/data-access/user";
import { deleteDbAndCloudAvatar } from "@/actions/deleteDbAndCloudAvatar";

vi.mock("../../data-access/user");
vi.mock(import("uploadthing/server"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    UTApi: vi.fn().mockImplementation(() => ({
      deleteFiles: vi.fn(),
    })),
  };
});
vi.mock("server-only", () => ({}));

describe("deleteDbAndCloudAvatar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockedFindUserWithId = vi.mocked(findUserWithId);
  const mockedDeleteUploadedAvatarKeyAndUrl = vi.mocked(
    deleteUploadedAvatarKeyAndUrl,
  );

  it("should return an error as a string", async () => {
    expect(await deleteDbAndCloudAvatar({})).toMatch(/required/i);
  });

  it("should return nothing because there is no user", async () => {
    mockedFindUserWithId.mockResolvedValue(null);
    expect(await deleteDbAndCloudAvatar({ userId: "123" })).toBe(undefined);
    expect(mockedFindUserWithId).toHaveBeenCalled();
    expect(mockedDeleteUploadedAvatarKeyAndUrl).not.toHaveBeenCalled();
  });

  it("should call the deleFiles method from utapi and the deleteUploadedAvatarKeyAndUrl function", async () => {
    mockedFindUserWithId.mockResolvedValue({
      username: "Karl",
      email: "karl@gmail.com",
      avatarHueValue: 123,
      avatarIconPath: "path",
      uploadedAvatarKey: "key",
      uploadedAvatarUrl: "url",
    });
    expect(await deleteDbAndCloudAvatar({ userId: "123" })).toBe(undefined);
    expect(mockedFindUserWithId).toHaveBeenCalled();
    expect(mockedDeleteUploadedAvatarKeyAndUrl).toHaveBeenCalled();
  });
});
