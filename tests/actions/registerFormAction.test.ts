import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createHistory } from "@/data-access/history";
import { createPreferences } from "@/data-access/preferences";
import { createSession } from "@/lib/session";
import { createUser } from "@/data-access/user";
import { hash } from "bcrypt";
import registerFormAction from "@/actions/registerFormAction";

vi.mock("../../lib/session");
vi.mock("../../data-access/user");
vi.mock("../../data-access/history");
vi.mock("../../data-access/preferences");

vi.mock("bcrypt", () => ({
  hash: vi.fn(),
}));

vi.mock("server-only", () => {
  return {};
});

describe("registerFormAction", () => {
  const mockedHash = vi.mocked(hash);
  const mockedCreateUser = vi.mocked(createUser);
  const mockedCreateHistory = vi.mocked(createHistory);
  const mockedCreatePreferences = vi.mocked(createPreferences);
  const mockedCreateSession = vi.mocked(createSession);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return an error message due to wrong preferences type", async () => {
    expect(
      await registerFormAction(
        {
          username: "Karl",
          password: "password123456",
          email: "karl@gmail.com",
          confirmPassword: "password123456",
        },
        {
          disposition: "Vertical",
        },
      ),
    ).match(/required/i);
  });

  it("should return an error message due to wrong credentials type", async () => {
    expect(
      await registerFormAction(
        {
          username: "Karl",
          password: "password123456#",
        },
        {
          progressBarVisibility: true,
          progressBarDirection: "Horizontal",
          chapterPagesDisposition: "Long Strip",
          readingDirection: "From left to right",
          gapOptionName: "No gap",
        },
      ),
    ).match(/required/i);
  });

  it("should insert the user and his preferences in the database, create a history attached to him and create a session", async () => {
    mockedCreateUser.mockResolvedValue({
      userId: "123",
    });
    expect(
      await registerFormAction(
        {
          username: "Karl",
          password: "password123456#",
          email: "karl@gmail.com",
          confirmPassword: "password123456#",
        },
        {
          progressBarVisibility: true,
          progressBarDirection: "Horizontal",
          chapterPagesDisposition: "Long Strip",
          readingDirection: "From left to right",
          gapOptionName: "No gap",
        },
      ),
    ).toStrictEqual(undefined);
    expect(mockedHash).toHaveBeenCalled();
    expect(mockedCreateUser).toHaveBeenCalled();
    expect(mockedCreatePreferences).toHaveBeenCalled();
    expect(mockedCreateHistory).toHaveBeenCalled();
    expect(mockedCreateSession).toHaveBeenCalled();
  });

  it("should throw an error due to duplicate emails", async () => {
    mockedCreateUser.mockRejectedValue(
      new PrismaClientKnownRequestError("Unique constraint failed", {
        code: "P2002",
        clientVersion: "5.0.0",
        meta: { target: ["email"] },
      }),
    );

    expect(
      await registerFormAction(
        {
          username: "Karl",
          password: "password123456#",
          email: "karl@gmail.com",
          confirmPassword: "password123456#",
        },
        {
          progressBarVisibility: true,
          progressBarDirection: "Horizontal",
          chapterPagesDisposition: "Long Strip",
          readingDirection: "From left to right",
          gapOptionName: "No gap",
        },
      ),
    ).toStrictEqual({ message: "This email is already taken.", name: "email" });
    expect(mockedHash).toHaveBeenCalled();
    expect(mockedCreateUser).toHaveBeenCalled();
    expect(mockedCreatePreferences).not.toHaveBeenCalled();
    expect(mockedCreateHistory).not.toHaveBeenCalled();
    expect(mockedCreateSession).not.toHaveBeenCalled();
  });

  it("should throw an error due to duplicate usernames", async () => {
    mockedCreateUser.mockRejectedValue(
      new PrismaClientKnownRequestError("Unique constraint failed", {
        code: "P2002",
        clientVersion: "5.0.0",
        meta: { target: ["username"] },
      }),
    );

    expect(
      await registerFormAction(
        {
          username: "Karl",
          password: "password123456#",
          email: "karl@gmail.com",
          confirmPassword: "password123456#",
        },
        {
          progressBarVisibility: true,
          progressBarDirection: "Horizontal",
          chapterPagesDisposition: "Long Strip",
          readingDirection: "From left to right",
          gapOptionName: "No gap",
        },
      ),
    ).toStrictEqual({
      message: "This username is already taken.",
      name: "username",
    });
    expect(mockedHash).toHaveBeenCalled();
    expect(mockedCreateUser).toHaveBeenCalled();
    expect(mockedCreatePreferences).not.toHaveBeenCalled();
    expect(mockedCreateHistory).not.toHaveBeenCalled();
    expect(mockedCreateSession).not.toHaveBeenCalled();
  });

  it("should throw the generic error", async () => {
    mockedCreateUser.mockRejectedValue(new Error("Error"));

    expect(
      await registerFormAction(
        {
          username: "Karl",
          password: "password123456#",
          email: "karl@gmail.com",
          confirmPassword: "password123456#",
        },
        {
          progressBarVisibility: true,
          progressBarDirection: "Horizontal",
          chapterPagesDisposition: "Long Strip",
          readingDirection: "From left to right",
          gapOptionName: "No gap",
        },
      ),
    ).toBe("Error while creating your account. Please try again.");
    expect(mockedHash).toHaveBeenCalled();
    expect(mockedCreateUser).toHaveBeenCalled();
    expect(mockedCreatePreferences).not.toHaveBeenCalled();
    expect(mockedCreateHistory).not.toHaveBeenCalled();
    expect(mockedCreateSession).not.toHaveBeenCalled();
  });
});
