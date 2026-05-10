const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base')
import { POManager } from '../pageobjects/POManager';
// JSON->String->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestDataIte.json")));

for(const data of dataset){
test(`Client App Login E2E with fixture ${data.productName}`, async ({ page }) => {
    
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
    const orderId = await orderReviewPage.SubmitAndGetOrderId(data.username);
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchorderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

customtest.only(`Client App Login E2E with fixture ${data.productName}`, async ({ page, testDataForOrder }) => {
    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
    // const orderReviewPage = poManager.getOrderReviewPage();
    // await orderReviewPage.searchCountryAndSelect("ind", "India");
    // const orderId = await orderReviewPage.SubmitAndGetOrderId(testDataForOrder.username);
    // console.log(orderId);
    // await dashboardPage.navigateToOrders();
    // const orderHistoryPage = poManager.getOrderHistoryPage();
    // await orderHistoryPage.searchorderAndSelect(orderId)
    // expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
}