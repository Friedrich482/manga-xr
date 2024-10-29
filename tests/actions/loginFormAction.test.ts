import { beforeEach, describe, expect, it, vi } from "vitest";
import { compare } from "bcrypt";
import { createSession } from "@/lib/session";
import { findUserWithUsername } from "@/data-access/user";
import loginFormAction from "@/actions/loginFormAction";

vi.mock("../../lib/session");
vi.mock("../../data-access/user");

vi.mock("bcrypt", () => ({
  compare: vi.fn(),
}));

vi.mock("server-only", () => {
  return {};
});

describe("loginFormAction", () => {
  const mockedCreateSession = vi.mocked(createSession);
  const mockedFindUserWithUsername = vi.mocked(findUserWithUsername);
  const mockedCompare = vi.mocked(compare);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return an error message", async () => {
    expect(await loginFormAction({ user: "lol" })).toMatch(/required/i);
  });

  it("should return an object with a not found user message and a name of 'username'", async () => {
    mockedFindUserWithUsername.mockResolvedValue(null);

    expect(
      await loginFormAction({ username: "Karl", password: "password123456" }),
    ).toStrictEqual({ message: "User not found", name: "username" });
  });

  it("should return an object with an incorrect password message and a name of 'password'", async () => {
    mockedFindUserWithUsername.mockResolvedValue({
      id: "123",
      password: "badPassword",
    });
    // @ts-ignore
    mockedCompare.mockResolvedValue(false);

    expect(
      await loginFormAction({ username: "Karl", password: "password123456" }),
    ).toStrictEqual({ message: "Incorrect password", name: "password" });
    expect(mockedCreateSession).not.toHaveBeenCalled();
  });

  it("should create a session for the username and return the username", async () => {
    mockedFindUserWithUsername.mockResolvedValue({
      id: "123",
      password: "password123456",
    });
    // @ts-ignore
    mockedCompare.mockResolvedValue(true);
    mockedCreateSession.mockResolvedValue(undefined);

    expect(
      await loginFormAction({ username: "Karl", password: "password123456" }),
    ).toBe("Karl");
    expect(mockedCreateSession).toHaveBeenCalled();
  });

  it("should throw an error", async () => {
    mockedFindUserWithUsername.mockRejectedValue(new Error("Async error"));

    expect(
      await loginFormAction({ username: "Karl", password: "password123456" }),
    ).toStrictEqual({ message: "A server error occurred: Error: Async error" });
    expect(mockedCreateSession).not.toHaveBeenCalled();
  });
});
