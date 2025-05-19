import puppeteer from "puppeteer";

const initBrowser = async () => {
  const browser = await puppeteer.launch(
    process.env.NODE_ENV === "development"
      ? undefined
      : {
          headless: true,
          executablePath: "/usr/bin/chromium",
          args: [
            "--no-sandbox",
            "--no-zygote",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
            "--disable-software-rasterizer",
          ],
        },
  );
  return browser;
};

export default initBrowser;
