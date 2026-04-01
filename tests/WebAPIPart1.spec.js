const {test,expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let orderId;
let token;
// when you declare variable const to declare value here it self
// right now we don't have any value, so - let
// let means - later

test.beforeAll( async() => {

    // login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    // create an order
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'applicatopn/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        orderId = await orderResponseJson.orders[0]; // currently getting an error here
        console.log(orderId);

});

test.beforeEach( ()=>{

});

// create order is success
test('Place an Order', async ({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, token );

    await page.goto("https://rahulshettyacademy.com/client");

    //const
    const email='anshika@gmail.com'

    //login
    // const userName = await page.locator('#userEmail').fill(email);
    // const password = await page.locator('#userPassword').fill("Iamking@000");;
    // const signIn = page.locator('#login').click();
    // //wait for ideal in network calls
    // await page.waitForLoadState('networkidle');

    // wait for first element to be loaded
    // await page.locator(".card-body b").first().waitFor();
    // // product main locator
    // const products = page.locator('.card-body');
    // // product name 
    // const productName = 'ZARA COAT 3'
    // //product count - used in for loop
    // const count = await products.count();
    // // iterating for loop
    // for(let i = 0; i < count; ++i)
    // {
    //     //chceking if matching productname then click on add to cart
    //     if(await products.nth(i).locator("b").textContent() === productName)
    //     {
    //         // click on add to cart
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }
    // // await page.pause();

    // // redirecting to cart page
    // await page.locator("[routerlink*='cart']").click();
    
    // // wait for first item should be loaded
    // await page.locator("div li").first().waitFor();
    // // checking in cart this product is visible or not
    // await page.waitForLoadState('networkidle');
    // await page.waitForTimeout(5000);
    // // const bool = await page.locator("h3:has-text('ZARA COAT 3)").isVisible(); // not working
    // const bool = await page.locator("div.cartSection h3").isVisible();
    // expect(bool).toBeTruthy();

    // // await page.locator("text=Checkout").click();
    // await page.locator("div.subtotal button").isVisible();
    // await page.locator("div.subtotal button").click();
    // // div.subtotal button

    // await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay:100});
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator("button").count();

    // for(let i=0; i<optionsCount; ++i){
    //     const text=await dropdown.locator("button").nth(i).textContent();
    //     if(text===" India")
    //     {
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
    // // await page.pause();

    // expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    // // page.locator(".field.small .input.txt").first().fill('123');
    // // page.locator(".field.small .input.txt").last().fill('123');
    // await page.locator(".action__submit").click();

    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);

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
    await page.pause();
    expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
});