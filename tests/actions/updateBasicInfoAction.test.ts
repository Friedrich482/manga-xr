import { createSession, verifySession } from "@/lib/session";
import { describe, expect, it, vi } from "vitest";
import { findUserWithId, updateEmailAndUsername } from "@/data-access/user";
import updateBasicInfoAction from "@/actions/updateBasicInfoAction";

vi.mock("../../lib/session");
vi.mock("../../data-access/user");

vi.mock("server-only", () => ({}));

describe("updateBasicInfoAction", () => {
  const mockedCreateSession = vi.mocked(createSession);
  const mockedVerifySession = vi.mocked(verifySession);
  const mockedUpdateEmailAndUsername = vi.mocked(updateEmailAndUsername);
  const mockedFindUserWithId = vi.mocked(findUserWithId);

  it("should return an error as a string", async () => {
    expect(await updateBasicInfoAction({})).toMatch(/required/i);
  });

  it("should return an error as a string because the user is not found", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });
    mockedFindUserWithId.mockResolvedValue(null);

    expect(
      await updateBasicInfoAction({
        email: "karl@gmail.com",
        username: "Karl",
      }),
    ).toBe("User not Found");
  });

  it("should return an error as a string because the data submitted are the same as the original", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });
    mockedFindUserWithId.mockResolvedValue({
      username: "Karl",
      email: "karl@gmail.com",
      avatarHueValue: 123,
      avatarIconPath: "path",
      uploadedAvatarKey: "key",
      uploadedAvatarUrl: "url",
    });

    expect(
      await updateBasicInfoAction({
        email: "karl@gmail.com",
        username: "Karl",
      }),
    ).toBe("No changes were made. Please change at least one field.");
  });

  it("should call the updateEmailAndUsername and createSession functions", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });
    mockedFindUserWithId.mockResolvedValue({
      username: "Karl",
      email: "karl@gmail.com",
      avatarHueValue: 123,
      avatarIconPath: "path",
      uploadedAvatarKey: "key",
      uploadedAvatarUrl: "url",
    });

    expect(
      await updateBasicInfoAction({
        email: "carlos18@gmail.com",
        username: "Carlos",
      }),
    ).toBe(undefined);
    expect(mockedUpdateEmailAndUsername).toHaveBeenCalled();
    expect(mockedCreateSession).toHaveBeenCalled();
  });
});
