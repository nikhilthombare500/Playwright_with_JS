const {test, expect} = require('@playwright/test');


test.only('First playwright test', async({browser})=>
    {
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
//css rules:
    //id - tagname#id or #id
    //class - .class
    //attribute - [attribute='value']
    //text - text= 'text value'
    //parent to child - parent child
await page.locator("input#username").fill("rahulshetty");
await page.locator("[type= 'password']").fill("Learning@830$3mK2");
await page.locator("#signInBtn").click();

console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});


test('Page playwright test', async({page})=>
    {
await page.goto('https://www.google.com/');
console.log(await page.title());
await expect(page).toHaveTitle("Google") ;
});