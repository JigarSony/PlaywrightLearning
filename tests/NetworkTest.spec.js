const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "sonijigar94@gmail.com", userPassword: "Test1234" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }
const { APIUtils } = require('./utils/APIUtils');
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" }

test.beforeAll(async () => {

    // login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

// create order is success
test('Place an Order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    //const
    const email = 'sonijigar94@gmail.com'

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response -> API response -> {Needs to meke Fake Response here} to Browser - > Render the data on Front End
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            });
        }
    );

    await page.locator("button[routerlink*='myorders']").click();

    // page.pause();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent()); // no order

});