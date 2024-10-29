import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteSession, verifySession } from "@/lib/session";
import { hash } from "bcrypt";
import { updatePassword } from "@/data-access/user";
import updatePasswordAction from "@/actions/updatePasswordAction";

vi.mock("../../data-access/user");
vi.mock("../../lib/session");
vi.mock("bcrypt");
vi.mock("server-only", () => ({}));

describe("updatePasswordAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockedVerifySession = vi.mocked(verifySession);
  const mockedDeleteSession = vi.mocked(deleteSession);
  const mockedUpdatePassword = vi.mocked(updatePassword);
  const mockedHash = vi.mocked(hash);

  it("should return an error as a string", async () => {
    expect(await updatePasswordAction({})).toMatch(/required/i);
  });

  it("should call the updatePassword and deleteSession function", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });
    // @ts-ignore
    mockedHash.mockResolvedValue("hashedPassword");

    expect(
      await updatePasswordAction({
        password: "password12345#",
        confirmPassword: "password12345#",
      }),
    ).toBe(undefined);
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedHash).toHaveBeenCalled();
    expect(mockedUpdatePassword).toHaveBeenCalled();
    expect(mockedDeleteSession).toHaveBeenCalled();
  });

  it("should throw an error and return the generic error string", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });
    // @ts-ignore
    mockedHash.mockResolvedValue("hashedPassword");
    mockedUpdatePassword.mockRejectedValue(new Error("error"));
    expect(
      await updatePasswordAction({
        password: "password12345#",
        confirmPassword: "password12345#",
      }),
    ).toBe("An error occurred. Please try again.");
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedHash).toHaveBeenCalled();
    expect(mockedUpdatePassword).toHaveBeenCalled();
    expect(mockedDeleteSession).not.toHaveBeenCalled();
  });
});
