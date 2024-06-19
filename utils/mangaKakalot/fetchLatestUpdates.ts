import puppeteer from "puppeteer";
import { latestUpdateSchema, latestUpdateType } from "@/zod-schema/schema";
export async function fetchLatestUpdates() {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 768,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("https://mangasee123.com/");

    const dataElements = await page.$$(
      "div.MainContainer > div.row > div.col-lg-8 > div.Box > div.BoxBody > div.row > div.col-md-6",
    );

    const data: latestUpdateType[] = [];
    for (const element of dataElements) {
      if (data.length > 20) {
        break;
      }
      const title = await element.$eval(
        "span > div > div.Label > a > div.SeriesName > span",
        (el) => el.textContent,
      );
      const image = await element.$eval(
        "span > div > div.Image > a > img",
        (el) => el.src,
      );
      const lastChapter = await element.$eval(
        "span > div > div.Label > a > div.ChapterLabel",
        (el) => el.textContent,
      );
      const parsedObject = latestUpdateSchema.parse({
        title,
        lastChapter,
        image,
      });
      data.push(parsedObject);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
