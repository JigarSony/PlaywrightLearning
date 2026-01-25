const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser}) =>
{
    // playwitgtht code
    // step1 - open browser
    // step2 - enter username/password - 2 second
    // step3 - click

    // javascript is synchronous language that means it will execute in parrallel (all steps at sametime)
    // so that's why we need to write `await` keyword before each step to make it sequential
    // await works with async functions only

    // function() is anonymous function
    // you can also write same with ()=>

    // test can work with - browser, fixture is kind of global , so if we write in {} so 
    
    // chrome - plugin/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // css and xpath
    // type and fill are same 
    await page.locator('#username').fill('rahulshettyacademy1');
    await page.locator('#password').fill('Learning@830$3mK2');
    // page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test('Page Playwright test', async ({page}) =>
    {
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // above two line can be replaced with another fixture called `page` 
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('Login with Variable', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    
    // actions
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();

    // console.log(await page.locator('.card-body a').textContent()); - Give below error
    // Error: locator.textContent: Error: strict mode violation: locator('.card-body a') resolved to 4 elements

    console.log(await page.locator('.card-body a').first().textContent());
    //iphone X
    console.log(await page.locator('.card-body a').nth(1).textContent());
    //Samsung Note 8
});

test('Get all List of products', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //locators
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    //actions
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    
    // get allTextContents
    //first - first
    console.log(await cardTitles.first().textContent()); //if this is not written then below is fail
    // https://playwright.dev/docs/actionability
    //iphone X
    console.log(await cardTitles.allTextContents());
    //[ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    // [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
})