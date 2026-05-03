class DashboardPage {

    constructor(page) {
        this.products = page.locator('.card-body');
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.order = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName) {
        //wait for first element to be loaded
        const titles = await this.productsText.allTextContents();
        console.log(titles);

        //product count - used in for loop
        const count = await this.products.count();
        //iterating for loop
        for (let i = 0; i < count; ++i) {
            //chceking if matching productname then click on add to cart
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                // click on add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        // redirecting to cart page
        await this.cart.click();
    }

    async navigateToOrders(){
        await this.order.click();

    }
}
module.exports = {DashboardPage}