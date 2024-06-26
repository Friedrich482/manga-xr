import puppeteer from "puppeteer";
import { unstable_cache } from "next/cache";
import { mangaListSchema, mangaListType } from "@/zod-schema/schema";
let letter = "";
export const fetchListFromLetter = unstable_cache(
  async (text: string) => {
    letter = text;
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto("https://mangasee123.com/directory/");

      // we need to click on the button first
      const buttons = await page.$$(
        "div.container > div.row > div.col-lg-8 > div.Box > div.BoxBody > div.btn-group > button.btn",
      );

      for (const button of buttons) {
        const buttonText = await button.evaluate((el) => el.textContent || "");
        if (buttonText === text) {
          await button.click();
          break;
        }
      }
      //   we clicked on the right button

      const dataElements = await page.$$(
        "div.MainContainer > div.row > div.col-lg-8 > div.Box > div.BoxBody > div.ng-scope > div.ng-scope > div.ng-scope",
      );

      const data: mangaListType[] = [];
      for (const element of dataElements) {
        if (data.length > 50) {
          break;
        }
        const title = await element.$eval("a", (el) => el.textContent);
        // alt Title
        const link = (await element.$eval("a", (el) =>
          el.getAttribute("href"),
        )) as string;
        const firstSlashIndex: number = link.indexOf("/");
        const secondSlashIndex: number = link.indexOf("/", firstSlashIndex + 1);
        const altTitle = link.substring(secondSlashIndex + 1, link.length);

        const parsedObject = mangaListSchema.parse({ title, altTitle });

        data.push(parsedObject);
      }
      await browser.close();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  [`fetchListFromLetter:${letter}`],
  { tags: [`fetchListFromLetter:${letter}`], revalidate: 600 },
);
