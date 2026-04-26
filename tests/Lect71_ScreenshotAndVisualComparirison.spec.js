const {test, expect} = require('@playwright/test');

test('Screenshot', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    // await page.screenshot({path:'screenshot.png'});
    // await page.screenshot({path:'screenshotFull.png',fullPage: true});
    await page.locator('#displayed-text').screenshot({path:'visibleElement.png'});
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // await page.screenshot({path:'hiddenScreenshotFull.png',fullPage: true});
    // await page.locator('#displayed-text').screenshot({path:'hiddenElement.png'});
});