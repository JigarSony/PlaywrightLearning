import { expect, Locator, Page } from "@playwright/test";

export class CartPage{
    page: Page;
    cartProducts:Locator;
    productsText: Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;

    constructor(page:Page){
        this.page=page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator("div.cartSection h3");
        this.cart=page.locator("[routerlink*='cart']");
        this.orders=page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }
    async verifyProductIsDisplayed(productName:string) {
        //wait for first item should be loaded
        await this.cartProducts.waitFor();
        //checking in cart this product is visible or not
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(5000);
        // const bool = await page.locator("h3:has-text('ZARA COAT 3)").isVisible(); // not working
        const bool = await this.getProductlocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async Checkout(){
        await this.checkout.click();
    }
    getProductlocator(productName:string) {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports={CartPage};