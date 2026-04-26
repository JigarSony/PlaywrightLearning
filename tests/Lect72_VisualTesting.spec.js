const {test, expect} = require('@playwright/test');

test('Visual Testing Comparision', async ({page})=>{
    await page.goto('https://www.flightaware.com/live/findflight/');
    expect(await page.screenshot()).toMatchSnapshot('visualTest.png');
});