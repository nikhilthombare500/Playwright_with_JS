const {test, expect} = require('@playwright/test');


test('First playwright test', async({browser})=>
    {
          
const context = await browser.newContext();
const page = await context.newPage();

 //css declaration
        const username = page.locator("input#username");
        const password = page.locator("[type= 'password']");
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
//css rules:
    //id - tagname#id or #id
    //class - .class
    //attribute - [attribute='value']
    //text - text= 'text value'
    //parent to child - parent child

    //Invalid username and password scenario
await username.fill("rahulshetty");
await password.fill("Learning@830$3mK2");
await signIn.click();

console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");

//Valid username and password scenario
await username.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await signIn.click();

// console.log(await cardTitles.nth(0).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
});


test('Login controls', async({page})=>
    {
const username = page.locator("input#username");
        const password = page.locator("[type= 'password']");
        const dropdown = page.locator("select.form-control");
        const documentLink = page.locator("[href*='documents-request']");
        const signIn = page.locator("#signInBtn");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

await username.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await page.locator("[class='radiotextsty']").nth(1).click();
await page.locator("#okayBtn").click();
await dropdown.selectOption("consult");
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await expect(await page.locator("#terms").isChecked()).toBeTruthy();
await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
// await signIn.click();

});

test.only('child window handling', async({browser})=>{

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
