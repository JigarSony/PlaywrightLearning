const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { chromium, expect } = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.browser = await chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    const page = await this.context.newPage();
    this.username = username;
    this.poManager = new POManager(page);
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await this.loginPage.validLogin(username, password);
});

When('Add {string} to Cart', { timeout: 100 * 1000 }, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart',{ timeout: 100 * 1000 }, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter valida details and Place the Order',{ timeout: 100 * 1000 }, async function () {
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect('ind', 'India');
    this.orderId = await orderReviewPage.SubmitAndGetOrderId(this.username);
    console.log(this.orderId);
});

Then('Verify order is presernt in the OrderHistory',{ timeout: 100 * 1000 }, async function () {
    await this.dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchorderAndSelect(this.orderId);
    expect((await orderHistoryPage.getOrderId())).toBeTruthy();
});
