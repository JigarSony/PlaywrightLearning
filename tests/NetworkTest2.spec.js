const { test, expect, request } = require('@playwright/test');

test('Security test request intercept', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");

    // login and reach order page
    await page.locator('#userEmail').fill("sonijigar94@gmail.com");
    await page.locator('#userPassword').fill("Test1234");;
    await page.locator('#login').click();

    // wait for ideal in network calls
    await page.waitForLoadState('networkidle');

    // wait for first element to be loaded
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    // read doc - https://playwright.dev/docs/api/class-route
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({
            url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=123'
        })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText('You are not authorize to view this order');
})