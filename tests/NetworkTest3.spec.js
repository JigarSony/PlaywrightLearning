const {test, expect} = require('@playwright/test');

test('How to block some network calls', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    // page.route('**/*.css',route => route.abort());
    //page.route('**/*.{jpg,png,jpeg,css}',route => route.abort());

    page.on('request',request => console.log(request.url()));

    page.on('response', response => console.log(response.url(), response.status()));
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // css and xpath
    // type and fill are same 
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    // page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());

    browser.close();
});