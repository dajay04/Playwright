const {test, expect} = require('@playwright/test')


test('Browser Context Test', async ({browser}) =>
{
    const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://testautomationpractice.blogspot.com/");
   const titlePage = await page.title();
   console.log("Title of Page is: "+ titlePage)
   await expect(page).toHaveTitle("Automation Tessdasdasting Practice")
});


test('Page Context Test', async ({page}) =>
{
   await page.goto("https://www.google.com/");
   const titlePage = await page.title();
   console.log("Title of Page is: "+ titlePage)
   await expect(page).toHaveTitle("Google")
   await page.locator("text=Login")
});