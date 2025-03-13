import { describe, expect, it, vi } from "vitest";
import sleep from "@/utils/sleep";

describe("sleep function", () => {
  it("should wait for the specified amount of time", async () => {
    vi.useFakeTimers();

    const sleepPromise = sleep(1000);

    vi.advanceTimersByTime(1000);

    await sleepPromise;

    vi.useRealTimers();

    expect(true).toBe(true);
  });

  it("should return undefined when resolved", async () => {
    vi.useFakeTimers();
    const sleepPromise = sleep(500);
    vi.advanceTimersByTime(500);
    const result = await sleepPromise;
    vi.useRealTimers();

    expect(result).toBeUndefined();
  });

  it("should resolve after the correct amount of time", async () => {
    const spy = vi.spyOn(global, "setTimeout");

    sleep(2000);

    expect(spy).toHaveBeenCalledWith(expect.any(Function), 2000);

    spy.mockRestore();
  });
});
