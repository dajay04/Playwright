const {test,expect} = require('@playwright/test')

test.only('Dynamic Product Search List and Add to Cart till Payment', async ({page}) =>
{
    // Test Data for Login
    const email = 'dahiyaajay370@gmail.com'
    const password = 'Welcome@4995'
    // Open App
    await page.goto('https://automationexercise.com/')
    await page.waitForLoadState('networkidle')
    console.log('Application Opened')

    // Login Steps 
    await page.locator("a[href='/login']").click();
    await page.locator("input[data-qa='login-email']").fill(email);
    await page.locator("input[data-qa='login-password']").fill(password);
    await page.locator("button[data-qa='login-button']").click();

    // Validation Login Success
    await expect(page.locator("text=Logged in as")).toBeVisible();
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
    const productName = 'Men Tshirt';
    let productFound = false;
    
    for(let i=0;i<totalProducts;i++)
    {
        // Fetch Product Name fetched using all products 
        const currentProduct = await allProducts.nth(i).locator('p').textContent();
        console.log(`Product ${i+1}`,currentProduct)

        // Match PRoduct
        if(currentProduct.trim() === productName)
        {
            console.log('Matching Product Found')
            productFound = true;
            // Hover to Product
            await allProducts.nth(i).hover();
            // CLick on Add to Cart
            await allProducts.nth(i).locator('.add-to-cart').first().click();
            console.log(productName,'Added to Cart')
            break;
        }
    }

    // Validation Product Found
    expect(productFound).toBeTruthy();

    // View Cart 
    await expect(page.locator('.modal-content')).toBeVisible()
    await page.locator("p a[href='/view_cart']").click();
    console.log('Navigated to Cart View Page')

    // Verify Product on Cart using Dynamically
   const cartProducts = page.locator('.cart_description h4 a');
   const totalProductCart= await cartProducts.count()  
   console.log('Total Product in Cart is :'+totalProductCart)

   let cartProductFound = false;
   for(let j=0;j<totalProductCart;j++)
   {
    const fetchedCartProduct = await cartProducts.nth(j).textContent();
    if(fetchedCartProduct.trim() === productName)
    {
        console.log('Cart Product Match Found')
        cartProductFound = true;
    }
   }
   expect(cartProductFound).toBeTruthy();

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
   await expect(page.locator("h2[data-qa='order-placed']")).toBeVisible()
   const successMessage = await page.locator("h2[data-qa='order-placed']").textContent()
   expect(successMessage.trim()).toBe('Order Placed!')

   console.log('E2E Test Passed Scussedully')
 
})