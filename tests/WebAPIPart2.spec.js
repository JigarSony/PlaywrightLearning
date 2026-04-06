// Login once from UI UI
// test,these scenario>  cart-,order, orderdetails, orderhistory
// when login from UI > method called (storage state) - save into json file -> inject that json file in browser

const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    // login
    await page.locator('#userEmail').fill('sonijigar94@gmail.com');
    await page.locator('#userPassword').fill("Test1234");;
    await page.locator('#login').click();
    // wait for ideal in network calls
    await page.waitForLoadState('networkidle');
    // saving in storage - this will create state.json file will be create
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});

});

test('Test Case 2', async ({})=>{

   //const
    const email='sonijigar94@gmail.com'

    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".card-body b").first().waitFor();
    //product main locator
    const products = page.locator('.card-body');
    //product name 
    const productName = 'ZARA COAT 3'
    //product count - used in for loop
    const count = await products.count();
    //iterating for loop
    for(let i = 0; i < count; ++i)
    {
        //chceking if matching productname then click on add to cart
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            // click on add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    // await page.pause();

    // redirecting to cart page
    await page.locator("[routerlink*='cart']").click();
    
    //wait for first item should be loaded
    await page.locator("div li").first().waitFor();
    //checking in cart this product is visible or not
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    // const bool = await page.locator("h3:has-text('ZARA COAT 3)").isVisible(); // not working
    const bool = await page.locator("div.cartSection h3").isVisible();
    expect(bool).toBeTruthy();

    //await page.locator("text=Checkout").click();
    await page.locator("div.subtotal button").isVisible();
    await page.locator("div.subtotal button").click();
    //div.subtotal button

    await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i=0; i<optionsCount; ++i){
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text===" India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    // await page.pause();

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    // page.locator(".field.small .input.txt").first().fill('123');
    // page.locator(".field.small .input.txt").last().fill('123');
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i=0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetailsPage = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
});

test('Place an Order', async ({})=>{

    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".card-body b").first().waitFor();
    //product main locator
    const products = page.locator('.card-body');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});