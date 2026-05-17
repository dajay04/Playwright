const {test, expect} = require('@playwright/test')


test('Error Message Verification', async ({page}) =>
{
   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("input[name='username']").fill('Ajay')
  await page.locator('input[name="password"]').fill('172312ca')
  await page.locator(".orangehrm-login-button").click()
  const textError = await page.locator('p.oxd-alert-content-text').textContent()
  console.log(textError)

  await expect(page.locator('p.oxd-alert-content-text')).toContainText('sadasda credentials')
});

test('Dashboard Text Verify', async ({page}) =>
{
   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("input[name='username']").fill('Admin')
  await page.locator('input[name="password"]').fill('admin123')
  await page.locator(".orangehrm-login-button").click()
 const thirdIndex = await page.locator('.oxd-main-menu-item-wrapper span').nth(3).textContent()
  console.log(thirdIndex)

  await expect(page.locator('.oxd-main-menu-item-wrapper span').nth(3)).toContainText('Time')
   const firstData = await page.locator('.oxd-main-menu-item-wrapper span').first().textContent()
  console.log(firstData)
   const lastData = await page.locator('.oxd-main-menu-item-wrapper span').last().textContent()
  console.log(lastData)
 
});


test('All Text Get', async ({page}) =>
{
   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("input[name='username']").fill('Admin')
  await page.locator('input[name="password"]').fill('admin123')
  await page.locator(".orangehrm-login-button").click()
  // Apparoach 1
  // await page.locator('.oxd-main-menu-item-wrapper span').first().waitFor()

  await page.waitForLoadState('networkidle')
  const allText = await page.locator('.oxd-main-menu-item-wrapper span').allTextContents()
  console.log(allText)
});