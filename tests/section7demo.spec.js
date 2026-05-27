const {test,expect} = require('@playwright/test')

test.only('PL getByROle Locator', async ({page}) =>
{
  await  page.goto('https://testautomationpractice.blogspot.com/')
   await page.waitForLoadState('networkidle')

    await page.pause()
   await page.getByLabel('Female').check()
   await page.pause()
});