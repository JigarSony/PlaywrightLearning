const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');
import { DashboardPage } from '../pageobjects/DashboardPage';
import { LoginPage } from '../pageobjects/LoginPage';


test('Client App Login E2E', async ({page})=>{

    //await page.goto("https://rahulshettyacademy.com/client");

    //const
    const username = 'sonijigar94@gmail.com';
    const password = 'Test1234';

    //login
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username,password);

    const dashboardPage = new DashboardPage(page);
    //product name 
    const productName = 'ZARA COAT 3'

    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    
    //wait for first item should be loaded
    await page.locator("div li").first().waitFor();
    //checking in cart this product is visible or not
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    // const bool = await page.locator("h3:has-text('ZARA COAT 3)").isVisible(); // not working
    const bool = await page.locator("div.cartSection h3").isVisible();
    expect(bool).toBeTruthy();

    //await page.locator("text=Checkout").click();
    await page.locator("div.subtotal button").isVisible();
    await page.locator("div.subtotal button").click();
    //div.subtotal button

    await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i=0; i<optionsCount; ++i){
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text===" India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    // await page.pause();

    expect(page.locator(".user__name [type='text']").first()).toHaveText(username);

    // page.locator(".field.small .input.txt").first().fill('123');
    // page.locator(".field.small .input.txt").last().fill('123');
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i=0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetailsPage = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
});