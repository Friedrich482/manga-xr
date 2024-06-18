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
    await page.goto("https://mangakakalot.com/manga_list?type=latest");

    const dataElements = await page.$$(
      "div.container > div.main-wrapper > div.leftCol > div.truyen-list > div.list-truyen-item-wrap",
    );

    const data: latestUpdateType[] = [];
    for (const element of dataElements) {
      if (data.length > 20) {
        break;
      }
      const title = await element.$eval("h3", (el) => el.textContent);
      const image = await element.$eval(
        "a.list-story-item > img",
        (el) => el.src,
      );
      const lastChapter = await element.$eval(
        "a.list-story-item-wrap-chapter",
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
