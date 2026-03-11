import {test, expect} from '@playwright/test';
test('Plawright Special Locators',async ({page}) =>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    // await page.getby...

    // getByLabel - you can get directly to all label text - perform click around/inside that
    await page.getByLabel('Check me out if you Love IceCreams!').click();

    await page.getByLabel('Employed').check();

    await page.getByLabel('Gender').selectOption('Female');


    // placeholder
    await page.getByPlaceholder("Password").fill("Test@123");

    await page.getByRole("button",{name: 'Submit'}).click();
    //alert alert-success alert-dismissible
    //Success! The Form has been submitted successfully!.

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name:"Shop"}).click();

    // await page.locator("app-cart").filter({hasText:'Nokia Edge'}).getByRole("button").click(); - Failing

    //locator (css)

});