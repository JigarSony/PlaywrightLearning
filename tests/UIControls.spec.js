const {test, expect} = require('@playwright/test');

test('UI Control test', async ({page})=>{
    // opening website
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // dropdown locator
    const drodown = page.locator('select.form-control');
    // selecting dropdown value
    await drodown.selectOption("consult");
    // clicking on last locator
    await page.locator(".radiotextsty").last().click();
    // clicking Okay on pop up
    await page.locator("#okayBtn").click();

    // assertion
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    console.log(await page.locator(".radiotextsty").last().isChecked()); // true //false
    // true

    // checkbox
    await page.locator('#terms').click();
    // assertion to be checked
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    // await page.pause();

    // blinking Link
    const documentlink = page.locator("[href*='document']");
    await expect(documentlink).toHaveAttribute("class","blinkingText");

});

test.only('Child window handle', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    // opening website
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // blinking Link
    const documentlink = page.locator("[href*='documents']");
    // clicking on link
    // now this is opening in new tab
    // so needs to tell playwright

    const [newPage] = await Promise.all([
    context.waitForEvent('page'), //listen for any new page: pending, rejected, fulllfiled
    documentlink.click(),
    ]) //new page is opened
    // this above is togeather parrallelly - synchronously 
    
    // const text = await  newPage.locator(".red").textContent();
    const text = await newPage.locator(".red").textContent();
    console.log(text)
    // Please email us at mentor@rahulshettyacademy.com with below template to receive response 

    const arryText = text.split("@");
    console.log(arryText[1]);
    // rahulshettyacademy.com with below template to receive response 
    const domain = arryText[1].split(" ")[0];
    console.log(domain);
    // rahulshettyacademy.com

    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());
    // rahulshettyacademy.com

});