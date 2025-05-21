import puppeteer from "puppeteer";

const initBrowser = async () => {
  const nodeEnv = process.env.NODE_ENV as string;
  const isUsingBrowserless =
    !!process.env.BROWSERLESS_URL && nodeEnv !== "build-local";

  if (isUsingBrowserless) {
    return await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSERLESS_URL,
    });
  }
  return await puppeteer.launch({
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
};

export default initBrowser;
