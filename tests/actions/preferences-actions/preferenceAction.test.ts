import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  chapterPagesDispositionValues,
  gapOptionNameValues,
  progressBarDirectionValues,
  readingDirectionValues,
} from "@/zod-schema/schema";
import preferenceAction from "@/actions/preferences-actions/preferenceAction";
import { revalidateTag } from "next/cache";
import { updatePreference } from "@/data-access/preferences";
import { verifySession } from "@/lib/session";

vi.mock("server-only", () => ({}));
vi.mock("next/cache");
vi.mock("../../../data-access/preferences");
vi.mock("../../../lib/session");

describe("preferenceAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockedRevalidateTag = vi.mocked(revalidateTag);
  const mockedUpdatePreference = vi.mocked(updatePreference);
  const mockedVerifySession = vi.mocked(verifySession);

  it("should return an error as a string", async () => {
    expect(
      await preferenceAction({
        data: {},
        field: "progressBarVisibility",
      }),
    ).toMatch(/expected/i);
  });

  it("should return an error as a string", async () => {
    expect(
      await preferenceAction({
        data: {},
        field: "progressBarDirection",
        schemaSource: progressBarDirectionValues,
      }),
    ).toMatch(/expected/i);
  });

  it("should call verifySession, updatePreference and revalidateTag", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });

    expect(
      await preferenceAction({
        data: "Vertical",
        field: "progressBarDirection",
        schemaSource: progressBarDirectionValues,
      }),
    ).toBe(undefined);
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedUpdatePreference).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });

  it("should call verifySession, updatePreference and revalidateTag", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });

    expect(
      await preferenceAction({
        data: false,
        field: "progressBarVisibility",
      }),
    ).toBe(undefined);
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedUpdatePreference).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });

  it("should call verifySession, updatePreference and revalidateTag", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });

    expect(
      await preferenceAction({
        data: "Single Page",
        field: "chapterPagesDisposition",
        schemaSource: chapterPagesDispositionValues,
      }),
    ).toBe(undefined);
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedUpdatePreference).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });

  it("should call verifySession, updatePreference and revalidateTag", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });

    expect(
      await preferenceAction({
        data: "From right to left",
        field: "readingDirection",
        schemaSource: readingDirectionValues,
      }),
    ).toBe(undefined);
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedUpdatePreference).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });

  it("should call verifySession, updatePreference and revalidateTag", async () => {
    mockedVerifySession.mockResolvedValue({ userId: "123" });

    expect(
      await preferenceAction({
        data: "Medium",
        field: "gapOptionName",
        schemaSource: gapOptionNameValues,
      }),
    ).toBe(undefined);
    expect(mockedVerifySession).toHaveBeenCalled();
    expect(mockedUpdatePreference).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });
});
