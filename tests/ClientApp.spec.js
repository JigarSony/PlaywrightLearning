const {test, expect} = require('@playwright/test');

test('Get all List of products', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");

    //locators
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signIn = page.locator('#login');
    const cardTitles = page.locator('.card-body h5 b');

    //actions
    await userName.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signIn.click();
    
    // get firstProduct
    // console.log(await cardTitles.first().textContent()); // if this is not written then below is fail

    await page.waitForLoadState('networkidle');
    // sometime this is not working - flaky
    // below is another solution

    // await page.locator(cardTitles).waitFor();
    //here this is also multiple element this may not work

    // await page.locator(cardTitles).first().waitFor();
    
    console.log(await cardTitles.allTextContents());
})