const {test, expect} = require('@playwright/test');

test.only('Multiple window handling', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
const username = page.locator("input#username");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = await page.locator("[href*='documents-request']");


    const [newPage] = await Promise.all(
        [
    context.waitForEvent('page'), //listens for new page event
    documentLink.click()
])

const text = await newPage.locator(".red").textContent();
console.log(text);
const arrayText = text.split("@");
const domain = arrayText[1].split(" ")[0];
await page.locator("#username").type(domain);

console.log(await page.locator("#username").inputValue());
});
