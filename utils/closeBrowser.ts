import { Browser } from "puppeteer";

const closeBrowser = async (browser: Browser) => {
  await browser.close();
};

export default closeBrowser;
