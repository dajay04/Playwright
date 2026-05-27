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

test.only('textContect vs inputValue Demo', async ({ page }) => 
 {
    // Open Website
    await page.goto('https://testautomationpractice.blogspot.com/')

   const labelText =  await page.locator("label:has-text('Name:')").textContent();
   console.log("Label Text is: "+ labelText)
   // Validation
   await expect(page.locator("label:has-text('Name:')")).toHaveText('Name:')


   await page.locator('#name').fill('Ajay Dahiya')
   const inputText = await page.locator('#name').inputValue();
    console.log("Input Text is: "+ inputText)
    // Validation
    expect(inputText).toBe('Ajay dsa')
});

test('Child Window Handling', async({browser})=>
{
    // Browser Context
    const context = await browser.newContext();
    // Create Page
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/')
    const newTabButton = page.locator("button:has-text('New Tab')")

    // Wait for new page + click on btton
    const [newPage] = await Promise.all([context.waitForEvent('page'),newTabButton.click()])

    // Fetech child load success
    await newPage.waitForLoadState();
    const articleText = await newPage.locator("a:has-text('What Is AI and Machine Learning? Core Concepts, Types, and Real-World Uses')").textContent()
    console.log("Full Article Text is: "+ articleText);

    // Fetch text before '?'
    const fetcedhText = articleText.split("?")[0];
    console.log("Fetch Article Text is: "+ fetcedhText)

    await page.locator('#name').fill(fetcedhText)
    console.log("Enetrver Value in Name field is :"+ await page.locator('#name').inputValue())

})