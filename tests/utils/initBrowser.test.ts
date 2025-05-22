import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import initBrowser from "@/utils/initBrowser";
import puppeteer from "puppeteer";

vi.mock("puppeteer");

describe("initBrowser", () => {
  const mockConnect = vi.fn();
  const mockLaunch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    puppeteer.connect = mockConnect;
    puppeteer.launch = mockLaunch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should connect to the local browser in development", async () => {
    vi.stubEnv("NODE_ENV", "development");

    await initBrowser();

    expect(mockLaunch).toHaveBeenCalledWith({
      args: ["--no-sandbox"],
    });
  });

  it("should use chromium in build time", async () => {
    vi.stubEnv("BUILD_ENV", "build-local");

    await initBrowser();

    expect(mockLaunch).toHaveBeenCalledWith({
      executablePath: "/usr/bin/chromium",
      headless: true,
      args: [
        "--no-sandbox",
        "--no-zygote",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--disable-software-rasterizer",
      ],
    });
  });

  it("should launch browser with default browserWSEndpoint in run time", async () => {
    vi.stubEnv("BROWSERLESS_URL", "ws://localhost:3000");

    await initBrowser();

    expect(mockConnect).toHaveBeenCalledWith({
      browserWSEndpoint: "ws://localhost:3000",
    });
  });

  it("should return the browser instance", async () => {
    const mockBrowser = { someMethod: () => {} };
    mockLaunch.mockResolvedValue(mockBrowser);
    const result = await initBrowser();
    expect(result).toBe(mockBrowser);
  });
});
