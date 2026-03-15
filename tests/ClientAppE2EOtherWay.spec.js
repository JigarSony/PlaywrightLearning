const {test, expect} = require('@playwright/test');

test('Client App Login E2E', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");

    //const
    const email='anshika@gmail.com'
    //product name 
    const productName = 'ZARA COAT 3'

    //login
    const userName = await page.getByPlaceholder("email@example.com").fill(email);
    const password = await page.getByPlaceholder("enter your passsword").fill("Iamking@000");;
    const signIn = page.getByRole("button", {name:'login'}).click();
    //wait for ideal in network calls
    await page.waitForLoadState('networkidle');
    //wait for first element to be loaded
    await page.locator(".card-body b").first().waitFor();


    await page.locator('.card-body').filter({hasText: productName}).getByRole("button",{name:"Add to Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

    //wait for first item should be loaded
    await page.locator("div li").first().waitFor();
    //checking in cart this product is visible or not
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    // const bool = await page.locator("h3:has-text('ZARA COAT 3)").isVisible(); // not working
    await expect(page.getByText(productName)).toBeVisible();

    //await page.locator("text=Checkout").click();
    await page.getByRole("button",{name:"Checkout"}).click();
    
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});

    await page.getByRole("button",{name:'India'}).nth(1).click();
    
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
});