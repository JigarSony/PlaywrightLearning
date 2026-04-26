# This is Playwright Course by Rahul Shetty

## Pre-requisite

```text
Install Node/VSCode
Create Folder Open that folder in VSCode
```

```text
type: npm init playwright
Create newFile UIBasictest.spec.ts
```

const {test} = require('@playwright/test');

javascript is `synchronous` language that means it will execute in parrallel (all steps at sametime)

so that's why we need to write `await` keyword before each step to make it sequential

`await works/activated with async functions only`

function() is anonymous function

you can also write same with ()=>

// test can work with - browser, fixture is kind of global , so if we write in {} so

browser is fixture in playwiright use like this:  async ({browser}) =>

```javascript
// const context = await browser.newContext();
// const page = await context.newPage();
// above two line can be replaced with another fixture called `page` 
like this:  async ({page}) =>
```

Lecture 11:

playwright.config.js

testDir - is directory of test

timeout is for override existing timeout by default is 30 Sec

[https://playwright.dev/docs/test-timeouts](https://playwright.dev/docs/test-timeouts)

```javascript
for expect assertion  expect: {
    timeout: 40 * 1000,
  },
```

for browser need to write browsername: 'chromium'  

to run npx playwright test - by default this is `headless` mode

to headed mode - `npx playwright test --headed`

if you need to run specific single run then use : `test.only`

## Lecture 12

Title

Page.title

To configure this --headed by defauls in cofig file

`use: headless: false`

## Section 4

## Session/Lecture 13

Locators: `Playwright use css and xpath`

```text
// type and fill are same 
await page.locator('#username').fill('hello@hello.com');

// click
await page.locator('#signInBtn').click();

// textContent
console.log(await page.locator("[style*='block']").textContent());

// toContainText
await expect(page.locator("[style*='block']")).toContainText("Incorrect");
```

Session 15

Locator as variable and reusing

```javascript
test('Login with Variable', async({page})=>{

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    // await userName.fill("");
    await userName.fill("rahulshettyacademy");

    // await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    // console.log(await page.locator('.card-body a').textContent());
    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());
});
```

Session 16

allTextContents()

Fail if not written locator

[https://playwright.dev/docs/actionability](https://playwright.dev/docs/actionability)

Session 17

Wait mechanisam

check API/Service call > frontend reading

This will wait networkcall untill ideal

`await page.waitForLoadState('networkidle');`

for single file run `npx playwright test test/ClientApp.spec.js`

UI ControlsSpec - UI Control test

```text
Dropdown
You can select locator of dropdown
Later select by value - selectOption()
```

```text
to pause browser
page.pause();
```

```text
Radiobutton
check locator - click
```

Session 20

```text
Assertion for radiobuton expecte(locator).toBeChecked()
.isChecked();
```

Session 21

```text
Checkbox
if validation outside the await is outside
```

Session 22

```text
Blinking text
GetLocator
Expect().toHaveAttribute()
```

## Session 24 - UIControls.spec - ChildWindow Handle

Child window Handle

Here there are two window and that goes in parrallel so needs to add into `Promise.all`

Splitting text

Entering into textbox

GetTheValue - inputValue()

## Section 6 - Session#27

## Session#37

Playwright Special Locators

page.Get - will suggest you

getByLabel - Trace all label in page and check for text - and perform click/select option around that

Another way to run TC
npx playwright test --ui - open new window to select and run - Kind of test runner

getByPlaceholder - Search for placeholder value

getByRole -

getbyText - Scan Entire page and finding text

## Session#40 - ClientAppE2EOtherWay.spec.js

in this replacing locator from css to playwright locator

## Session#42

How to handle calendar - Calendar.spec.js

## Session#45 - Debug

npx playwright test `<fileName>` --debug : one inspactor open - codegen tool

## Session#46 - Record and playback with codegen

npx playwright codegen `<url>`

## Session#47

Add below properties in playwright.config.js file
screenshot: 'on', - for every steps
trace: 'on' - for debug

for Report go to playwright-report > index.html > open path and see
for trace : download zip > open : [https://trace.playwright.dev/](https://trace.playwright.dev/) > upload file

for only failure trace
trace: 'retain-on-failure'

## Session#48 - More Validations

```javascript
// import { test } from '@playwright/test';
const {test, expect} = require('@playwright/test')

test("More Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
});
```

## Session#49 50 - More validations

When/if any same locator showing 2 matching 1 is non visible and 1 visible
at that time use `:visible` for perform action on that

```javascript
await framepage.locator("li a[href*='lifetime-access']:visible").click(); 
```

## Session#51

Discuss about session storage in this lecture
Login: UserName/Password - login API call under network tab -> Token stored in session storage
Directly insert in browser session to bypass login

## Session#52 - WebAPIPart1.spec.js

request library to perform api request - add into import

```text
apiContext same as browserContext
post(), ok(), json()
```

## Session#53 - WebAPIPart1.spec.js

Some other api response methods

```text
body, headers, status, statusText
```

To insert token -> Execute javascript -> playwright can execute any javascript
page.addInitScript - to add any JS script run in playwright

```text
window.localStorage.setItem('token',value)
```

## Session#54 - Try to Create an order via API

- API Name - Create order - body - Headers and in response getting an order Id

## Session#57 and #58 - Refactoting API Code - APIUtils.js and WebAPIPart1WithUtil.spec.js

```javascript
class APIUtils {

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                // 'Authorization': this.getToken(),
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        const orderId = await orderResponseJson.orders[0]; // currently getting an error here
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils};
```

```javascript
const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "sonijigar94@gmail.com", userPassword: "Test1234" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const { APIUtils } = require('./utils/APIUtils');
let response;


test.beforeAll(async () => {

    // login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

// create order is success
test('Place an Order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    //const
    const email = 'anshika@gmail.com'

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetailsPage = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetailsPage)).toBeTruthy();
});
```

## Session#61 - Store session into storage file - WebAPIPart2.spec.js

state.json

// Login once from UI UI
// test,these scenario>  cart-,order, orderdetails, orderhistory
// when login from UI > method called (storage state) - save into json file -> inject that json file in browser

```javascript
await context.storageState({path:'state.json'});
```

```javascript
const {test, expect} = require('@playwright/test');

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

});

test('Place an Order', async ({page})=>{});
```

```javascript
const page = await webContext.newPage();
```

## Session#62

```javascript
If you want to debug put --debug at end of the test command
but this will work only for UI
For API this will be skipped
```

```javascript
To achieve this
Add testfile path under test
cntrl/cmd + shift + p > prompt open debug npm script
```

add this to script package.json

```javascript
"scripts": {
    "test": "npx playwright test tests/WebAPIPart1.spec.js --headed"
  },
```

 also increase timeout in playwright.config.js

 > timeout: 100 * 1000,

## Lect #63 - Trace view for API

> To Track Failure for API ```turn on trace in Playwright.config.js```
> Upload Trace file in ```https://trace.playwright.dev/``` and analyse
> If web use playwright Inspector tool

## Lect #64 - Intercept(alter/faker) Network call

## Lect #65 - Intercepting demo - NetworkTest.spec.js

```javascript
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            //intercepting response -> API response -> {Needs to meke Fake Response here} to Browser - > Render the data on Front End
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders); // convertinf JS to JSON
            route.fulfill({
                response,
                body, // faking response here
            });
        }
    );
```

## Lect #67 #68 - Intercepting Order View/Details - NetworkTest2.spec.js

```javascript
const { test, expect, request } = require('@playwright/test');

test('Security test request intercept', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");

    // login and reach order page
    await page.locator('#userEmail').fill("sonijigar94@gmail.com");
    await page.locator('#userPassword').fill("Test1234");;
    await page.locator('#login').click();

    // wait for ideal in network calls
    await page.waitForLoadState('networkidle');

    // wait for first element to be loaded
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    // read doc - https://playwright.dev/docs/api/class-route
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({
            url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=123'
        })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText('You are not authorize to view this order');
})
```

## Lect #70 - how to abort the network call - NetworkTest3.spec.js

```javascript
page.route('**/*.css',route => route.abort()); 
```

This above code will block all network calls ending with css

```javascript
page.route('**/*.{jpg,png,jpeg,css}',route => route.abort());
```

playwright tracks every requests what made through network tabs

```javascript
page.on('request',request => console.log(request.url()));
page.on('response', response => console.log(response.url(), response.status()));
```

File

```javascript
const {test, expect} = require('@playwright/test');

test('How to block some network calls', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    // page.route('**/*.css',route => route.abort()); - Single
    page.route('**/*.{jpg,png,jpeg,css}',route => route.abort()); // Multiple Block

    page.on('request',request => console.log(request.url()));

    page.on('response', response => console.log(response.url(), response.status()));
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    // page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
});
```

## Lect#71 - How to Capture Screenshot - Lect71_ScreenshotAndVisualComparirison.spec.js

```javascript
await page.screenshot({path:'screenshot.png'}); - This method will take Screenshot
await page.screenshot({path:'screenshotFull.png',fullPage: true}); - This arguments will take Full Screenshot
await page.locator('#displayed-text').screenshot({path:'visibleElement.png'}); - This will take only element Screenshot
```

File

```javascript
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
```

## Lect#72 - Visual Testing - Lect72_VisialTesting.spec.js

How that works?
Screenshot - store -> Daily Run taking Screenshot - If any thing changed it will report failure - Something like Image Comparision

```javascript
expect(await page.screenshot()).toMatchSnapshot('visualTest.png');
```

File
```javascript
const {test, expect} = require('@playwright/test');

test('Visual Testing Comparision', async ({page})=>{
    await page.goto('https://www.flightaware.com/live/findflight/');
    
});
```