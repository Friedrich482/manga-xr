import puppeteer from "puppeteer";

const initBrowser = async () => {
  const buildEnv = process.env.BUILD_ENV;
  const isDev = process.env.NODE_ENV === "development";
  const isUsingBrowserless =
    !!process.env.BROWSERLESS_URL && buildEnv !== "build-local";

  if (isDev) {
    return puppeteer.launch({
      args: ["--no-sandbox"],
    });
  }

  // we use browserless in production (runtime)
  if (isUsingBrowserless) {
    return await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSERLESS_URL,
    });
  }

  // but we use chromium during build time in the Dockerfile, since
  // browserless is not ready yet
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
