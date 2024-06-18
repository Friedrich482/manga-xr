import puppeteer from "puppeteer-core";

export async function fetchPopularManga() {
  let browser;
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${process.env.AUTH}@brd.superproxy.io:9222`,
    });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 768,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("https://mangakakalot.com/");

    const dataElements = await page.$$(
      "div.container > div.slide > div#owl-demo > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item",
    );

    const data: {
      title: string | null;
      image: string;
      lastChapter: string | null;
    }[] = [];
    for (const element of dataElements) {
      if (data.length > 10) {
        break;
      }
      const title = await element.$eval(
        "div.slide-caption > h3 > a",
        (el) => el.textContent,
      );
      const image = await element.$eval("img", (el) => el.src);
      const lastChapter = await element.$eval(
        "div.slide-caption > a",
        (el) => el.textContent,
      );
      data.push({ title, image, lastChapter });
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
