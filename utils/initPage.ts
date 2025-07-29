import { Browser } from "puppeteer";

const initPage = async (browser: Browser) => {
  const page = await browser.newPage();

  // Set a realistic user-agent to match the IP’s region and browser version
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  );

  // Override browser properties to reduce detectable traits
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    // Randomize canvas fingerprinting to avoid detection
    HTMLCanvasElement.prototype.toDataURL = function () {
      return "data:image/png;base64,randomized-value";
    };
  });

  await page.setViewport({
    width: Math.floor(1080),
    height: Math.floor(640),
  });

  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  return page;
};

export default initPage;
