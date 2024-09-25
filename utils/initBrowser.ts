import puppeteer from "puppeteer";

const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
    timeout: 0,
  });
  return browser;
};

export default initBrowser;
