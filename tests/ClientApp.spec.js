const {test, expect} = require('@playwright/test');


test('Verify client login', async({page})=>
    {
        const productName = "ZARA COAT 3";
        const products = await page.locator(".card-body");
await page.goto('https://rahulshettyacademy.com/client');
await page.locator("#userEmail").fill("nikihl.thombare500@gmail.com");
await page.locator("#userPassword").fill("Aloha@123");
await page.locator("[value='Login']").click();
await page.locator(".card-body b").first().waitFor();
const titles = await page.locator(".card-body b").allTextContents();
console.log("Product titles: " + titles);
const count = await products.count();
console.log("Product count: " + count);

for(let i=0; i<count; i++){
    const productTitle = await products.nth(i).locator("b").textContent();
    if(productTitle === productName){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
console.log("Product Cart count: " + await page.locator("h3:has-text('ZARA COAT 3')").count());
expect(bool).toBeTruthy();

await page.locator('text=Checkout').click();
await page.locator("[placeholder*='Country']").pressSequentially("ind");
const countrydropdownOption = await page.locator('.ta-results');
await countrydropdownOption.waitFor();
const dropdownList = await countrydropdownOption.locator('button').count();

for(let i=0;i< dropdownList; i++){
   const text = await countrydropdownOption.locator('button').nth(i).textContent();
    if(text ===" India"){
        await countrydropdownOption.locator('button').nth(i).click();
        break;
    }

}
});
