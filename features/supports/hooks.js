const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const { playwright, chromium } = require('@playwright/test');


Before(async function () {

    this.browser = await chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep(function () {
    // This hook will be executed before all steps in scenario
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'sceenshot1.png' });
    }
})

After(async function () {
    console.log("I am last to execute");
})