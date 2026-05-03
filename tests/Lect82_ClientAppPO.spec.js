const { test, expect } = require('@playwright/test');
import { POManager } from '../pageobjects/POManager';

test('Client App Login E2E', async ({ page }) => {
    //const
    const username = 'sonijigar94@gmail.com';
    const password = 'Test1234';
    const poManager = new POManager(page);
    //login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    //product name 
    const productName = 'ZARA COAT 3'
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.Checkout();
    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await orderReviewPage.SubmitAndGetOrderId(username);
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchorderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});