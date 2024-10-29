import { describe, expect, it, vi } from "vitest";
import { GET_USER_TAG } from "@/lib/cache-keys/unstable_cache";
import addUploadedAvatar from "@/actions/updateAvatarUrlAction";
import { revalidateTag } from "next/cache";
import { updateAvatar } from "@/data-access/user";

vi.mock("next/cache");
vi.mock("../../data-access/user");
vi.mock("server-only", () => ({}));

describe("updateAvatarUrlAction", () => {
  const mockedRevalidateTag = vi.mocked(revalidateTag);
  const mockedUpdateAvatar = vi.mocked(updateAvatar);

  it("should return an error as a string", async () => {
    expect(await addUploadedAvatar({})).toMatch(/required/i);
  });

  it("should return an error as a string", async () => {
    expect(
      await addUploadedAvatar({
        userId: "1231278",
        url: "imageUrl",
        imageKey: "imageKey",
      }),
    ).toBe(undefined);
    expect(mockedUpdateAvatar).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalledWith(GET_USER_TAG);
  });
});
