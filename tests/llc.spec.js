import{test, expect} from "@playwright/test";

test('form fill', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //Inbuild locator actions
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Employed').check();

    await page.getByPlaceholder("Password").fill("Nikhil@123");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole('link', {name: 'Shop'}).click(); 
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();

})