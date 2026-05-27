const {test,expect} = require('@playwright/test')

test.only('Dynamic Product Search List and Add to Cart till Payment', async ({page}) =>
{
    // Test Data for Login
    const email = 'dahiyaajay370@gmail.com'
    const password = 'Welcome@4995'
    const productName = 'Men Tshirt'
    // Open App
    await page.goto('https://automationexercise.com/')
    await page.waitForLoadState('networkidle')
    console.log('Application Opened')

    // Login Steps 
    await page.getByRole('link',{name:'Signup / Login'}).click();
    await page.getByPlaceholder("Email Address").nth(0).fill(email);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button',{name:'Login'}).click();

    // Validation Login Success
    await expect(page.getByText("Logged in as")).toBeVisible();
    console.log('Login Successful')

   // Navigte to Products Page
    await page.locator("a[href='/products']").click();
    await page.waitForLoadState('networkidle')
    console.log('Product Page Opened')

    // Fteching all product count
    const allProducts = page.locator('.productinfo')
    const totalProducts = await allProducts.count()
    console.log('Total Products found: '+ totalProducts);

    // Loop throur all Products and searhch my product that i want to add to cart
    const productCard= page.locator('.product-image-wrapper').filter({has: page.locator('.productinfo p', {hasText :productName})}).first();
    await productCard.scrollIntoViewIfNeeded();
    await productCard.hover();

    // Dirctly Click ovberlay button 
    await productCard.locator('.product-overlay .add-to-cart').first().dispatchEvent('click')

    // Validation Product Found
   await expect(page.locator('#cartModal')).toBeVisible();
    console.log('Product Added to Cart')

    // View Cart 
    await page.getByRole('link',{name:'View Cart'}).click()
    console.log('Navigated to Cart View Page')

    // Verify Product on Cart using Dynamically
  const cartRow = page.locator('tr').filter({has: page.getByText(productName)});
  await expect(cartRow).toBeVisible();
  console.log('Cart Product Match Found')

   // Checkout and Place Order to Payemn Page navigation
   await page.locator('.check_out').click()
   console.log('Checkout Page Opened')
   await page.locator("a[href='/payment']").click()
   console.log('Payment Page Opened')

   // payment Details
   await page.locator("input[data-qa='name-on-card']").fill('Ajay Dahiya')
   await page.locator("input[data-qa='card-number']").fill('4111111111111111')
   await page.locator("input[data-qa='cvc']").fill('123')
   await page.locator("input[data-qa='expiry-month']").fill('12')
   await page.locator("input[data-qa='expiry-year']").fill('2030')
   await page.locator("button[data-qa='pay-button']").click()
   console.log('Payment Complelted')

   // Verify Order Success 
   await expect(page.getByText('Order Placed!')).toBeVisible()
   const successMessage = await page.getByText('Order Placed!').textContent()
   expect(successMessage.trim()).toBe('Order Placed!')

   console.log('E2E Test Passed Scussedully')
 
})