const {test, expect} = require('@playwright/test');


test('Verify client login', async({page})=>
    {

await page.goto('https://rahulshettyacademy.com/client');
await page.locator("#userEmail").fill("nikihl.thombare500@gmail.com");
await page.locator("#userPassword").fill("Aloha@123");
await page.locator("[value='Login']").click();
await page.locator(".card-body b").first().waitFor();
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
});
