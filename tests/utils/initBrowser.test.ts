import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import initBrowser from "@/utils/initBrowser";
import puppeteer from "puppeteer";

vi.mock("puppeteer");

describe("initBrowser", () => {
  const mockLaunch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    puppeteer.launch = mockLaunch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should launch browser with default options in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    await initBrowser();
    expect(mockLaunch).toHaveBeenCalledWith(undefined);
  });

  it("should launch browser with specific options in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await initBrowser();
    expect(mockLaunch).toHaveBeenCalledWith({
      headless: true,
      executablePath: "/usr/bin/chromium-browser",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
    });
  });

  it("should return the browser instance", async () => {
    const mockBrowser = { someMethod: () => {} };
    mockLaunch.mockResolvedValue(mockBrowser);
    const result = await initBrowser();
    expect(result).toBe(mockBrowser);
  });
});
