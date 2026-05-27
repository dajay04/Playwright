const {test, expect} = require('@playwright/test')


test('Amazon Demo Test', async({page}) => 
{
    await page.goto('https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_3lda0bxyzj_e&adgrpid=155259813513&hvpone=&hvptwo=&hvadid=808942239990&hvpos=&hvnetw=g&hvrand=6409705079513922173&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9143966&hvtargid=kwd-365295376496&hydadcr=5620_2499410&gad_source=1')

    await page.locator("a:has-text('Fresh')").click()
    await page.locator("img[alt='vegetables']").click();

    const rows = await page.locator('ol.a-carousel li');
    const itemName = 'Tadaa Sweet Corn Cob boiled - 2 Pcs';
    const addCartText =  await page.locator('ol.a-carousel li tr span.a-truncate-cut').first();
    const addCartButton =  await page.locator("ol.a-carousel li tr button[text*='Add']").first();
   
    for(let i=0;i<rows.count();i++)
    {
        const actualdata = await addCartText.textContent()
        if(actualdata.includes(itemName))
        {
                await addCartButton.click();
                break;
        }
    }

    await page.pause();
    const cartTotal = await page.locator('span.nav-cart-count.nav-cart-1').textContent()
    await expect(cartTotal).toHaveValue(1)
    
    const actualAmount = await page.locator('span.ewc-subtotal-amount  h2.a-text-bold.a-size-base.a-color-price').textContent()
    await expect(actualAmount).includes(78)
})
