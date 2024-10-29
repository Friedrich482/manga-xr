import { beforeEach, describe, expect, it, vi } from "vitest";
import { revalidateTag } from "next/cache";
import revalidateTagAction from "@/actions/revalidateTagAction";

vi.mock("next/cache");

describe("revalidateTagAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockedRevalidateTag = vi.mocked(revalidateTag);

  it("should return an error as a string", async () => {
    expect(await revalidateTagAction({})).toMatch(/Expected string/);
    expect(await revalidateTagAction(true)).toMatch(/Expected string/);
    expect(await revalidateTagAction(["string"])).toMatch(/Expected string/);
  });

  it("should call the revalidateTag function from next/cache", async () => {
    expect(await revalidateTagAction("tag")).toBe(undefined);
    expect(mockedRevalidateTag).toHaveBeenCalledWith("tag");
  });
});
