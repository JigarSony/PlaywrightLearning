const { test, expect } = require('@playwright/test');
import { POManager } from '../pageobjects/POManager';
// JSON->String->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestDataIte.json")));

for(const data of dataset){
test(`Client App Login E2E in Page Object with Json and Iteration ${data.productName}`, async ({ page }) => {
    
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
}