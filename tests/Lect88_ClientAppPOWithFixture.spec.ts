import { test, expect } from '@playwright/test';
import {customtest} from '../utils_ts/test-base'
import { POManager } from '../pageobjects_ts/POManager';
// JSON->String->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestDataIte.json")));

for(const data of dataset){
customtest(`Client App Login E2E with fixture ${data.productName}`, async ({ page }) => {
    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any;
    orderId = await orderReviewPage.SubmitAndGetOrderId(data.username);
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchorderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

customtest.only(`Client App Login E2E with fixture1 ${data.productName}`, async ({ page, testDataforOrder }) => {
    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataforOrder.username, testDataforOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataforOrder.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataforOrder.productName);
    await cartPage.Checkout();
    // const orderReviewPage = poManager.getOrderReviewPage();
    // await orderReviewPage.searchCountryAndSelect("ind", "India");
    // const orderId = await orderReviewPage.SubmitAndGetOrderId(testDataforOrder.username);
    // console.log(orderId);
    // await dashboardPage.navigateToOrders();
    // const orderHistoryPage = poManager.getOrderHistoryPage();
    // await orderHistoryPage.searchorderAndSelect(orderId)
    // expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
}