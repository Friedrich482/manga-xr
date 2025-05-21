import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import initBrowser from "@/utils/initBrowser";
import puppeteer from "puppeteer";

vi.mock("puppeteer");

describe("initBrowser", () => {
  const mockLaunch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    puppeteer.connect = mockLaunch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should launch browser with default browserWSEndpoint in dev and prod", async () => {
    vi.stubEnv("BROWSERLESS_URL", "ws://localhost:3001");

    await initBrowser();

    expect(mockLaunch).toHaveBeenCalledWith({
      browserWSEndpoint: "ws://localhost:3001",
    });
  });

  it("should return the browser instance", async () => {
    const mockBrowser = { someMethod: () => {} };
    mockLaunch.mockResolvedValue(mockBrowser);
    const result = await initBrowser();
    expect(result).toBe(mockBrowser);
  });
});
