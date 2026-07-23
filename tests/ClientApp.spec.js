const {test, expect} = require('@playwright/test');


test('Verify client login', async({page})=>
    {
        const email = "nikihl.thombare500@gmail.com";
        const productName = "ZARA COAT 3";
        const products = await page.locator(".card-body");
await page.goto('https://rahulshettyacademy.com/client');
await page.locator("#userEmail").fill(email);
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

//cvv code insertion
await page.locator("[class='field small'] [type='text']").nth(0).fill("123");

//Name insertion
await page.locator("[class='field'] [class='input txt']").fill("Nikhil Thombare");

// Apply coupon insertion
await page.locator("[class='field small'] [type='text']").nth(1).fill("rahulshettyacadamy");

await page.locator("[type='submit']").click();
await page.locator(".field .ng-star-inserted").waitFor();

expect(await page.locator(".field .ng-star-inserted")).toHaveText("* Invalid Coupon");

await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150});
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

expect(await page.locator(".user__name label[type='text']")).toHaveText(email);

await page.locator("text=Place Order ").click();

expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

const orderId = await page.locator("[align='center'] label[class='ng-star-inserted']").textContent();
console.log("orderID: " + orderId);

await page.locator("button[routerlink='/dashboard/myorders']").click();

await page.locator("tbody").waitFor();

const table = await page.locator(".table-hover tbody tr");

for (let i=0; i<await table.count(); i++){
    const tableOrderID = await table.nth(i).locator("[scope='row']").textContent();
    console.log("Table order ID:  " + tableOrderID);

if(orderId.includes(tableOrderID)){
    await table.nth(i).locator("[class*='btn-primary']").click();
    break;
}
}

const orderIDdetails = await page.locator(".col-md-6 .col-text").textContent();
expect(orderId.includes(orderIDdetails)).toBeTruthy();

});
