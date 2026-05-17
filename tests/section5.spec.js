const {test, expect} = require('@playwright/test')


test('Handling UI Elements', async({page}) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    /// Dropdown Handling
    const countryDropdown = page.locator('#country')
    await countryDropdown.selectOption({index:6});
    await expect(countryDropdown).toHaveValue("india")
  
    // Radio butotng
    const maleLocator= page.locator('#male')
    await maleLocator.check(); // radio or checkbox ... check()- for selection
    console.log(await maleLocator.isChecked());
    await expect(maleLocator).toBeChecked();
    // uncheck for deselection- checkbox 
    
    /// Checbkox button
    await page.locator('#sunday').check();
    await page.locator('#monday').check();
    await expect(page.locator('#sunday')).toBeChecked();
    await page.pause();
    await page.locator('#monday').uncheck();
    expect(await page.locator('#monday').isChecked()).toBeFalsy();
    await page.pause();
    
});